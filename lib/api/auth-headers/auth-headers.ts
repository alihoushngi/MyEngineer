export function authHeaders(token?: string): HeadersInit | undefined {
  if (!token) {
    return undefined;
  }

  return { Authorization: `Bearer ${token}` };
}
