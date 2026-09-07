import { BriefcaseBusinessIcon, UsersIcon } from "lucide-react";

import { Pagination } from "@/components/common/pagination/pagination";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { Empty } from "@/components/ui/empty/empty";

import { type SearchResultsProps } from "@/components/store/search/searchResults/type/searchResults.types";

import { searchCopy } from "@/config/search.config/search.config";

export function SearchResults({
  services,
  experts,
  expertPagination,
  paginationPathname,
  paginationQuery,
}: SearchResultsProps) {
  const visibleExperts = expertPagination?.items ?? experts;

  return (
    <div className="space-y-12">
      {services.length > 0 ? (
        <section
          className="space-y-5"
          aria-labelledby="search-services-heading"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
              <BriefcaseBusinessIcon aria-hidden="true" className="size-4" />
            </span>

            <h2
              id="search-services-heading"
              className="type-h3 text-foreground"
            >
              {searchCopy.servicesHeading}
            </h2>
          </div>

          <ul className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="min-w-0">
                <ServiceCard
                  href={service.href}
                  title={service.label}
                  description={service.description}
                  icon={<ServiceIcon slug={service.slug} />}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-5" aria-labelledby="search-experts-heading">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <UsersIcon aria-hidden="true" className="size-4" />
          </span>

          <h2 id="search-experts-heading" className="type-h3 text-foreground">
            {searchCopy.expertsHeading}
          </h2>
        </div>

        {visibleExperts.length > 0 ? (
          <>
            <ul className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
              {visibleExperts.map((expert) => (
                <li key={expert.id} className="min-w-0">
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>

            {expertPagination && paginationPathname ? (
              <div className="pt-2">
                <Pagination
                  page={expertPagination.page}
                  pageCount={expertPagination.pageCount}
                  ariaLabel={searchCopy.paginationLabel}
                  pathname={paginationPathname}
                  query={paginationQuery}
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-3xl border border-border-subtle bg-surface-subtle p-2">
            <Empty
              icon={<UsersIcon aria-hidden="true" className="text-primary" />}
              title={searchCopy.expertsUnavailable}
            />
          </div>
        )}
      </section>
    </div>
  );
}
