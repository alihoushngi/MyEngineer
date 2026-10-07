"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  degreeFilterOptions,
  licenseFilterOptions,
  sortFilterOptions,
} from "@/config/service-filters.config/service-filters.config";
import { type PreferredCity } from "@/lib/city/preferred-city/preferred-city";
import {
  ALL_FILTER,
  createEmptyFilters,
  experienceBands,
  getActiveFilterChips,
  getOverlayFilterKeys,
  hasActiveServiceFilters,
  serializeServiceFilterParams,
  type ActiveFilterChip,
  type FilterKey,
  type FilterOption,
  type ServiceFilterValues,
} from "@/lib/service/service-query/service-query";
import { type ServiceFilterOptionMap } from "@/components/store/service/serviceFilterFields/serviceFilterFields";
import { type City } from "@/types/store/registration.types";

type UseServiceFiltersArgs = {
  filters: ServiceFilterValues;
  cities: readonly City[];
  skills: readonly FilterOption[];
  disciplines: readonly FilterOption[];
  /** The server fell back to the saved city preference (no `cities` param). */
  hasPreferredFallback: boolean;
};

export function useServiceFilters({
  filters,
  cities,
  skills,
  disciplines,
  hasPreferredFallback,
}: UseServiceFiltersArgs) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [draft, setDraft] = useState<ServiceFilterValues>(filters);

  const options: ServiceFilterOptionMap = {
    skill: skills,
    experience: experienceBands,
    license: licenseFilterOptions,
    discipline: disciplines,
    degree: degreeFilterOptions,
    sort: sortFilterOptions,
  };
  const overlayKeys = getOverlayFilterKeys({
    hasSkills: skills.length > 0,
    hasDisciplines: disciplines.length > 0,
  });
  const activeChips = getActiveFilterChips(filters, {
    cities,
    skills,
    disciplines,
    licenses: licenseFilterOptions,
    degrees: degreeFilterOptions,
  });

  function replaceQuery(next: ServiceFilterValues, page: number) {
    const params = serializeServiceFilterParams(next, page, {
      explicitCities: hasPreferredFallback,
    });
    const serialized = params.toString();

    startTransition(() => {
      router.replace(
        serialized === "" ? pathname : `${pathname}?${serialized}`,
        { scroll: false },
      );
    });
  }

  const selectedCities: PreferredCity[] = filters.cities.map((id) => {
    const city = cities.find((item) => item.id === id);
    return {
      id,
      name: city?.name ?? "شهر",
      provinceId: city?.provinceId ?? "",
      provinceName: "",
    };
  });

  return {
    options,
    overlayKeys,
    activeChips,
    isPending,
    overlayOpen,
    cityDialogOpen,
    draft,
    selectedCities,
    hasFilters: hasActiveServiceFilters(filters),
    pathname,
    query: serializeServiceFilterParams(filters, 1, {
      explicitCities: hasPreferredFallback,
    }).toString(),
    setOverlayOpen,
    setCityDialogOpen,
    refresh: () => {
      startTransition(() => {
        router.refresh();
      });
    },
    openOverlay: () => {
      setDraft(filters);
      setOverlayOpen(true);
    },
    setDraftValue: (key: Exclude<FilterKey, "city">, value: string) => {
      setDraft((current) => ({ ...current, [key]: value }));
    },
    applyDraft: () => {
      replaceQuery({ ...draft, cities: filters.cities }, 1);
      setOverlayOpen(false);
    },
    changeCities: (next: readonly PreferredCity[]) => {
      replaceQuery({ ...filters, cities: next.map((city) => city.id) }, 1);
    },
    clearChip: (chip: ActiveFilterChip) => {
      if (chip.key === "city") {
        replaceQuery(
          {
            ...filters,
            cities: filters.cities.filter((id) => id !== chip.value),
          },
          1,
        );
        return;
      }
      replaceQuery({ ...filters, [chip.key]: ALL_FILTER }, 1);
    },
    reset: () => {
      replaceQuery({ ...createEmptyFilters(), sort: filters.sort }, 1);
      setOverlayOpen(false);
    },
  };
}
