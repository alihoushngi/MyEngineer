"use client";

import { type ReactNode } from "react";
import Link from "next/link";

import {
  AlertCircleIcon,
  ChevronDownIcon,
  MapPinIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react";

import { CitySelectorDialog } from "@/components/common/citySelectorDialog/citySelectorDialog";
import { Pagination } from "@/components/common/pagination/pagination";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ServiceActiveFilters } from "@/components/store/service/serviceActiveFilters/serviceActiveFilters";
import { ServiceFilterOverlay } from "@/components/store/service/serviceFilterOverlay/serviceFilterOverlay";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { type ServiceSlug } from "@/config/services.config/services.config";

import { useServiceFilters } from "@/hooks/use-service-filters/use-service-filters";

import { formatPreferredCitiesLabel } from "@/lib/city/preferred-city/preferred-city";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  ALL_FILTER,
  serializeServiceFilterParams,
  type FilterOption,
  type ServiceFilterValues,
} from "@/lib/service/service-query/service-query";
import { cn } from "@/lib/utils/cn/cn";

import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type ServiceExpertMarketplaceProps = {
  slug: ServiceSlug;
  experts: readonly ExpertCardData[];
  total: number;
  page: number;
  pageCount: number;
  loadFailed: boolean;
  filters: ServiceFilterValues;
  cities: readonly City[];
  skills: readonly FilterOption[];
  disciplines: readonly FilterOption[];
  hasPreferredFallback: boolean;
  alignment?: {
    scope: ReactNode;
    suggested: ReactNode;
    request: ReactNode;
    process: ReactNode;
    faq: ReactNode;
    scopeFirst: boolean;
    showCategoryNavigation: boolean;
  };
};

export function ServiceExpertMarketplace({
  slug,
  experts,
  total,
  page,
  pageCount,
  loadFailed,
  filters,
  cities,
  skills,
  disciplines,
  hasPreferredFallback,
  alignment,
}: ServiceExpertMarketplaceProps) {
  const discovery = useServiceFilters({
    filters,
    cities,
    skills,
    disciplines,
    hasPreferredFallback,
  });

  const cityLabel = formatPreferredCitiesLabel(
    discovery.selectedCities,
    serviceFilterCopy.allCitiesLabel,
  );

  const mobileControls = (
    <div className="sticky top-[calc(4.25rem+env(safe-area-inset-top))] z-30 flex items-center gap-2 border-y border-border-subtle bg-surface/95 px-4 py-3 shadow-xs backdrop-blur-xl md:hidden">
      <CityButton
        label={cityLabel}
        className="flex-1"
        onClick={() => discovery.setCityDialogOpen(true)}
      />
      <Button
        variant="outline"
        size="sm"
        className="min-h-11 shrink-0"
        aria-haspopup="dialog"
        icon={<SlidersHorizontalIcon aria-hidden="true" />}
        onClick={discovery.openOverlay}
      >
        {serviceFilterCopy.filtersLabel}
      </Button>
      <span className="ms-auto inline-flex min-w-8 items-center justify-center rounded-lg bg-primary-subtle px-2 py-1 type-caption font-semibold text-primary">
        {formatFaNumber(total)}
      </span>
    </div>
  );

  const results = (
    <section
      aria-labelledby="service-experts-heading"
      aria-busy={discovery.isPending}
      className="space-y-6"
      data-service={slug}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="type-label text-primary">
            {serviceFilterCopy.foundSuffix}
          </p>

          <h2
            id="service-experts-heading"
            className="mt-1 type-h2 text-foreground"
          >
            {serviceFilterCopy.expertsHeading}
          </h2>

          <p
            aria-live="polite"
            className="mt-1 type-body-sm text-foreground-muted"
          >
            {formatFaNumber(total)} {serviceFilterCopy.foundSuffix}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <CityButton
            label={cityLabel}
            className="md:w-52"
            onClick={() => {
              discovery.setCityDialogOpen(true);
            }}
          />

          <Button
            variant="outline"
            icon={<SlidersHorizontalIcon aria-hidden="true" />}
            onClick={discovery.openOverlay}
          >
            {serviceFilterCopy.filtersLabel}
          </Button>
        </div>
      </div>

      {!alignment ? <div className="-mx-4">{mobileControls}</div> : null}

      <ServiceActiveFilters
        chips={discovery.activeChips}
        onClear={discovery.clearChip}
        onReset={discovery.reset}
      />

      {loadFailed ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={
              <AlertCircleIcon
                aria-hidden="true"
                className="text-destructive"
              />
            }
            title={serviceFilterCopy.errorTitle}
            description={serviceFilterCopy.errorDescription}
            action={
              <Button variant="outline" onClick={discovery.refresh}>
                {serviceFilterCopy.retryLabel}
              </Button>
            }
          />
        </div>
      ) : experts.length > 0 ? (
        <>
          <ul
            className={cn(
              "grid auto-rows-fr gap-4 transition-opacity duration-200 md:grid-cols-2 xl:grid-cols-3",
              discovery.isPending && "opacity-60",
            )}
          >
            {experts.map((expert) => (
              <li key={expert.id} className="min-w-0">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Pagination
              page={page}
              pageCount={pageCount}
              ariaLabel={serviceFilterCopy.paginationLabel}
              pathname={discovery.pathname}
              query={discovery.query}
            />
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<UsersIcon aria-hidden="true" className="text-primary" />}
            title={serviceFilterCopy.emptyTitle}
            description={serviceFilterCopy.emptyDescription}
            action={
              <Button
                variant="outline"
                icon={<MapPinIcon aria-hidden="true" />}
                onClick={() => {
                  discovery.setCityDialogOpen(true);
                }}
              >
                {serviceFilterCopy.changeCityLabel}
              </Button>
            }
          />
        </div>
      )}

      <ServiceFilterOverlay
        open={discovery.overlayOpen}
        options={discovery.options}
        values={discovery.draft}
        overlayKeys={discovery.overlayKeys}
        onOpenChange={discovery.setOverlayOpen}
        onChange={discovery.setDraftValue}
        onApply={discovery.applyDraft}
        onReset={discovery.reset}
      />

      <CitySelectorDialog
        id="service-city-selector-surface"
        open={discovery.cityDialogOpen}
        onOpenChange={discovery.setCityDialogOpen}
        initialCities={discovery.selectedCities}
        onSelected={discovery.changeCities}
      />
    </section>
  );

  if (!alignment) {
    return results;
  }

  const categoryLinks = [
    { id: ALL_FILTER, label: serviceFilterCopy.allOptionLabel },
    ...skills,
  ];

  return (
    <div className="flex min-w-0 flex-col" data-service-reference={slug}>
      {alignment.showCategoryNavigation && skills.length > 0 ? (
        <nav
          aria-label={serviceFilterCopy.skillLabel}
          className="order-0 min-w-0 border-b border-border-subtle bg-background-subtle lg:hidden"
        >
          <ul className="container-app flex gap-2 overflow-x-auto py-3">
            {categoryLinks.map((item) => {
              const params = serializeServiceFilterParams(
                { ...filters, skill: item.id },
                1,
                { explicitCities: hasPreferredFallback },
              );
              const query = params.toString();

              return (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={
                      query
                        ? `${discovery.pathname}?${query}`
                        : discovery.pathname
                    }
                    scroll={false}
                    aria-current={
                      filters.skill === item.id ? "page" : undefined
                    }
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-xl border border-border-subtle bg-surface px-4 type-body-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      filters.skill === item.id &&
                        "border-primary/30 bg-primary-subtle font-semibold text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      <div
        className={cn(
          "lg:hidden",
          alignment.scopeFirst ? "order-2" : "order-1",
        )}
      >
        {mobileControls}
      </div>
      <div
        className={cn(
          "lg:order-1",
          alignment.scopeFirst ? "order-1" : "order-2",
        )}
      >
        {alignment.scope}
      </div>
      <div
        className={cn(
          "order-3 bg-background-subtle pb-6 pt-6 lg:order-3 lg:pb-10",
          !alignment.suggested && "lg:pt-section",
          alignment.suggested && "lg:pt-0",
        )}
      >
        <div className="container-app flex justify-end">
          {alignment.request}
        </div>
      </div>
      <div className="order-4 bg-background-subtle pb-section lg:order-4">
        <div className="container-app">{results}</div>
      </div>
      <div className="order-5 lg:order-6">{alignment.faq}</div>
      {alignment.suggested ? (
        <div className="order-6 bg-background-subtle py-8 lg:order-2 lg:pb-10 lg:pt-section">
          <div className="container-app">{alignment.suggested}</div>
        </div>
      ) : null}
      <div className="order-7 lg:order-5">{alignment.process}</div>
    </div>
  );
}

function CityButton({
  label,
  className,
  onClick,
}: {
  label: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-label={serviceFilterCopy.cityFilterLabel}
      aria-haspopup="dialog"
      className={cn(
        "h-12 min-w-0 justify-between gap-2 rounded-xl bg-surface",
        className,
      )}
      onClick={onClick}
    >
      <span className="flex min-w-0 items-center gap-2">
        <MapPinIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-primary"
        />
        <span className="truncate">{label}</span>
      </span>
      <ChevronDownIcon
        aria-hidden="true"
        className="size-4 shrink-0 text-foreground-muted"
      />
    </Button>
  );
}
