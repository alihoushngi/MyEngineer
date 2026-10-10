import { cache } from "react";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { verifyBackendSession } from "@/lib/auth/verify-backend-session/verify-backend-session";
import { apiMe } from "@/services/auth-api-service/auth-api-service";

// React cache only deduplicates reads within a server render; identities are
// never stored in a shared application cache between users or requests.
export const getVerifiedAuthUser = cache(async () => {
  return verifyBackendSession(await readAccessToken(), apiMe);
});
