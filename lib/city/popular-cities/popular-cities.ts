export type CityLike = { id: string; name: string };

function normalizeCityName(value: string): string {
  return value.replace(/ي/g, "ی").replace(/ك/g, "ک").trim();
}

/**
 * Resolves popular city names to real city records (in the given order).
 * Names that are not present in the list are ignored.
 */
export function resolvePopularCities<T extends CityLike>(
  cities: readonly T[],
  names: readonly string[],
): T[] {
  const resolved: T[] = [];

  for (const name of names) {
    const target = normalizeCityName(name);
    const match = cities.find(
      (city) => normalizeCityName(city.name) === target,
    );

    if (match && !resolved.some((item) => item.id === match.id)) {
      resolved.push(match);
    }
  }

  return resolved;
}

/** Case/Arabic-letter insensitive substring match used by the city search. */
export function matchesCityQuery(name: string, query: string): boolean {
  const needle = normalizeCityName(query);

  return needle === "" || normalizeCityName(name).includes(needle);
}
