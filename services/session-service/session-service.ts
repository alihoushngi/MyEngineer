import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import {
  httpDelete,
  httpGet,
  httpPost,
} from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { env } from "@/lib/env/env";

export type AuthSession = {
  id: number;
  device: string;
  current: boolean;
  lastUsedAt?: string | null;
  createdAt?: string | null;
};

type BackendSession = {
  id: number;
  device?: string | null;
  current?: boolean;
  last_used_at?: string | null;
  created_at?: string | null;
};

function mapSession(session: BackendSession): AuthSession {
  return {
    id: session.id,
    device: session.device?.trim() || "دستگاه ناشناس",
    current: session.current === true,
    lastUsedAt: session.last_used_at,
    createdAt: session.created_at,
  };
}

async function authorizedHeaders(): Promise<HeadersInit | undefined> {
  return authHeaders(await readAccessToken());
}

export async function listAuthSessions(): Promise<readonly AuthSession[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const token = await readAccessToken();
  if (!token) {
    return [];
  }

  const envelope = await httpGet<ApiEnvelope<readonly BackendSession[]>>(
    "/auth/sessions",
    {
      headers: authHeaders(token),
      cache: "no-store",
    },
  );

  return unwrapApiData(envelope).map(mapSession);
}

export async function revokeAuthSession(id: number): Promise<void> {
  await httpDelete<ApiEnvelope<null>>(`/auth/sessions/${id}`, {
    headers: await authorizedHeaders(),
  });
}

export async function logoutAllSessions(): Promise<void> {
  await httpPost<ApiEnvelope<null>>("/auth/logout-all", {
    headers: await authorizedHeaders(),
  });
}
