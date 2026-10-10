/** Decode a URL path segment once, retaining malformed or literal percent text. */
export function decodeRouteSlug(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
