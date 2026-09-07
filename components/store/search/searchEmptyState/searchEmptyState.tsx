import { SearchIcon } from "lucide-react";
import Link from "next/link";

import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";
import { type SearchEmptyVariant } from "@/components/store/search/searchEmptyState/type/searchEmptyState.types";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { storePaths } from "@/config/navigation.config/navigation.config";
import { searchCopy } from "@/config/search.config/search.config";

type SearchEmptyStateProps = {
  variant: SearchEmptyVariant;
};

export function SearchEmptyState({ variant }: SearchEmptyStateProps) {
  const isNoQuery = variant === "no-query";

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-border-subtle bg-surface-subtle p-2 sm:p-4">
        <Empty
          icon={<SearchIcon aria-hidden="true" className="text-primary" />}
          title={
            isNoQuery ? searchCopy.noQueryTitle : searchCopy.noResultsTitle
          }
          description={
            isNoQuery
              ? searchCopy.noQueryDescription
              : searchCopy.noResultsDescription
          }
          action={
            isNoQuery ? (
              <SearchCityTrigger className="sm:w-48" />
            ) : (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
                <Button asChild variant="outline">
                  <Link href={storePaths.search}>
                    {searchCopy.changeSearchLabel}
                  </Link>
                </Button>

                <SearchCityTrigger className="sm:w-48" />
              </div>
            )
          }
        />
      </div>

      <section className="space-y-5" aria-labelledby="search-browse-services">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-1 rounded-full bg-primary"
          />
          <h2 id="search-browse-services" className="type-h3 text-foreground">
            {searchCopy.browseServices}
          </h2>
        </div>

        <ServiceCategoryGrid />
      </section>
    </div>
  );
}
