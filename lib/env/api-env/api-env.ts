export function normalizeApiBaseUrl(value: string | undefined): string {
  return (value ?? "").trim().replace(/\/+$/, "");
}

export function isApiTlsInsecure(value: string | undefined): boolean {
  return value === "true";
}

export function applyApiTlsPolicy(insecure: boolean): void {
  if (!insecure || typeof globalThis.window !== "undefined") {
    return;
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export function joinApiUrl(baseUrl: string, path: string): string {
  const base = normalizeApiBaseUrl(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
