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
import {
  writeMockUserSession,
} from "@/lib/auth/user-session/user-session";
import { mutationUnavailable } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const AUTH_UNAVAILABLE = "ورود مشتری پس از اتصال سرویس احراز هویت فعال می‌شود.";
const REGISTER_UNAVAILABLE =
  "ثبت‌نام مشتری پس از اتصال سرویس احراز هویت فعال می‌شود.";

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
  if (!isMockUserRegisterEnabled()) {
    return mutationUnavailable(REGISTER_UNAVAILABLE);
  }

  return mockRequestUserRegisterOtp(input);
}

export async function verifyUserRegisterOtpAction(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
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
