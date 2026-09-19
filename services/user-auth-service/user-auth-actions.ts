"use server";

import {
  isMockUserLoginEnabled,
  isMockUserRegisterEnabled,
  mockAuthConfig,
} from "@/config/mock-auth.config/mock-auth.config";
import { maskIranianMobile } from "@/lib/auth/mask-iranian-mobile/mask-iranian-mobile";
import {
  mockRequestUserLoginOtp,
  mockUserLoginWithOtp,
  mockUserLoginWithPassword,
} from "@/lib/auth/mock-user-auth-adapter/mock-user-auth-adapter";
import { serializeMockUserProfileCookie } from "@/lib/auth/mock-user-profile-cookie/mock-user-profile-cookie";
import {
  mockCompleteUserRegister,
  mockRequestUserRegisterOtp,
  mockVerifyUserRegisterOtp,
} from "@/lib/auth/mock-user-register-adapter/mock-user-register-adapter";
import { writeMockUserSession } from "@/lib/auth/user-session/user-session";
import {
  mutationFailed,
  mutationOk,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { isApiError } from "@/lib/api/api-error/api-error";
import { env } from "@/lib/env/env";
import {
  clearMockEngineerSession,
} from "@/lib/auth/engineer-session/engineer-session";
import { clearMockUserSession } from "@/lib/auth/user-session/user-session";
import { writeAccessSession } from "@/lib/auth/access-token-cookie/access-token-cookie";
import {
  apiUserRegistrationComplete,
  apiUserRegistrationOtp,
  apiUserRegistrationVerify,
} from "@/services/auth-api-service/auth-api-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const AUTH_UNAVAILABLE = "ورود مشتری پس از اتصال سرویس احراز هویت فعال می‌شود.";
const REGISTER_UNAVAILABLE =
  "ثبت‌نام مشتری پس از اتصال سرویس احراز هویت فعال می‌شود.";

function toFailure(error: unknown, fallback: string): ServiceMutationResult {
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

export async function requestUserLoginOtpAction(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  return mockRequestUserLoginOtp(input);
}

export async function loginUserWithOtpAction(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  const result = await mockUserLoginWithOtp(input);

  if (!result.ok) {
    return result;
  }

  await writeMockUserSession({
    profileCookieValue: serializeMockUserProfileCookie({
      displayName: mockAuthConfig.mockUserLogin.displayName,
      phoneMasked: maskIranianMobile(input.phone),
      source: "login",
    }),
  });
  return { ok: true };
}

export async function loginUserWithPasswordAction(input: {
  phone: string;
  password: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  const result = await mockUserLoginWithPassword(input);

  if (!result.ok) {
    return result;
  }

  await writeMockUserSession({
    profileCookieValue: serializeMockUserProfileCookie({
      displayName: mockAuthConfig.mockUserLogin.displayName,
      phoneMasked: maskIranianMobile(input.phone),
      source: "login",
    }),
  });
  return { ok: true };
}

export async function requestUserRegisterOtpAction(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiUserRegistrationOtp({ mobile: input.phone.trim() });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ارسال کد ثبت‌نام ناموفق بود.");
    }
  }

  if (!isMockUserRegisterEnabled()) {
    return mutationUnavailable(REGISTER_UNAVAILABLE);
  }

  return mockRequestUserRegisterOtp(input);
}

export async function verifyUserRegisterOtpAction(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiUserRegistrationVerify({
        mobile: input.phone.trim(),
        code: input.otp.trim(),
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "کد ثبت‌نام معتبر نیست.");
    }
  }

  if (!isMockUserRegisterEnabled()) {
    return mutationUnavailable(REGISTER_UNAVAILABLE);
  }

  return mockVerifyUserRegisterOtp(input);
}

export async function completeUserRegisterAction(input: {
  phone: string;
  otp: string;
  displayName: string;
  password: string;
}): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      const data = await apiUserRegistrationComplete({
        mobile: input.phone.trim(),
        code: input.otp.trim(),
        display_name: input.displayName.trim(),
        password: input.password,
        device_name: "web",
      });

      await clearMockUserSession();
      await clearMockEngineerSession();
      await writeAccessSession({
        token: data.token,
        role: data.user.role?.name ?? "user",
        displayName:
          data.user.full_name?.trim() ||
          input.displayName.trim() ||
          [data.user.name, data.user.family].filter(Boolean).join(" ").trim(),
      });

      return mutationOk();
    } catch (error) {
      return toFailure(error, "تکمیل ثبت‌نام ناموفق بود.");
    }
  }

  if (!isMockUserRegisterEnabled()) {
    return mutationUnavailable(REGISTER_UNAVAILABLE);
  }

  const result = await mockCompleteUserRegister(input);

  if (!result.ok) {
    return result;
  }

  await writeMockUserSession({
    profileCookieValue: serializeMockUserProfileCookie({
      displayName: input.displayName.trim(),
      phoneMasked: maskIranianMobile(input.phone),
      source: "registration",
    }),
  });
  return { ok: true };
}

export async function logoutUserAction(): Promise<ServiceMutationResult> {
  const { logoutAction } = await import("@/services/auth-service/auth-actions");
  return logoutAction();
}
