"use server";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  clearAccessSession,
} from "@/lib/auth/access-token-cookie/access-token-cookie";
import { clearMockEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { clearMockUserSession } from "@/lib/auth/user-session/user-session";
import {
  listAuthSessions,
  logoutAllSessions,
  revokeAuthSession,
  type AuthSession,
} from "@/services/session-service/session-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

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

async function clearLocalSession(): Promise<void> {
  await clearMockUserSession();
  await clearMockEngineerSession();
  await clearAccessSession();
}

export async function listAuthSessionsAction(): Promise<readonly AuthSession[]> {
  try {
    return await listAuthSessions();
  } catch {
    return [];
  }
}

export async function revokeSessionAction(
  id: number,
): Promise<ServiceMutationResult & { signedOut?: boolean }> {
  try {
    const sessions = await listAuthSessions();
    const target = sessions.find((session) => session.id === id);
    await revokeAuthSession(id);

    if (target?.current) {
      await clearLocalSession();
      return { ...mutationOk(), signedOut: true };
    }

    return mutationOk();
  } catch (error) {
    return toFailure(error, "پایان نشست انجام نشد.");
  }
}

export async function logoutAllSessionsAction(): Promise<ServiceMutationResult> {
  try {
    await logoutAllSessions();
    await clearLocalSession();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "خروج از همه دستگاه‌ها انجام نشد.");
  }
}
