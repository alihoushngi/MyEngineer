import { type SearchCatalogResult } from "@/types/store/search.types";
import { normalizeSearchText } from "@/lib/search/normalize-search-text/normalize-search-text";
import { env } from "@/lib/env/env";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";
import { listProfessionals } from "@/services/expert-service/expert-service";

/**
 * Search catalog access — services and professionals from live API.
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

  const needle = normalizeSearchText(normalizedQuery);
  const [services, experts] = await Promise.all([
    listServiceCategories(),
    listProfessionals({ perPage: 100 }),
  ]);

  return {
    query: normalizedQuery,
    services: services.filter((service) => {
      const haystack = normalizeSearchText(
        `${service.label} ${service.description} ${service.slug}`,
      );
      return haystack.includes(needle);
    }),
    experts: experts.filter((expert) => {
      const haystack = normalizeSearchText(
        [
          expert.name,
          expert.profession,
          expert.city,
          ...(expert.specialties ?? []),
        ]
          .filter(Boolean)
          .join(" "),
      );
      return (
        haystack.includes(needle) &&
        (cities.length === 0 ||
          (expert.city ? cities.includes(expert.city) : false))
      );
    }),
  };
}
