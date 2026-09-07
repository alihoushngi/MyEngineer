"use client";

import { SlidersHorizontalIcon, UsersIcon, XIcon } from "lucide-react";

import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { Pagination } from "@/components/common/pagination/pagination";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { homeMarketplaceCopy } from "@/config/home.config/home.config";
import { serviceCategories } from "@/config/services.config/services.config";

import { useHomeMarketplace } from "@/hooks/use-home-marketplace/use-home-marketplace";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type HomeMarketplaceProps = {
  experts: readonly ExpertCardData[];
  cities: readonly City[];
};

export function HomeMarketplace({ experts, cities }: HomeMarketplaceProps) {
  const marketplace = useHomeMarketplace(experts);

  return (
    <section
      id="home-marketplace"
      aria-labelledby="home-marketplace-heading"
      className="
        relative
        isolate
        scroll-mt-[calc(5.75rem+env(safe-area-inset-top))]
        overflow-hidden
        bg-background
        py-section
      "
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-48
          top-20
          -z-10

          size-136
          rounded-full

          bg-primary/5
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-e-52
          bottom-16
          -z-10

          size-144
          rounded-full

          bg-secondary/5
          blur-[140px]
        "
      />

      <div className="container-app">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Heading */}
          <div
            className="
              flex
              flex-col
              gap-5

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div className="max-w-2xl space-y-3">
              <p
                className="
                  inline-flex
                  w-fit
                  items-center

                  rounded-full
                  border
                  border-primary/10

                  bg-primary-subtle

                  px-3
                  py-1

                  type-caption
                  font-semibold
                  text-primary
                "
              >
                {homeMarketplaceCopy.eyebrow}
              </p>

              <h2
                id="home-marketplace-heading"
                className="
                  type-h1
                  text-foreground
                "
              >
                {homeMarketplaceCopy.title}
              </h2>

              <p
                className="
                  max-w-xl
                  type-body
                  leading-relaxed
                  text-foreground-muted
                "
              >
                {homeMarketplaceCopy.description}
              </p>
            </div>

            <div
              aria-live="polite"
              className="
                flex
                w-fit
                items-center
                gap-2

                rounded-full
                border
                border-border-subtle

                bg-surface

                px-3.5
                py-2

                type-body-sm
                text-foreground-muted

                shadow-xs
              "
            >
              <UsersIcon aria-hidden="true" className="size-4 text-primary" />

              <strong className="font-semibold text-primary">
                {formatFaNumber(marketplace.pagination.total)}
              </strong>

              <span>{homeMarketplaceCopy.foundSuffix}</span>
            </div>
          </div>

          {/* Service categories */}
          <div
            className="
              -mx-4
              overflow-x-auto
              px-4
              pb-1

              scrollbar-none
              [&::-webkit-scrollbar]:hidden

              sm:mx-0
              sm:px-0
            "
          >
            <div
              className="
                flex
                min-w-max
                snap-x
                snap-mandatory
                gap-2
              "
              aria-label={homeMarketplaceCopy.serviceFilterLabel}
            >
              {serviceCategories.map((service) => {
                const active = marketplace.services.includes(service.slug);

                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => marketplace.toggleService(service.slug)}
                    aria-pressed={active}
                    className={cn(
                      `
                        min-h-11
                        snap-start

                        rounded-full
                        border

                        px-4

                        type-button

                        outline-none

                        shadow-xs

                        transition-all
                        duration-200
                        ease-in-out

                        focus-visible:ring-2
                        focus-visible:ring-ring
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-background

                        active:scale-[0.98]

                        motion-reduce:transform-none
                      `,
                      active
                        ? `
                            border-primary
                            bg-primary
                            text-primary-foreground
                            shadow-sm
                          `
                        : `
                            border-border-subtle
                            bg-surface
                            text-foreground-muted

                            hover:border-primary/30
                            hover:bg-primary-subtle
                            hover:text-primary
                          `,
                    )}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div
            className="
              relative

              grid
              gap-3

              rounded-3xl
              border
              border-border-subtle

              bg-surface

              p-3

              shadow-sm

              sm:p-4

              md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]
              md:items-center
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-8
                top-0

                h-px

                bg-linear-to-r
                from-transparent
                via-primary/20
                to-transparent
              "
            />

            <Select
              value={marketplace.city}
              onValueChange={marketplace.changeCity}
            >
              <SelectTrigger aria-label="فیلتر شهر">
                <SelectValue placeholder="همه شهرها" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">همه شهرها</SelectItem>

                {cities.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={marketplace.expertise}
              onValueChange={marketplace.changeExpertise}
            >
              <SelectTrigger aria-label="فیلتر تخصص">
                <SelectValue placeholder="همه تخصص‌ها" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">همه تخصص‌ها</SelectItem>

                {marketplace.expertiseOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={marketplace.reset}
              disabled={!marketplace.hasFilters}
              icon={
                marketplace.hasFilters ? (
                  <XIcon aria-hidden="true" />
                ) : (
                  <SlidersHorizontalIcon aria-hidden="true" />
                )
              }
              className="
                w-full
                text-foreground-muted

                hover:bg-surface-muted
                hover:text-foreground

                md:w-auto
              "
            >
              {homeMarketplaceCopy.clearFiltersLabel}
            </Button>
          </div>

          {/* Results */}
          {marketplace.pagination.total > 0 ? (
            <div className="flex flex-col gap-8">
              <ul
                className="
                  grid
                  gap-4

                  md:grid-cols-2
                  md:gap-5

                  xl:grid-cols-3
                "
              >
                {marketplace.pagination.items.map((expert) => (
                  <li key={expert.id} className="min-w-0">
                    <ExpertCard expert={expert} />
                  </li>
                ))}
              </ul>

              <Pagination
                page={marketplace.pagination.page}
                pageCount={marketplace.pagination.pageCount}
                ariaLabel={homeMarketplaceCopy.paginationLabel}
                pathname={marketplace.pathname}
                query={marketplace.query}
                hash="#home-marketplace"
              />
            </div>
          ) : (
            <Empty
              icon={<UsersIcon aria-hidden="true" />}
              title={homeMarketplaceCopy.emptyTitle}
              description={homeMarketplaceCopy.emptyDescription}
              action={
                <Button onClick={marketplace.reset}>
                  {homeMarketplaceCopy.resetLabel}
                </Button>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
