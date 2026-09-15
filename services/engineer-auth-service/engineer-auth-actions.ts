"use server";

import { isMockLoginEnabled } from "@/config/mock-auth.config/mock-auth.config";
import {
  mockLoginWithOtp,
  mockLoginWithPassword,
  mockRequestLoginOtp,
} from "@/lib/auth/mock-engineer-auth-adapter/mock-engineer-auth-adapter";
import {
  writeMockEngineerSession,
} from "@/lib/auth/engineer-session/engineer-session";
import { mutationUnavailable } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const AUTH_UNAVAILABLE = "ورود متخصص پس از اتصال سرویس احراز هویت فعال می‌شود.";

export async function requestEngineerLoginOtpAction(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  return mockRequestLoginOtp(input);
}

export async function loginEngineerWithOtpAction(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  const result = await mockLoginWithOtp(input);

  if (!result.ok) {
    return result;
  }

  await writeMockEngineerSession({ source: "login" });
  return { ok: true };
}

export async function loginEngineerWithPasswordAction(input: {
  phone: string;
  password: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationUnavailable(AUTH_UNAVAILABLE);
  }

  const result = await mockLoginWithPassword(input);

  if (!result.ok) {
    return result;
  }

  await writeMockEngineerSession({ source: "login" });
  return { ok: true };
}

export async function logoutEngineerAction(): Promise<ServiceMutationResult> {
  const { logoutAction } = await import("@/services/auth-service/auth-actions");
  return logoutAction();
}
