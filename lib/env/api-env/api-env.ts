export function normalizeApiBaseUrl(value: string | undefined): string {
  return (value ?? "").trim().replace(/\/+$/, "");
}

export function joinApiUrl(baseUrl: string, path: string): string {
  const base = normalizeApiBaseUrl(baseUrl);
  const origin = new URL(base);
  if (
    !["http:", "https:"].includes(origin.protocol) ||
    origin.username ||
    origin.password ||
    origin.search ||
    origin.hash
  ) {
    throw new Error("Invalid API base URL");
  }

  // Resource IDs must never change the endpoint through URL normalization.
  // Query parameters belong in the client's query option, not in path values.
  if (/[\\?#\u0000-\u001f\u007f]/.test(path)) {
    throw new Error("Invalid API path");
  }
  for (const segment of path.split("/")) {
    const decoded = decodeURIComponent(segment);
    if (
      decoded === "." ||
      decoded === ".." ||
      /[\\/\u0000-\u001f\u007f]|%[\da-f]{2}/i.test(decoded)
    ) {
      throw new Error("Invalid API path segment");
    }
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
