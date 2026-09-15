import { cookies } from "next/headers";

export const ACCESS_TOKEN_COOKIE = "mm_access_token";
export const AUTH_ROLE_COOKIE = "mm_auth_role";
export const AUTH_DISPLAY_COOKIE = "mm_auth_display";
export const PENDING_TOKEN_COOKIE = "mm_pending_token";

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

const PENDING_COOKIE_OPTIONS = {
  ...TOKEN_COOKIE_OPTIONS,
  maxAge: 60 * 15,
};

export type AuthRoleName =
  | "admin"
  | "user"
  | "assistant"
  | "engineer"
  | "consulter"
  | "insurance";

export function isEngineerPanelRole(role: string | undefined): boolean {
  return (
    role === "engineer" || role === "consulter" || role === "insurance"
  );
}

export async function readAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function readAuthRole(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_ROLE_COOKIE)?.value;
}

export async function readAuthDisplayName(): Promise<string | undefined> {
  const store = await cookies();
  const value = store.get(AUTH_DISPLAY_COOKIE)?.value;
  return value ? decodeURIComponent(value) : undefined;
}

export async function writeAccessSession(input: {
  token: string;
  role: string;
  displayName?: string;
}): Promise<void> {
  const store = await cookies();
  store.set({
    name: ACCESS_TOKEN_COOKIE,
    value: input.token,
    ...TOKEN_COOKIE_OPTIONS,
  });
  store.set({
    name: AUTH_ROLE_COOKIE,
    value: input.role,
    ...TOKEN_COOKIE_OPTIONS,
  });
  if (input.displayName) {
    store.set({
      name: AUTH_DISPLAY_COOKIE,
      value: encodeURIComponent(input.displayName),
      ...TOKEN_COOKIE_OPTIONS,
    });
  }
  store.delete(PENDING_TOKEN_COOKIE);
}

export async function writePendingToken(token: string): Promise<void> {
  const store = await cookies();
  store.set({
    name: PENDING_TOKEN_COOKIE,
    value: token,
    ...PENDING_COOKIE_OPTIONS,
  });
}

export async function readPendingToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(PENDING_TOKEN_COOKIE)?.value;
}

export async function clearAccessSession(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_COOKIE);
  store.delete(AUTH_ROLE_COOKIE);
  store.delete(AUTH_DISPLAY_COOKIE);
  store.delete(PENDING_TOKEN_COOKIE);
}
