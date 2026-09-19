import { env } from "@/lib/env/env";
import { canUseMocks } from "@/lib/auth/can-use-mocks/can-use-mocks";
import { resolveMockFlag } from "@/lib/auth/resolve-mock-flag/resolve-mock-flag";

/**
 * Central source of truth for development mock authentication.
 *
 * Toggle engineer flags (`mockRegister`, `mockLogin`) and customer flags
 * (`mockUserRegister`, `mockUserLogin`) here.
 * Optional env overrides cannot enable mocks in production.
 *
 * DO NOT ENABLE MOCK AUTH IN PRODUCTION.
 * `canUseMocks()` is false when NODE_ENV === "production".
 *
 * This module is imported from server/middleware code only.
 * Do not import it from Client Components.
 */
export const mockAuthConfig = {
  mockRegister: {
    enabled: false,
    /** Must match registration OTP_LENGTH (5 digits). Not the login OTP. */
    otp: "12345",
    delayMs: 300,
    forceError: false,
  },
  mockLogin: {
    enabled: false,
    phone: "09115447316",
    otp: "123456",
    password: "admin1234",
    delayMs: 300,
    forceError: false,
  },
  mockUserRegister: {
    enabled: false,
    /** Must match LOGIN_OTP_LENGTH (6 digits). */
    otp: "654321",
    delayMs: 300,
    forceError: false,
  },
  mockUserLogin: {
    enabled: false,
    phone: "09121112233",
    otp: "654321",
    password: "user1234",
    displayName: "سارا مشتری",
    delayMs: 300,
    forceError: false,
  },
} as const;

export function isMockRegisterEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockRegister.enabled,
    env.mockRegisterOverride,
  );
}

export function isMockLoginEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockLogin.enabled,
    env.mockLoginOverride,
  );
}

export function isMockAuthEnabled(): boolean {
  return isMockRegisterEnabled() || isMockLoginEnabled();
}

export function isMockUserRegisterEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockUserRegister.enabled,
    env.mockUserRegisterOverride,
  );
}

export function isMockUserLoginEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockUserLogin.enabled,
    env.mockUserLoginOverride,
  );
}

export function isMockUserAuthEnabled(): boolean {
  return isMockUserRegisterEnabled() || isMockUserLoginEnabled();
}

export function isAnyMockAuthEnabled(): boolean {
  return isMockAuthEnabled() || isMockUserAuthEnabled();
}
