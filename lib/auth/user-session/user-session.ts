import { cookies } from "next/headers";
import { env } from "@/lib/env/env";
import {
  isEngineerPanelRole,
  readAccessToken,
  readAuthDisplayName,
  readAuthRole,
} from "@/lib/auth/access-token-cookie/access-token-cookie";
import {
  isMockUserAuthEnabled,
  isMockUserLoginEnabled,
  isMockUserRegisterEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import {
  MOCK_ENGINEER_PROFILE_COOKIE,
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_SESSION_COOKIE_OPTIONS,
  MOCK_USER_PROFILE_COOKIE,
  MOCK_USER_SAVED_COOKIE,
  MOCK_USER_SESSION_COOKIE,
  MOCK_USER_SESSION_VALUE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { parseMockUserProfileCookie } from "@/lib/auth/mock-user-profile-cookie/mock-user-profile-cookie";
import { type UserSession } from "@/types/store/user-auth.types";

export async function getUserSession(): Promise<UserSession | null> {
  if (env.apiBaseUrl) {
    const token = await readAccessToken();
    const role = await readAuthRole();
    if (!token || isEngineerPanelRole(role)) {
      return null;
    }

    const displayName = await readAuthDisplayName();
    return {
      isAuthenticated: true,
      role: "user",
      isMock: false,
      source: "login",
      profile: displayName
        ? { displayName, source: "login" }
        : { source: "login" },
    };
  }

  if (!isMockUserAuthEnabled()) {
    return null;
  }

  const store = await cookies();
  const sessionValue = store.get(MOCK_USER_SESSION_COOKIE)?.value;

  if (sessionValue !== MOCK_USER_SESSION_VALUE) {
    return null;
  }

  const profile = parseMockUserProfileCookie(
    store.get(MOCK_USER_PROFILE_COOKIE)?.value,
  );
  const source = profile?.source ?? (profile ? "registration" : "login");

  if (source === "login" && !isMockUserLoginEnabled()) {
    return null;
  }

  if (
    source === "registration" &&
    !isMockUserRegisterEnabled() &&
    !isMockUserLoginEnabled()
  ) {
    return null;
  }

  return {
    isAuthenticated: true,
    role: "user",
    isMock: true,
    source,
    profile,
  };
}

export async function writeMockUserSession(input: {
  profileCookieValue?: string;
}): Promise<void> {
  if (!isMockUserAuthEnabled()) {
    return;
  }

  const store = await cookies();

  store.delete(MOCK_ENGINEER_SESSION_COOKIE);
  store.delete(MOCK_ENGINEER_PROFILE_COOKIE);

  store.set({
    name: MOCK_USER_SESSION_COOKIE,
    value: MOCK_USER_SESSION_VALUE,
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });

  if (input.profileCookieValue) {
    store.set({
      name: MOCK_USER_PROFILE_COOKIE,
      value: input.profileCookieValue,
      ...MOCK_SESSION_COOKIE_OPTIONS,
    });
    return;
  }

  store.delete(MOCK_USER_PROFILE_COOKIE);
}

export async function clearMockUserSession(): Promise<void> {
  const store = await cookies();
  store.delete(MOCK_USER_SESSION_COOKIE);
  store.delete(MOCK_USER_PROFILE_COOKIE);
  store.delete(MOCK_USER_SAVED_COOKIE);
}

export async function readRawUserSessionCookie(): Promise<string | undefined> {
  if (env.apiBaseUrl) {
    return readAccessToken();
  }
  const store = await cookies();
  return store.get(MOCK_USER_SESSION_COOKIE)?.value;
}
