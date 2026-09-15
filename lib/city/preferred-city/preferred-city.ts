export const PREFERRED_CITY_COOKIE = "mm_preferred_city";
export const PREFERRED_CITY_STORAGE_KEY = "mm_preferred_city";

export type PreferredCity = {
  id: string;
  name: string;
  provinceId: string;
  provinceName: string;
};

function encodePreferredCity(city: PreferredCity): string {
  return encodeURIComponent(JSON.stringify(city));
}

function decodePreferredCity(raw: string | undefined | null): PreferredCity | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<PreferredCity>;
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.provinceId !== "string" ||
      typeof parsed.provinceName !== "string"
    ) {
      return null;
    }

    return {
      id: parsed.id,
      name: parsed.name,
      provinceId: parsed.provinceId,
      provinceName: parsed.provinceName,
    };
  } catch {
    return null;
  }
}

export function readPreferredCityFromDocumentCookie(): PreferredCity | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${PREFERRED_CITY_COOKIE}=`));

  if (!match) {
    return null;
  }

  return decodePreferredCity(match.slice(PREFERRED_CITY_COOKIE.length + 1));
}

export function writePreferredCity(city: PreferredCity): void {
  if (typeof document === "undefined") {
    return;
  }

  const value = encodePreferredCity(city);
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${PREFERRED_CITY_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;

  try {
    window.localStorage.setItem(PREFERRED_CITY_STORAGE_KEY, JSON.stringify(city));
  } catch {
    // Ignore storage quota / private mode failures.
  }
}

export function clearPreferredCity(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${PREFERRED_CITY_COOKIE}=; path=/; max-age=0; samesite=lax`;

  try {
    window.localStorage.removeItem(PREFERRED_CITY_STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

export function readPreferredCityFromCookieHeader(
  cookieHeader: string | null | undefined,
): PreferredCity | null {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader
    .split("; ")
    .find((entry) => entry.startsWith(`${PREFERRED_CITY_COOKIE}=`));

  if (!match) {
    return null;
  }

  return decodePreferredCity(match.slice(PREFERRED_CITY_COOKIE.length + 1));
}
