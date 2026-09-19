import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  mapCity,
  mapProfessionalCard,
  mapServiceCategory,
} from "@/lib/api/map-backend/map-backend";
import { type SearchCatalogResult } from "@/types/store/search.types";
import { env } from "@/lib/env/env";
import { listCatalogCities } from "@/services/catalog-service/catalog-service";
import {
  type BackendCity,
  type BackendProfessionalCard,
  type BackendServiceNode,
} from "@/types/api/backend.types";
import { type City } from "@/types/store/registration.types";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type ServiceCategory } from "@/config/services.config/services.config";

export type SearchSuggestResult = {
  services: readonly ServiceCategory[];
  cities: readonly City[];
  professionals: readonly {
    id: string;
    fullName: string;
    image?: string;
  }[];
};

/**
 * Search catalog access — prefers GET /search when apiBaseUrl is set.
 */
export async function searchCatalog(
  query: string,
  cities: readonly string[] = [],
): Promise<SearchCatalogResult> {
  const normalizedQuery = query.trim();

  if (normalizedQuery === "") {
    return {
      query: "",
      services: [],
      experts: [],
    };
  }

  if (!env.apiBaseUrl) {
    return {
      query: normalizedQuery,
      services: [],
      experts: [],
    };
  }

  try {
    const cityIds = await resolveCityIds(cities);
    const cityQuery: number[] | undefined =
      cityIds.length > 0 ? cityIds.map((id) => id) : undefined;
    const envelope = await httpGet<
      ApiEnvelope<{
        query?: string;
        services?: readonly BackendServiceNode[];
        experts?: readonly BackendProfessionalCard[];
      }>
    >("/search", {
      query: {
        query: normalizedQuery,
        "cities[]": cityQuery,
      },
      next: { revalidate: 60 },
    });

    const data = unwrapApiData(envelope);

    return {
      query: data.query?.trim() || normalizedQuery,
      services: (data.services ?? []).map(mapServiceCategory),
      experts: (data.experts ?? []).map(mapProfessionalCard),
    };
  } catch {
    return {
      query: normalizedQuery,
      services: [],
      experts: [],
    };
  }
}

/**
 * Instant suggestions for search typeahead (GET /search/suggest).
 * Not wired into SearchInput UI yet — no existing typeahead hook.
 */
export async function searchSuggest(
  q: string,
  limit = 5,
): Promise<SearchSuggestResult> {
  const query = q.trim();

  if (!env.apiBaseUrl || query.length < 2) {
    return { services: [], cities: [], professionals: [] };
  }

  try {
    const envelope = await httpGet<
      ApiEnvelope<{
        services?: readonly BackendServiceNode[];
        cities?: readonly BackendCity[];
        professionals?: readonly {
          id: number;
          full_name?: string;
          image?: string | null;
        }[];
      }>
    >("/search/suggest", {
      query: { q: query, limit },
      cache: "no-store",
    });

    const data = unwrapApiData(envelope);

    return {
      services: (data.services ?? []).map(mapServiceCategory),
      cities: (data.cities ?? []).map(mapCity),
      professionals: (data.professionals ?? []).map((item) => ({
        id: String(item.id),
        fullName: item.full_name?.trim() || "متخصص",
        image: item.image ?? undefined,
      })),
    };
  } catch {
    return { services: [], cities: [], professionals: [] };
  }
}

async function resolveCityIds(
  cities: readonly string[],
): Promise<readonly number[]> {
  if (cities.length === 0) {
    return [];
  }

  const numeric = cities
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (numeric.length === cities.length) {
    return numeric;
  }

  try {
    const catalog = await listCatalogCities();
    const byName = new Map(
      catalog.map((city) => [city.name.trim().toLowerCase(), Number(city.id)]),
    );

    return cities
      .map((value) => {
        const asNumber = Number(value);
        if (Number.isFinite(asNumber) && asNumber > 0) {
          return asNumber;
        }
        return byName.get(value.trim().toLowerCase()) ?? NaN;
      })
      .filter((id) => Number.isFinite(id) && id > 0);
  } catch {
    return numeric;
  }
}

export type { ExpertCardData };
