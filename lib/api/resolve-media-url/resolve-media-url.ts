import { env } from "@/lib/env/env";

/**
 * Backend returns relative upload paths (e.g. `front/upload/...`).
 * Public files are served under `{origin}/public/...`.
 */
export function resolveMediaUrl(
  path: string | null | undefined,
): string | undefined {
  if (!path) {
    return undefined;
  }

  const trimmed = path.trim();

  if (trimmed === "") {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }

  const mediaBase = env.mediaBaseUrl.replace(/\/$/, "");

  if (mediaBase === "") {
    return undefined;
  }

  const normalized = trimmed.replace(/^\/+/, "");

  if (normalized.startsWith("public/")) {
    return `${mediaBase.replace(/\/public$/, "")}/${normalized}`;
  }

  return `${mediaBase}/${normalized}`;
}
