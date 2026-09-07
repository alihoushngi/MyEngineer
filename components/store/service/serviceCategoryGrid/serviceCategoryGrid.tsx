import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";

import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

const visualMap: Record<ServiceSlug, { image: string; accent: string }> = {
  "land-surveying": {
    image: "/images/services/surveying.png",
    accent: "bg-category-teal",
  },
  "construction-workers": {
    image: "/images/services/contractor.png",
    accent: "bg-category-orange",
  },
  drawing: {
    image: "/images/services/engineeringservice.png",
    accent: "bg-category-blue",
  },
  "interior-design": {
    image: "/images/services/designer.png",
    accent: "bg-category-violet",
  },
  "building-permit": {
    image: "/images/services/licence.png",
    accent: "bg-category-green",
  },
  "administrative-services": {
    image: "/images/services/adminastrative.png",
    accent: "bg-category-rose",
  },
};

export function ServiceCategoryGrid({
  onServiceSelect,
  hideDescription = false,
}: ServiceCategoryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {serviceCategories.map((service, index) => {
        const visual = visualMap[service.slug];

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
                  className={cn("absolute inset-x-0 top-0 h-1", visual.accent)}
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
                      src={visual.image}
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
                      <span className="mt-1.5 hidden type-caption leading-relaxed text-foreground-muted sm:block">
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
