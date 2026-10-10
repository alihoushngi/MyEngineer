type BackendSessionIdentity = {
  id: number;
  role?: { name: string } | null;
};

/** Verify each live session against the backend instead of trusting cookies. */
export async function verifyBackendSession<T extends BackendSessionIdentity>(
  token: string | undefined,
  fetchUser: (token: string) => Promise<T>,
): Promise<T | null> {
  if (!token) {
    return null;
  }

  try {
    const user = await fetchUser(token);
    if (
      !Number.isSafeInteger(user?.id) ||
      user.id <= 0 ||
      typeof user.role?.name !== "string" ||
      user.role.name.trim() === ""
    ) {
      return null;
    }

    return user;
  } catch {
    // Invalid, expired and revoked tokens, or unavailable verification, fail closed.
    return null;
  }
}
