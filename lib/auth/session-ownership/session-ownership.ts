/** Only revoke a session listed by the backend for the current bearer token. */
export function findOwnedSession<T extends { id: number }>(
  id: number,
  sessions: readonly T[],
): T | undefined {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return undefined;
  }

  return sessions.find((session) => session.id === id);
}
