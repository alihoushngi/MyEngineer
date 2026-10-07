export const ALL_FILTER = "all";
export const SERVICE_PAGE_SIZE = 12;

export type FilterKey =
  | "city"
  | "skill"
  | "experience"
  | "license"
  | "discipline"
  | "degree"
  | "sort";

export type FilterOption = { id: string; label: string };

export type ExperienceBand = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

export const experienceBands: readonly ExperienceBand[] = [
  { id: "0-5", label: "۰ تا ۵ سال", min: 0, max: 5 },
  { id: "5-10", label: "۵ تا ۱۰ سال", min: 5, max: 10 },
  { id: "10-15", label: "۱۰ تا ۱۵ سال", min: 10, max: 15 },
  { id: "15+", label: "بیش از ۱۵ سال", min: 15, max: null },
];

export const SERVICE_SORTS = [
  "newest",
  "rating",
  "popular",
  "experience",
] as const;

export type ServiceFilterValues = {
  /** Selected city ids. */
  cities: readonly string[];
  skill: string;
  experience: string;
  license: string;
  discipline: string;
  degree: string;
  sort: string;
};

export type ServiceFilterQuery = {
  filters: ServiceFilterValues;
  page: number;
  /** True when the URL carried a `cities` param (even an empty one). */
  citiesExplicit: boolean;
};

export type ActiveFilterChip = {
  id: string;
  key: Exclude<FilterKey, "sort">;
  label: string;
  /** City id for per-city chips. */
  value?: string;
};

type RawParams = Record<string, string | string[] | undefined>;

export function createEmptyFilters(): ServiceFilterValues {
  return {
    cities: [],
    skill: ALL_FILTER,
    experience: ALL_FILTER,
    license: ALL_FILTER,
    discipline: ALL_FILTER,
    degree: ALL_FILTER,
    sort: ALL_FILTER,
  };
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function single(value: string | string[] | undefined): string {
  const raw = first(value)?.trim();
  return raw ? raw : ALL_FILTER;
}

function parseIds(value: string | string[] | undefined): string[] {
  const entries = Array.isArray(value)
    ? value
    : value === undefined
      ? []
      : [value];
  const ids: string[] = [];

  for (const entry of entries) {
    for (const part of entry.split(",")) {
      const id = part.trim();
      if (/^\d+$/.test(id) && !ids.includes(id)) {
        ids.push(id);
      }
    }
  }

  return ids;
}

export function parseServiceFilterParams(
  params: RawParams,
): ServiceFilterQuery {
  const page = Number.parseInt(first(params.page) ?? "", 10);
  const sort = single(params.sort);

  return {
    filters: {
      cities: parseIds(params.cities),
      skill: single(params.skill),
      experience: single(params.experience),
      license: single(params.license),
      discipline: single(params.discipline),
      degree: single(params.degree),
      sort: (SERVICE_SORTS as readonly string[]).includes(sort)
        ? sort
        : ALL_FILTER,
    },
    page: Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1,
    citiesExplicit: params.cities !== undefined,
  };
}

export function serializeServiceFilterParams(
  filters: ServiceFilterValues,
  page: number,
  options: { explicitCities?: boolean } = {},
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.cities.length > 0) {
    params.set("cities", filters.cities.join(","));
  } else if (options.explicitCities) {
    params.set("cities", "");
  }

  for (const key of [
    "skill",
    "experience",
    "license",
    "discipline",
    "degree",
    "sort",
  ] as const) {
    if (filters[key] !== ALL_FILTER) {
      params.set(key, filters[key]);
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  return params;
}

export function hasActiveServiceFilters(filters: ServiceFilterValues): boolean {
  return (
    filters.cities.length > 0 ||
    filters.skill !== ALL_FILTER ||
    filters.experience !== ALL_FILTER ||
    filters.license !== ALL_FILTER ||
    filters.discipline !== ALL_FILTER ||
    filters.degree !== ALL_FILTER
  );
}

export type ProfessionalsQuery = Record<
  string,
  string | number | boolean | (string | number)[] | undefined
>;

/** Query params for GET /professionals. */
export function buildProfessionalsQuery(
  filters: ServiceFilterValues,
  page: number,
  options: { serviceId?: number; perPage?: number } = {},
): ProfessionalsQuery {
  const band = experienceBands.find((item) => item.id === filters.experience);
  const skillId = Number(filters.skill);
  const serviceId =
    filters.skill !== ALL_FILTER && Number.isFinite(skillId)
      ? skillId
      : options.serviceId;

  return {
    service_id: serviceId,
    "city_ids[]":
      filters.cities.length > 0 ? filters.cities.map(Number) : undefined,
    min_experience: band?.min,
    max_experience: band?.max ?? undefined,
    has_license: filters.license === "licensed" ? 1 : undefined,
    discipline_id:
      filters.discipline !== ALL_FILTER
        ? Number(filters.discipline)
        : undefined,
    degree: filters.degree !== ALL_FILTER ? filters.degree : undefined,
    sort: filters.sort !== ALL_FILTER ? filters.sort : undefined,
    page,
    per_page: options.perPage ?? SERVICE_PAGE_SIZE,
  };
}

function labelOf(
  id: string,
  options: readonly FilterOption[],
): string | undefined {
  return options.find((item) => item.id === id)?.label;
}

export function getActiveFilterChips(
  filters: ServiceFilterValues,
  context: {
    cities: readonly { id: string; name: string }[];
    skills: readonly FilterOption[];
    disciplines: readonly FilterOption[];
    licenses: readonly FilterOption[];
    degrees: readonly FilterOption[];
  },
): readonly ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  for (const id of filters.cities) {
    const name = context.cities.find((city) => city.id === id)?.name;
    chips.push({
      id: `city-${id}`,
      key: "city",
      label: name ?? "شهر",
      value: id,
    });
  }

  const simple: [
    Exclude<FilterKey, "sort" | "city">,
    readonly FilterOption[],
  ][] = [
    ["skill", context.skills],
    ["experience", experienceBands],
    ["license", context.licenses],
    ["discipline", context.disciplines],
    ["degree", context.degrees],
  ];

  for (const [key, options] of simple) {
    if (filters[key] === ALL_FILTER) {
      continue;
    }
    const label = labelOf(filters[key], options);
    if (label) {
      chips.push({ id: key, key, label });
    }
  }

  return chips;
}

/** Filter keys shown in the overlay, derived from the data available. */
export function getOverlayFilterKeys(available: {
  hasSkills: boolean;
  hasDisciplines: boolean;
}): readonly FilterKey[] {
  const keys: FilterKey[] = [];
  if (available.hasSkills) keys.push("skill");
  keys.push("experience", "license");
  if (available.hasDisciplines) keys.push("discipline");
  keys.push("degree", "sort");
  return keys;
}
