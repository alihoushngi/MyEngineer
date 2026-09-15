"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";

import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";

type ServiceRelatedSectionProps = {
  service: ServiceCategory;
};

export function ServiceRelatedSection({ service }: ServiceRelatedSectionProps) {
  const categoriesQuery = useQuery({
    queryKey: ["lookup", "service-categories"],
    queryFn: listServiceCategories,
  });

  const related = (categoriesQuery.data ?? []).filter(
    (item) => item.slug !== service.slug,
  );

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="container-app py-section">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-7 w-1 rounded-full bg-primary" />
        <h2 className="type-h2 text-foreground">
          {serviceDiscoveryCopy.relatedTitle}
        </h2>
      </div>

      <ul className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug} className="min-w-0">
            <Link
              href={item.href}
              className="group flex h-full min-h-24 items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs outline-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-5">
                <ServiceIcon slug={item.slug} />
              </span>

              <span className="min-w-0 flex-1 type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                {item.label}
              </span>

              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-foreground-muted transition-transform duration-200 ease-in-out group-hover:-translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
