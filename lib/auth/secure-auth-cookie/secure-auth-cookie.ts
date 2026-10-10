/** Production sessions require HTTPS, regardless of local test overrides. */
export function shouldUseSecureAuthCookies(
  nodeEnv: string | undefined = process.env.NODE_ENV,
  localOverride: string | undefined = process.env.AUTH_COOKIE_SECURE,
): boolean {
  return nodeEnv === "production" || localOverride === "true";
}
