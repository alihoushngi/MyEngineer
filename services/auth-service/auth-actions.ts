"use server";

import { isApiError } from "@/lib/api/api-error/api-error";
import { env } from "@/lib/env/env";
import {
  clearAccessSession,
  isEngineerPanelRole,
  readPendingToken,
  writeAccessSession,
  writePendingToken,
} from "@/lib/auth/access-token-cookie/access-token-cookie";
import {
  mutationFailed,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { clearMockEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { clearMockUserSession } from "@/lib/auth/user-session/user-session";
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiRequestOtp,
  apiResetPassword,
  apiSelectRole,
  apiVerifyOtp,
  type BackendRole,
  type LoginData,
} from "@/services/auth-api-service/auth-api-service";
import { type ServiceMutationFailure } from "@/types/store/engineer-auth.types";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAuthPaths } from "@/config/user-auth.config/user-auth.config";

export type AuthAudience = "user" | "engineer";

export type AuthActionSuccess = {
  ok: true;
  redirectTo: string;
};

export type AuthRoleSelectionNeeded = {
  ok: true;
  requiresRoleSelection: true;
  roles: readonly BackendRole[];
};

export type AuthActionResult =
  | AuthActionSuccess
  | AuthRoleSelectionNeeded
  | ServiceMutationFailure;

function toFailure(error: unknown, fallback: string): ServiceMutationFailure {
  if (isApiError(error)) {
    return {
      ok: false,
      status: error.status,
      code:
        error.status === 401 || error.status === 403
          ? "unauthorized"
          : error.status >= 500
            ? "server"
            : "validation",
      message: error.message || fallback,
    };
  }

  return mutationFailed(fallback);
}

function displayNameFromUser(user: {
  full_name?: string;
  name?: string;
  family?: string;
}): string {
  if (user.full_name?.trim()) {
    return user.full_name.trim();
  }
  return [user.name, user.family].filter(Boolean).join(" ").trim();
}

function roleMatchesAudience(
  roleName: string | undefined,
  audience: AuthAudience,
): boolean {
  const isEngineer = isEngineerPanelRole(roleName);
  return audience === "engineer" ? isEngineer : !isEngineer;
}

function wrongAudienceMessage(audience: AuthAudience): string {
  return audience === "engineer"
    ? "این حساب برای پنل متخصص نیست. از صفحه ورود کاربر عادی استفاده کنید."
    : "این حساب برای کاربر عادی نیست. از صفحه ورود متخصص استفاده کنید.";
}

function filterRolesForAudience(
  roles: readonly BackendRole[],
  audience: AuthAudience,
): readonly BackendRole[] {
  return roles.filter((role) => roleMatchesAudience(role.name, audience));
}

function redirectForAudience(
  audience: AuthAudience,
  nextPath?: string,
): string {
  if (audience === "engineer") {
    return nextPath?.startsWith("/engineer")
      ? nextPath
      : engineerPanelPaths.dashboard;
  }
  if (nextPath?.startsWith("/account")) {
    return nextPath;
  }
  return userAuthPaths.account;
}

async function writeSuccessfulSession(input: {
  token: string;
  roleName: string;
  displayName?: string;
  audience: AuthAudience;
  nextPath?: string;
}): Promise<AuthActionResult> {
  if (!roleMatchesAudience(input.roleName, input.audience)) {
    await clearAccessSession();
    return mutationFailed(wrongAudienceMessage(input.audience));
  }

  await clearMockUserSession();
  await clearMockEngineerSession();
  await writeAccessSession({
    token: input.token,
    role: input.roleName,
    displayName: input.displayName,
  });

  return {
    ok: true,
    redirectTo: redirectForAudience(input.audience, input.nextPath),
  };
}

async function persistLoginData(
  data: LoginData,
  audience: AuthAudience,
  nextPath?: string,
): Promise<AuthActionResult> {
  if (data.requires_role_selection) {
    const roles = filterRolesForAudience(data.available_roles, audience);
    if (roles.length === 0) {
      return mutationFailed(wrongAudienceMessage(audience));
    }

    if (roles.length === 1) {
      const onlyRole = roles[0];
      if (!onlyRole) {
        return mutationFailed(wrongAudienceMessage(audience));
      }

      try {
        const selected = await apiSelectRole(
          { role: onlyRole.name, device_name: "web" },
          data.token,
        );
        return writeSuccessfulSession({
          token: selected.token,
          roleName: selected.user.role?.name ?? onlyRole.name,
          displayName: displayNameFromUser(selected.user),
          audience,
          nextPath,
        });
      } catch (error) {
        return toFailure(error, "انتخاب نقش ناموفق بود.");
      }
    }

    await writePendingToken(data.token);
    return {
      ok: true,
      requiresRoleSelection: true,
      roles,
    };
  }

  const roleName = data.user.role?.name ?? "user";
  return writeSuccessfulSession({
    token: data.token,
    roleName,
    displayName: displayNameFromUser(data.user),
    audience,
    nextPath,
  });
}

export async function loginWithMelliAction(input: {
  melli: string;
  password: string;
  audience: AuthAudience;
  nextPath?: string;
}): Promise<AuthActionResult> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس احراز هویت پیکربندی نشده است.");
  }

  try {
    const data = await apiLogin({
      melli: input.melli.trim(),
      password: input.password,
      device_name: "web",
    });
    return persistLoginData(data, input.audience, input.nextPath);
  } catch (error) {
    return toFailure(error, "ورود ناموفق بود. کد ملی یا رمز عبور را بررسی کنید.");
  }
}

export async function selectRoleAction(input: {
  role: string;
  audience: AuthAudience;
  nextPath?: string;
}): Promise<AuthActionResult> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس احراز هویت پیکربندی نشده است.");
  }

  if (!roleMatchesAudience(input.role, input.audience)) {
    return mutationFailed(wrongAudienceMessage(input.audience));
  }

  const pending = await readPendingToken();
  if (!pending) {
    return mutationFailed("نشست انتخاب نقش منقضی شده است. دوباره وارد شوید.");
  }

  try {
    const data = await apiSelectRole(
      { role: input.role, device_name: "web" },
      pending,
    );
    return writeSuccessfulSession({
      token: data.token,
      roleName: data.user.role?.name ?? input.role,
      displayName: displayNameFromUser(data.user),
      audience: input.audience,
      nextPath: input.nextPath,
    });
  } catch (error) {
    return toFailure(error, "انتخاب نقش ناموفق بود.");
  }
}

export async function requestOtpAction(input: {
  mobile: string;
  purpose: "account_activation" | "login" | "password_reset";
}): Promise<{ ok: true; resendAfter: number } | ServiceMutationFailure> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس پیامک پیکربندی نشده است.");
  }

  try {
    const data = await apiRequestOtp({
      mobile: input.mobile.trim(),
      purpose: input.purpose,
    });
    return { ok: true, resendAfter: data.resend_after ?? 120 };
  } catch (error) {
    return toFailure(error, "ارسال کد ناموفق بود.");
  }
}

export async function verifyOtpAction(input: {
  mobile: string;
  purpose: "account_activation" | "login" | "password_reset";
  code: string;
  audience?: AuthAudience;
  nextPath?: string;
}): Promise<AuthActionResult | { ok: true; passwordResetReady: true }> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس احراز هویت پیکربندی نشده است.");
  }

  try {
    const data = await apiVerifyOtp({
      mobile: input.mobile.trim(),
      purpose: input.purpose,
      code: input.code.trim(),
      device_name: "web",
    });

    if (input.purpose === "password_reset") {
      const resetData = data as { token?: string };
      if (!resetData.token) {
        return mutationFailed("توکن بازیابی رمز دریافت نشد.");
      }
      await writePendingToken(resetData.token);
      return { ok: true, passwordResetReady: true };
    }

    const audience =
      input.audience ??
      (input.purpose === "account_activation" ? "user" : "user");

    return persistLoginData(data as LoginData, audience, input.nextPath);
  } catch (error) {
    return toFailure(error, "کد واردشده معتبر نیست.");
  }
}

export async function registerAction(input: {
  name: string;
  family: string;
  mobile: string;
  melli: string;
  email?: string;
  password: string;
  password_confirmation: string;
}): Promise<{ ok: true; mobile: string } | ServiceMutationFailure> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس ثبت‌نام پیکربندی نشده است.");
  }

  try {
    await apiRegister({
      name: input.name.trim(),
      family: input.family.trim(),
      mobile: input.mobile.trim(),
      melli: input.melli.trim(),
      email: input.email?.trim() || undefined,
      password: input.password,
      password_confirmation: input.password_confirmation,
    });
    await apiRequestOtp({
      mobile: input.mobile.trim(),
      purpose: "account_activation",
    }).catch(() => undefined);
    return { ok: true, mobile: input.mobile.trim() };
  } catch (error) {
    return toFailure(error, "ثبت‌نام ناموفق بود. اطلاعات را بررسی کنید.");
  }
}

export async function resetPasswordAction(input: {
  password: string;
  password_confirmation: string;
}): Promise<AuthActionSuccess | ServiceMutationFailure> {
  if (!env.apiBaseUrl) {
    return mutationUnavailable("سرویس بازیابی رمز پیکربندی نشده است.");
  }

  const pending = await readPendingToken();
  if (!pending) {
    return mutationFailed("نشست بازیابی رمز منقضی شده است.");
  }

  try {
    await apiResetPassword(
      {
        password: input.password,
        password_confirmation: input.password_confirmation,
      },
      pending,
    );
    await clearAccessSession();
    return { ok: true, redirectTo: storePaths.login };
  } catch (error) {
    return toFailure(error, "تغییر رمز عبور ناموفق بود.");
  }
}

export async function logoutAction(): Promise<
  { ok: true } | ServiceMutationFailure
> {
  try {
    if (env.apiBaseUrl) {
      await apiLogout().catch(() => undefined);
    }
  } finally {
    await clearMockUserSession();
    await clearMockEngineerSession();
    await clearAccessSession();
  }
  return { ok: true };
}
