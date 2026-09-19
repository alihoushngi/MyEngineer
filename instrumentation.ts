export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") {
    return;
  }

  const { applyApiTlsPolicy, isApiTlsInsecure } = await import(
    "@/lib/env/api-env/api-env"
  );

  applyApiTlsPolicy(isApiTlsInsecure(process.env.API_TLS_INSECURE));
}
