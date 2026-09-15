"use client";

import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";

import { type ServiceCategory } from "@/config/services.config/services.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";

type ServiceCategoryGridProps = {
  categories?: readonly ServiceCategory[];
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

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

export function ServiceCategoryGrid({
  categories: categoriesProp,
  onServiceSelect,
  hideDescription = false,
}: ServiceCategoryGridProps) {
  const categoriesQuery = useQuery({
    queryKey: ["lookup", "service-categories"],
    queryFn: listServiceCategories,
    enabled: categoriesProp === undefined,
  });

  const categories = categoriesProp ?? categoriesQuery.data ?? [];

  if (categoriesProp === undefined && categoriesQuery.isPending) {
    return (
      <p className="type-body text-foreground-muted">در حال بارگذاری خدمات…</p>
    );
  }

  if (categories.length === 0) {
    return (
      <p className="type-body text-foreground-muted">
        در حال حاضر گروهی از خدمات برای نمایش موجود نیست.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {categories.map((service, index) => {
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
  );
}
