const ENCODED_DOUBLE_SLASH = /%2f%2f/i;
const ENCODED_BACKSLASH = /%5c/i;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const ENCODED_PATH_SEPARATOR = /%(?:2f|5c)/i;

/**
 * Rejects protocol-relative, absolute, and encoded external destinations.
 * Query strings on a real internal path are allowed.
 */
export function isSafeInternalPath(value: string): boolean {
  if (CONTROL_CHARACTERS.test(value)) {
    return false;
  }

  const trimmed = value.trim();

  if (trimmed === "" || !trimmed.startsWith("/")) {
    return false;
  }

  if (trimmed.startsWith("//") || trimmed.includes("://")) {
    return false;
  }

  if (trimmed.includes("\\") || ENCODED_BACKSLASH.test(trimmed)) {
    return false;
  }

  if (ENCODED_DOUBLE_SLASH.test(trimmed)) {
    return false;
  }

  if (/[\s]/.test(trimmed)) {
    return false;
  }

  const rawPath = trimmed.split(/[?#]/)[0] ?? trimmed;
  if (ENCODED_PATH_SEPARATOR.test(rawPath)) {
    return false;
  }

  try {
    const pathname = decodeURIComponent(rawPath);
    // Reject traversal and double encoding before checking the destination's
    // route family. Browsers normalize dot segments, including encoded dots.
    if (
      CONTROL_CHARACTERS.test(pathname) ||
      /%[\da-f]{2}/i.test(pathname) ||
      /(?:^|\/)\.{1,2}(?:\/|$)/.test(pathname)
    ) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

export function pathWithoutSearch(value: string): string {
  const [pathname] = value.split(/[?#]/);
  try {
    return decodeURIComponent(pathname ?? value);
  } catch {
    return pathname ?? value;
  }
}

export function isEngineerFamilyPath(pathname: string): boolean {
  return pathname === "/engineer" || pathname.startsWith("/engineer/");
}

export function getSafeInternalNext(
  next: string | null | undefined,
  fallback: string,
  isRejectedPath: (pathname: string) => boolean,
): string {
  if (next == null || next.trim() === "") {
    return fallback;
  }

  const value = next.trim();

  if (!isSafeInternalPath(value)) {
    return fallback;
  }

  const pathname = pathWithoutSearch(value);

  if (isRejectedPath(pathname)) {
    return fallback;
  }

  return value;
}
