export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") {
    return;
  }

  const { configureApiTlsServername } =
    await import("@/lib/env/api-tls-servername/api-tls-servername");

  configureApiTlsServername(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    process.env.API_TLS_SERVERNAME,
  );
}
