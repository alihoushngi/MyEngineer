// Edge-safe: no `next/headers` import, so middleware can use it.
export const ACCESS_TOKEN_COOKIE = "mm_access_token";
export const AUTH_ROLE_COOKIE = "mm_auth_role";

export function isEngineerPanelRole(role: string | undefined): boolean {
  return role === "engineer" || role === "consulter" || role === "insurance";
}
