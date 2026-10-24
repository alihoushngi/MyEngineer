"use client";

import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import { type ServiceCategory } from "@/config/services.config/services.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  getHomeServiceCategoryHref,
  getHomeServiceCategoryImageSource,
  getHomeServiceCategoryLabel,
} from "@/lib/home/service-category-directory/service-category-directory";
import { cn } from "@/lib/utils/cn/cn";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";

type ServiceCategoryGridProps = {
  categories?: readonly ServiceCategory[];
  onServiceSelect?: () => void;
  hideDescription?: boolean;
  appearance?: "cards" | "directory";
};

type CategoryDataMode = "live" | "worst" | "empty" | "one" | "many";

const isDevelopment = process.env.NODE_ENV === "development";
const categoryDataModes: readonly { value: CategoryDataMode; label: string }[] = [
  { value: "live", label: "Live" },
  { value: "worst", label: "Worst" },
  { value: "empty", label: "Empty" },
  { value: "one", label: "One" },
  { value: "many", label: "1,000" },
];

const accentClasses = [
  "bg-category-teal",
  "bg-category-orange",
  "bg-category-blue",
  "bg-category-violet",
  "bg-category-green",
  "bg-category-rose",
] as const;

const fallbackImages = [
  "/images/services/surveying.png",
  "/images/services/contractor.png",
  "/images/services/engineeringservice.png",
  "/images/services/designer.png",
  "/images/services/licence.png",
  "/images/services/adminastrative.png",
] as const;

function subscribeToLocationSearch(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("service-category-test-mode", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("service-category-test-mode", onChange);
  };
}

const getLocationSearch = () => window.location.search;
const getServerLocationSearch = () => "";

export function ServiceCategoryGrid({
  categories: categoriesProp,
  onServiceSelect,
  hideDescription = false,
  appearance = "cards",
}: ServiceCategoryGridProps) {
  const isDirectory = appearance === "directory";
  const categoriesQuery = useQuery({
    queryKey: ["lookup", "service-categories"],
    queryFn: listServiceCategories,
    enabled: categoriesProp === undefined,
  });
  const categories = categoriesProp ?? categoriesQuery.data ?? [];
  const locationSearch = useSyncExternalStore(
    subscribeToLocationSearch,
    getLocationSearch,
    getServerLocationSearch,
  );
  const params = new URLSearchParams(locationSearch);
  const showDebugControl =
    isDevelopment && params.get("category-test") === "1";
  const requestedMode = params.get("category-data");
  const debugMode = categoryDataModes.some(
    (item) => item.value === requestedMode,
  )
    ? (requestedMode as CategoryDataMode)
    : "live";

  const displayedCategories =
    isDevelopment && isDirectory && showDebugControl
      ? getDebugCategories(categories, debugMode)
      : categories;

  function chooseDebugMode(mode: CategoryDataMode) {
    const url = new URL(window.location.href);
    url.searchParams.set("category-test", "1");
    if (mode === "live") url.searchParams.delete("category-data");
    else url.searchParams.set("category-data", mode);
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
    window.dispatchEvent(new Event("service-category-test-mode"));
  }

  const debugControl =
    isDevelopment && isDirectory && showDebugControl ? (
      <div
        role="group"
        aria-label="Service category test data"
        data-testid="service-category-debug-control"
        className="fixed inset-x-2 bottom-3 z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] gap-1 overflow-x-auto rounded-full border border-zinc-300 bg-zinc-100 p-1 text-xs text-zinc-700 shadow-md"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {categoryDataModes.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={debugMode === value}
            onClick={() => chooseDebugMode(value)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5",
              debugMode === value ? "bg-white shadow-sm" : "",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    ) : null;

  if (categoriesProp === undefined && categoriesQuery.isPending) {
    return (
      <>
        <p className="type-body text-foreground-muted">در حال بارگذاری خدمات…</p>
        {debugControl}
      </>
    );
  }

  if (displayedCategories.length === 0) {
    return (
      <>
        <p className="type-body text-foreground-muted">
          در حال حاضر گروهی از خدمات برای نمایش موجود نیست.
        </p>
        {debugControl}
      </>
    );
  }

  return (
    <>
      <ul
        data-category-layout={isDirectory ? "directory" : "cards"}
        className={
          isDirectory
            ? "mt-client-md mb-0 grid grid-cols-3"
            : "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        }
      >
        {displayedCategories.map((service, index) => {
          if (isDirectory) {
            return (
              <ServiceCategoryDirectoryItem
                key={service.slug}
                service={service}
                onServiceSelect={onServiceSelect}
              />
            );
          }

          const accent = accentClasses[index % accentClasses.length];
          const image =
            service.imageSrc ??
            fallbackImages[index % fallbackImages.length] ??
            "/images/services/surveying.png";

          return (
            <li key={service.slug} className="min-w-0">
              <Link
                href={service.href}
                onClick={onServiceSelect}
                className="group block h-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <GlassInfoCard className="relative flex h-full min-h-44 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-md sm:min-h-60 sm:p-5 motion-reduce:transform-none">
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-x-0 top-0 h-1", accent)}
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-e-3 top-3 type-caption font-semibold tabular-nums text-foreground-subtle"
                  >
                    {formatFaNumber(index + 1).padStart(2, "۰")}
                  </span>

                  <span className="relative mx-auto mt-5 flex size-20 items-center justify-center rounded-3xl bg-surface-subtle sm:size-28">
                    <span
                      aria-hidden="true"
                      className="absolute inset-4 rounded-full bg-primary/10 blur-2xl transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:bg-primary/15 motion-reduce:transform-none"
                    />

                    <span className="relative size-[90%] transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transform-none">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </span>
                  </span>

                  <span className="mt-auto flex items-end gap-3 pt-5">
                    <span className="min-w-0 flex-1">
                      <span className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                        {service.label}
                      </span>

                      {!hideDescription ? (
                        <span className="mt-1.5 hidden type-caption leading-relaxed text-foreground-muted sm:line-clamp-2 sm:block">
                          {service.description}
                        </span>
                      ) : null}
                    </span>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none">
                      <ArrowLeftIcon
                        aria-hidden="true"
                        className="size-4 ltr:rotate-180"
                      />
                    </span>
                  </span>
                </GlassInfoCard>
              </Link>
            </li>
          );
        })}
      </ul>
      {debugControl}
    </>
  );
}

function ServiceCategoryDirectoryItem({
  service,
  onServiceSelect,
}: {
  service: ServiceCategory;
  onServiceSelect?: () => void;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  const imageSource = getHomeServiceCategoryImageSource(service, failedSource);
  const href = getHomeServiceCategoryHref(service);
  const label = getHomeServiceCategoryLabel(service);
  const content = (
    <>
      <span
        aria-hidden="true"
        className="mx-auto mb-client-xs flex size-[75px] items-center justify-center min-[576px]:size-[87px] md:size-[100px]"
      >
        {imageSource ? (
          <Image
            src={imageSource}
            alt=""
            width={100}
            height={100}
            sizes="(min-width: 768px) 100px, (min-width: 576px) 87px, 75px"
            className="block h-auto max-h-full w-full max-w-full object-contain"
            onError={() => setFailedSource(imageSource)}
          />
        ) : null}
      </span>
      <span className="mb-2 block wrap-anywhere text-center text-client-12 leading-[1.2] text-client-text-muted">
        {label}
      </span>
    </>
  );

  return (
    <li className="mb-2 min-w-0 min-[576px]:mb-6 md:mb-8">
      {href ? (
        <Link
          href={href}
          onClick={onServiceSelect}
          className="block min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {content}
        </Link>
      ) : (
        <span aria-disabled="true" className="block min-w-0">
          {content}
        </span>
      )}
    </li>
  );
}

function getDebugCategories(
  categories: readonly ServiceCategory[],
  mode: CategoryDataMode,
): readonly ServiceCategory[] {
  if (mode === "live") return categories;
  if (mode === "empty") return [];
  if (mode === "one") return categories.slice(0, 1);

  const first = categories[0];
  if (!first) return [];

  if (mode === "many") {
    return Array.from({ length: 1000 }, (_, index) => {
      const slug = `debug-service-${index + 1}`;
      return {
        ...first,
        id: 1_000_000 + index,
        slug,
        href: `/services/${slug}` as const,
        label: `${first.label} ${index + 1}`,
        description: "",
        imageSrc: undefined,
      };
    });
  }

  return [
    ...categories.map((category, index) => {
      if (index === 0) {
        return {
          ...category,
          label:
            "پیگیری صدور مجوزهای ساختمانی و گواهی پایان‌کار پروژه‌های چندمرحله‌ای",
          imageSrc: "/missing-service-category-image.png",
        };
      }
      if (index === 1) return { ...category, label: "آ" };
      if (index === 2) return { ...category, label: "   " };
      return category;
    }),
    {
      ...first,
      id: 1_999_999,
      slug: "debug-additional-service",
      href: "/services/debug-additional-service",
      label:
        "خدمات اداری و پیگیری مجوزهای ساختمانی برای پروژه‌های چندمرحله‌ای",
      description: "",
      imageSrc: undefined,
    },
  ];
}
