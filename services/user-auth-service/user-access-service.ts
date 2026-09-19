/**
 * Server-only customer access reads.
 * Do not import this module from Client Components.
 */

import { env } from "@/lib/env/env";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import {
  getUserSession,
  readRawUserSessionCookie,
} from "@/lib/auth/user-session/user-session";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { MOCK_USER_SESSION_VALUE } from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { apiUserAccess } from "@/services/auth-api-service/auth-api-service";
import { type UserAccessResult } from "@/types/store/user-auth.types";

export async function getUserAccess(): Promise<UserAccessResult> {
  if (env.apiBaseUrl) {
    try {
      const access = await apiUserAccess();

      if (access.state === "authenticated") {
        const session = await getUserSession();
        if (session) {
          return { kind: "authenticated", session };
        }

        return {
          kind: "authenticated",
          session: {
            isAuthenticated: true,
            role: "user",
            isMock: false,
            source: "login",
            profile: access.user
              ? {
                  displayName:
                    access.user.full_name?.trim() ||
                    [access.user.name, access.user.family]
                      .filter(Boolean)
                      .join(" ")
                      .trim() ||
                    undefined,
                  source: "login",
                }
              : { source: "login" },
          },
        };
      }

      if (access.state === "engineer_session") {
        return { kind: "engineer_session" };
      }

      return { kind: "unauthenticated" };
    } catch {
      return { kind: "error", message: "بررسی دسترسی کاربر ناموفق بود." };
    }
  }

  const session = await getUserSession();

  if (session) {
    return { kind: "authenticated", session };
  }

  const engineerSession = await getEngineerSession();

  if (engineerSession) {
    return { kind: "engineer_session" };
  }

  const rawCookie = await readRawUserSessionCookie();

  if (rawCookie !== undefined && rawCookie !== MOCK_USER_SESSION_VALUE) {
    return { kind: "expired" };
  }

  if (rawCookie === MOCK_USER_SESSION_VALUE && !isMockUserAuthEnabled()) {
    return { kind: "expired" };
  }

  if (isMockUserAuthEnabled()) {
    return { kind: "unauthenticated" };
  }

  return { kind: "unavailable" };
}

export async function isUserAuthenticated(): Promise<boolean> {
  const access = await getUserAccess();
  return access.kind === "authenticated";
}
