export const PREFERRED_CITY_COOKIE = "mm_preferred_city";
export const PREFERRED_CITY_STORAGE_KEY = "mm_preferred_city";

/** Cookie size guard: 10 compact entries stay well under the 4KB limit. */
export const MAX_PREFERRED_CITIES = 10;

export type PreferredCity = {
  id: string;
  name: string;
  provinceId: string;
  provinceName: string;
};

/**
 * Cookie formats:
 * - legacy: a single JSON object `{id,name,provinceId,provinceName}`
 * - current: a JSON array of compact tuples `[id,name,provinceId,provinceName]`
 *   (the legacy object form inside an array is accepted as well).
 */
function encodePreferredCities(cities: readonly PreferredCity[]): string {
  return encodeURIComponent(
    JSON.stringify(
      cities.map((city) => [
        city.id,
        city.name,
        city.provinceId,
        city.provinceName,
      ]),
    ),
  );
}

function toPreferredCity(entry: unknown): PreferredCity | null {
  if (Array.isArray(entry)) {
    const [id, name, provinceId, provinceName] = entry as unknown[];
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof provinceId === "string" &&
      typeof provinceName === "string"
    ) {
      return { id, name, provinceId, provinceName };
    }
    return null;
  }

  if (entry && typeof entry === "object") {
    const parsed = entry as Partial<PreferredCity>;
    if (
      typeof parsed.id === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.provinceId === "string" &&
      typeof parsed.provinceName === "string"
    ) {
      return {
        id: parsed.id,
        name: parsed.name,
        provinceId: parsed.provinceId,
        provinceName: parsed.provinceName,
      };
    }
  }

  return null;
}

export function decodePreferredCities(
  raw: string | undefined | null,
): PreferredCity[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    const entries: unknown[] = Array.isArray(parsed) && !isTuple(parsed)
      ? parsed
      : [parsed];
    const seen = new Set<string>();
    const cities: PreferredCity[] = [];

    for (const entry of entries) {
      const city = toPreferredCity(entry);
      if (city && !seen.has(city.id)) {
        seen.add(city.id);
        cities.push(city);
      }
    }

    return cities.slice(0, MAX_PREFERRED_CITIES);
  } catch {
    return [];
  }
}

/** A lone tuple (`["1","name","2","prov"]`) is one city, not a list. */
function isTuple(value: unknown[]): boolean {
  return value.length === 4 && value.every((item) => typeof item === "string");
}

function readCookieValue(cookieHeader: string): string | null {
  const match = cookieHeader
    .split("; ")
    .find((entry) => entry.startsWith(`${PREFERRED_CITY_COOKIE}=`));

  return match ? match.slice(PREFERRED_CITY_COOKIE.length + 1) : null;
}

export function readPreferredCitiesFromCookieHeader(
  cookieHeader: string | null | undefined,
): PreferredCity[] {
  if (!cookieHeader) {
    return [];
  }

  return decodePreferredCities(readCookieValue(cookieHeader));
}

export function readPreferredCitiesFromDocumentCookie(): PreferredCity[] {
  if (typeof document === "undefined") {
    return [];
  }

  return readPreferredCitiesFromCookieHeader(document.cookie);
}

export function writePreferredCities(cities: readonly PreferredCity[]): void {
  if (typeof document === "undefined") {
    return;
  }

  const limited = cities.slice(0, MAX_PREFERRED_CITIES);

  if (limited.length === 0) {
    clearPreferredCity();
    return;
  }

  const value = encodePreferredCities(limited);
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${PREFERRED_CITY_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;

  try {
    window.localStorage.setItem(
      PREFERRED_CITY_STORAGE_KEY,
      JSON.stringify(limited),
    );
  } catch {
    // Ignore storage quota / private mode failures.
  }
}

/** First preferred city (backward compatible single-city reader). */
export function readPreferredCityFromDocumentCookie(): PreferredCity | null {
  return readPreferredCitiesFromDocumentCookie()[0] ?? null;
}

export function writePreferredCity(city: PreferredCity): void {
  writePreferredCities([city]);
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
  return readPreferredCitiesFromCookieHeader(cookieHeader)[0] ?? null;
}

/** Short label for a selection: single name, or "first و N شهر دیگر". */
export function formatPreferredCitiesLabel(
  cities: readonly PreferredCity[],
  fallback: string,
): string {
  const first = cities[0];

  if (!first) {
    return fallback;
  }

  if (cities.length === 1) {
    return first.name;
  }

  return `${first.name} و ${new Intl.NumberFormat("fa-IR").format(cities.length - 1)} شهر دیگر`;
}
