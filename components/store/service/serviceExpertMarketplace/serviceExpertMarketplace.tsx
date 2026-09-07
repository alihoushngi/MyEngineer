"use client";

import { MapPinIcon, SlidersHorizontalIcon, UsersIcon } from "lucide-react";

import { Pagination } from "@/components/common/pagination/pagination";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ServiceActiveFilters } from "@/components/store/service/serviceActiveFilters/serviceActiveFilters";
import { ServiceFilterOverlay } from "@/components/store/service/serviceFilterOverlay/serviceFilterOverlay";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { type ServiceSlug } from "@/config/services.config/services.config";

import { useServiceDiscovery } from "@/hooks/use-service-discovery/use-service-discovery";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { ALL_FILTER } from "@/lib/service/filter-experts/filter-experts";

import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type ServiceExpertMarketplaceProps = {
  slug: ServiceSlug;
  experts: readonly ExpertCardData[];
  cities: readonly City[];
};

export function ServiceExpertMarketplace({
  slug,
  experts,
  cities,
}: ServiceExpertMarketplaceProps) {
  const discovery = useServiceDiscovery({
    slug,
    experts,
    cities,
  });

  const { pagination, definition } = discovery;

  return (
    <section aria-labelledby="service-experts-heading" className="space-y-6">
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
            {formatFaNumber(pagination.total)} {serviceFilterCopy.foundSuffix}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <CitySelect
            value={discovery.applied.city}
            cities={cities}
            onChange={discovery.changeCity}
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

      {definition.tabs.length > 0 ? (
        <div
          role="tablist"
          aria-label="زیردسته خدمت"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          {definition.tabs.map((tab) => {
            const active = discovery.applied.tab === tab.id;

            return (
              <Button
                key={tab.id}
                role="tab"
                size="sm"
                variant={active ? "primary" : "outline"}
                aria-selected={active}
                className="shrink-0"
                onClick={() => {
                  discovery.changeTab(tab.id);
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      ) : null}

      <div className="sticky top-[calc(4.25rem+env(safe-area-inset-top))] z-30 -mx-4 flex items-center gap-2 border-y border-border-subtle bg-surface/95 px-4 py-3 shadow-xs backdrop-blur-xl md:hidden">
        <CitySelect
          value={discovery.applied.city}
          cities={cities}
          onChange={discovery.changeCity}
        />

        <Button
          variant="outline"
          size="sm"
          className="shrink-0"
          icon={<SlidersHorizontalIcon aria-hidden="true" />}
          onClick={discovery.openOverlay}
        >
          {serviceFilterCopy.filtersLabel}
        </Button>

        <span className="ms-auto inline-flex min-w-8 items-center justify-center rounded-lg bg-primary-subtle px-2 py-1 type-caption font-semibold text-primary">
          {formatFaNumber(pagination.total)}
        </span>
      </div>

      <ServiceActiveFilters
        chips={discovery.activeChips}
        onClear={discovery.clearChip}
        onReset={discovery.reset}
      />

      {pagination.total > 0 ? (
        <>
          <ul className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pagination.items.map((expert) => (
              <li key={expert.id} className="min-w-0">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
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
                onClick={discovery.openOverlay}
              >
                {serviceFilterCopy.changeCityLabel}
              </Button>
            }
          />
        </div>
      )}

      <ServiceFilterOverlay
        open={discovery.overlayOpen}
        definition={definition}
        values={discovery.draft}
        overlayKeys={discovery.overlayKeys}
        draftCount={discovery.draftCount}
        onOpenChange={discovery.setOverlayOpen}
        onChange={discovery.setDraftValue}
        onApply={discovery.applyDraft}
        onReset={discovery.reset}
      />
    </section>
  );
}

function CitySelect({
  value,
  cities,
  onChange,
}: {
  value: string;
  cities: readonly City[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={serviceFilterCopy.cityFilterLabel}
        className="h-12 min-w-0 flex-1 gap-2 rounded-xl bg-surface md:w-52"
      >
        <MapPinIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-primary"
        />
        <SelectValue placeholder={serviceFilterCopy.allCitiesLabel} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_FILTER}>
          {serviceFilterCopy.allCitiesLabel}
        </SelectItem>

        {cities.map((city) => (
          <SelectItem key={city.id} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
