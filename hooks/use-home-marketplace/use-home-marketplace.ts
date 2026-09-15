"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ServiceCategory,
  type ServiceSlug,
} from "@/config/services.config/services.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { type ExpertCardData } from "@/types/store/expert.types";

export function useHomeMarketplace(
  experts: readonly ExpertCardData[],
  serviceCategories: readonly ServiceCategory[] = [],
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const serviceSlugSet = useMemo(
    () => new Set(serviceCategories.map((service) => service.slug)),
    [serviceCategories],
  );
  const services = parseServiceSlugs(
    searchParams.get("services"),
    serviceSlugSet,
  );
  const city = searchParams.get("cities") || "all";
  const expertise = searchParams.get("expertise") || "all";
  const page = parsePageParam(searchParams.get("page"));

  const expertiseOptions = useMemo(
    () => [...new Set(experts.flatMap((expert) => expert.specialties ?? []))],
    [experts],
  );

  const filteredExperts = useMemo(
    () =>
      experts.filter((expert) => {
        const serviceMatch =
          services.length === 0 ||
          !expert.serviceSlugs?.length ||
          services.some((slug) => expert.serviceSlugs?.includes(slug));
        const cityMatch = city === "all" || expert.city === city;
        const expertiseMatch =
          expertise === "all" || expert.specialties?.includes(expertise);
        return serviceMatch && cityMatch && expertiseMatch;
      }),
    [city, expertise, experts, services],
  );

  const pagination = paginateItems(filteredExperts, page);
  const hasFilters =
    services.length > 0 || city !== "all" || expertise !== "all";

  function replaceState(next: {
    services: readonly ServiceSlug[];
    city: string;
    expertise: string;
    page: number;
  }) {
    const params = new URLSearchParams();

    if (next.services.length > 0) {
      params.set("services", next.services.join(","));
    }

    if (next.city !== "all") {
      params.set("cities", next.city);
    }

    if (next.expertise !== "all") {
      params.set("expertise", next.expertise);
    }

    if (next.page > 1) {
      params.set("page", String(next.page));
    }

    const serialized = params.toString();
    router.replace(serialized === "" ? pathname : `${pathname}?${serialized}`, {
      scroll: false,
    });
  }

  function toggleService(slug: ServiceSlug) {
    const nextServices = services.includes(slug)
      ? services.filter((item) => item !== slug)
      : [...services, slug];
    replaceState({ services: nextServices, city, expertise, page: 1 });
  }

  function changeCity(value: string) {
    replaceState({ services, city: value, expertise, page: 1 });
  }

  function changeExpertise(value: string) {
    replaceState({ services, city, expertise: value, page: 1 });
  }

  function reset() {
    replaceState({ services: [], city: "all", expertise: "all", page: 1 });
  }

  return {
    services,
    city,
    expertise,
    expertiseOptions,
    filteredExperts,
    pagination,
    hasFilters,
    pathname,
    query,
    toggleService,
    changeCity,
    changeExpertise,
    reset,
  };
}

function parseServiceSlugs(
  value: string | null,
  allowed: ReadonlySet<string>,
): ServiceSlug[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => allowed.size === 0 || allowed.has(item));
}
