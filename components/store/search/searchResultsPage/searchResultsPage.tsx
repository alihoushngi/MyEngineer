import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ActiveFilters } from "@/components/store/search/activeFilters/activeFilters";
import { SearchEmptyState } from "@/components/store/search/searchEmptyState/searchEmptyState";
import { SearchHeader } from "@/components/store/search/searchHeader/searchHeader";
import { SearchResults } from "@/components/store/search/searchResults/searchResults";
import { SearchSummary } from "@/components/store/search/searchSummary/searchSummary";

import { storePaths } from "@/config/navigation.config/navigation.config";
import { searchCopy } from "@/config/search.config/search.config";
import { siteConfig } from "@/config/site.config/site.config";

import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { buildSearchHref } from "@/lib/search/search-params/search-params";

import {
  type SearchCatalogResult,
  type SearchQueryState,
} from "@/types/store/search.types";

type SearchResultsPageProps = {
  queryState: SearchQueryState;
  result: SearchCatalogResult;
};

export function SearchResultsPage({
  queryState,
  result,
}: SearchResultsPageProps) {
  const { q, cities, page } = queryState;

  const hasQuery = q !== "";
  const hasResults = result.services.length > 0 || result.experts.length > 0;

  const expertPagination = paginateItems(result.experts, page);

  const paginationQuery = new URLSearchParams();

  if (q !== "") {
    paginationQuery.set("q", q);
  }

  if (cities.length > 0) {
    paginationQuery.set("cities", cities.join(","));
  }

  if (page > 1) {
    paginationQuery.set("page", String(page));
  }

  return (
    <div className="container-app flex flex-col gap-7 py-page sm:gap-8">
      <StoreBreadcrumb
        items={[
          {
            label: "خانه",
            href: siteConfig.homeHref,
          },
          {
            label: searchCopy.breadcrumb,
          },
        ]}
      />

      <SearchHeader initialQuery={q} cities={cities} />

      <div className="space-y-3">
        <SearchSummary
          query={q}
          serviceCount={result.services.length}
          expertCount={result.experts.length}
        />

        <ActiveFilters
          items={cities.map((city) => ({
            id: city,
            label: city,
            href: buildSearchHref({
              q,
              cities: cities.filter((item) => item !== city),
            }),
          }))}
          clearHref={buildSearchHref({ q })}
        />
      </div>

      {hasQuery && hasResults ? (
        <SearchResults
          services={result.services}
          experts={result.experts}
          expertPagination={expertPagination}
          paginationPathname={storePaths.search}
          paginationQuery={paginationQuery.toString()}
        />
      ) : (
        <SearchEmptyState variant={hasQuery ? "no-results" : "no-query"} />
      )}
    </div>
  );
}
