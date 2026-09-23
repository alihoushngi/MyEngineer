import { parsePublicBool } from "@/lib/auth/parse-public-bool/parse-public-bool";
import { normalizeApiBaseUrl } from "@/lib/env/api-env/api-env";

function parseOptionalPublicBool(
  value: string | undefined,
): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

function resolveMediaBaseUrl(apiBaseUrl: string): string {
  const configured = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").trim();

  if (configured !== "") {
    return configured.replace(/\/$/, "");
  }

  if (apiBaseUrl === "") {
    return "";
  }

  try {
    const origin = new URL(apiBaseUrl).origin;
    return `${origin}/public`;
  } catch {
    return "";
  }
}

const apiBaseUrl = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
const liveApi = apiBaseUrl !== "";

export const env = {
  apiBaseUrl,
  mediaBaseUrl: resolveMediaBaseUrl(apiBaseUrl),
  useMockData: liveApi
    ? false
    : process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
  mockRegisterOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_REGISTER,
  ),
  mockLoginOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN,
  ),
  mockUserRegisterOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER,
  ),
  mockUserLoginOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN,
  ),
  /** Client-safe approximation for chrome; server still reads mock-auth.config. */
  publicMockRegisterEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_REGISTER,
    false,
  ),
  publicMockLoginEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN,
    false,
  ),
  publicMockUserRegisterEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER,
    false,
  ),
  publicMockUserLoginEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN,
    false,
  ),
} as const;

export type PublicEnv = typeof env;
