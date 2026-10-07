"use client";

import { RefreshCwIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import {
  citySelectorCopy,
  popularCityNames,
} from "@/config/city-selector.config/city-selector.config";

import { useProvinceCities } from "@/hooks/use-province-cities/use-province-cities";
import {
  MAX_PREFERRED_CITIES,
  type PreferredCity,
  clearPreferredCity,
  readPreferredCitiesFromDocumentCookie,
  writePreferredCities,
} from "@/lib/city/preferred-city/preferred-city";
import {
  matchesCityQuery,
  resolvePopularCities,
} from "@/lib/city/popular-cities/popular-cities";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { getAllCities } from "@/services/city-service/city-service";
import { type City } from "@/types/store/registration.types";

type CitySelectorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title?: string;
  description?: string;
  /**
   * Selection to start from when the dialog opens. Defaults to the saved
   * preferred-city cookie.
   */
  initialCities?: readonly PreferredCity[];
  /** Persist the selection into the preferred-city cookie (default true). */
  persist?: boolean;
  onSelected?: (cities: readonly PreferredCity[]) => void;
};

const chipClass =
  "group inline-flex min-h-9 max-w-full items-center gap-2 rounded-xl border px-3 type-caption font-medium outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring";

export function CitySelectorDialog({
  open,
  onOpenChange,
  id,
  title = citySelectorCopy.title,
  description = citySelectorCopy.description,
  initialCities,
  persist = true,
  onSelected,
}: CitySelectorDialogProps) {
  const {
    provinces,
    cities: provinceCities,
    isLoadingProvinces,
    isLoadingCities,
    provinceError,
    cityError,
    retryProvinces,
    retryCities,
    selectedProvinceId,
    setSelectedProvince,
  } = useProvinceCities();

  const allCitiesQuery = useQuery({
    queryKey: ["cities", "all"],
    queryFn: getAllCities,
    enabled: open,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
  const allCities = useMemo<readonly City[]>(
    () => allCitiesQuery.data ?? [],
    [allCitiesQuery.data],
  );

  const [selected, setSelected] = useState<readonly PreferredCity[]>([]);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const start = initialCities ?? readPreferredCitiesFromDocumentCookie();
    // Re-seed the draft selection each time the dialog opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(start);
    setSearch("");
    setNotice(null);

    const first = start[0];
    if (first) {
      setSelectedProvince(first.provinceId);
    }
    // Only re-seed when the dialog (re)opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const provinceNameById = useMemo(
    () => new Map(provinces.map((province) => [province.id, province.name])),
    [provinces],
  );

  const popular = useMemo(
    () => resolvePopularCities(allCities, popularCityNames),
    [allCities],
  );

  const searching = search.trim() !== "";
  const visibleCities = useMemo(() => {
    const source: readonly City[] = searching
      ? allCities.length > 0
        ? allCities
        : provinceCities
      : provinceCities;

    return source.filter((city) => matchesCityQuery(city.name, search));
  }, [allCities, provinceCities, search, searching]);

  const selectedIds = useMemo(
    () => new Set(selected.map((city) => city.id)),
    [selected],
  );
  const limitReached = selected.length >= MAX_PREFERRED_CITIES;

  function toPreferred(city: City): PreferredCity {
    return {
      id: city.id,
      name: city.name,
      provinceId: city.provinceId,
      provinceName: provinceNameById.get(city.provinceId) ?? "",
    };
  }

  function toggleCity(city: City) {
    setNotice(null);

    if (selectedIds.has(city.id)) {
      setSelected((current) => current.filter((item) => item.id !== city.id));
      return;
    }

    if (limitReached) {
      setNotice(
        citySelectorCopy.limitReached(formatFaNumber(MAX_PREFERRED_CITIES)),
      );
      return;
    }

    setSelected((current) => [...current, toPreferred(city)]);
  }

  function removeCity(cityId: string) {
    setNotice(null);
    setSelected((current) => current.filter((item) => item.id !== cityId));
  }

  function handleConfirm() {
    if (persist) {
      if (selected.length === 0) {
        clearPreferredCity();
      } else {
        writePreferredCities(
          selected.map((city) => ({
            ...city,
            provinceName:
              city.provinceName || (provinceNameById.get(city.provinceId) ?? ""),
          })),
        );
      }
    }

    onSelected?.(selected);
    onOpenChange(false);
  }

  const confirmLabel = citySelectorCopy.selectionLabel(
    formatFaNumber(selected.length),
  );

  return (
    <ResponsiveDialog
      id={id}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      contentClassName="sm:max-w-md"
      footer={
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => onOpenChange(false)}
          >
            {citySelectorCopy.cancelLabel}
          </Button>
          <Button type="button" className="min-h-11" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-1">
        <div className="relative">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            aria-label={citySelectorCopy.searchLabel}
            placeholder={citySelectorCopy.searchPlaceholder}
            className="ps-10"
          />
        </div>

        {selected.length > 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="type-caption font-semibold text-foreground">
                {citySelectorCopy.selectedTitle}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelected([]);
                  setNotice(null);
                }}
              >
                {citySelectorCopy.clearAllLabel}
              </Button>
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {selected.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    className={cn(
                      chipClass,
                      "border-primary/15 bg-primary-subtle text-primary hover:border-primary/25 hover:bg-primary hover:text-primary-foreground",
                    )}
                    aria-label={citySelectorCopy.removeCity(city.name)}
                    onClick={() => {
                      removeCity(city.id);
                    }}
                  >
                    <span className="min-w-0 truncate">{city.name}</span>
                    <XIcon aria-hidden="true" className="size-3.5 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {popular.length > 0 ? (
          <div>
            <p className="mb-2 type-caption font-semibold text-foreground">
              {citySelectorCopy.popularTitle}
            </p>
            <ul className="flex flex-wrap gap-2">
              {popular.map((city) => {
                const active = selectedIds.has(city.id);

                return (
                  <li key={city.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      className={cn(
                        chipClass,
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border-subtle bg-surface text-foreground-muted hover:border-primary/30 hover:bg-primary-subtle hover:text-primary",
                      )}
                      onClick={() => {
                        toggleCity(city);
                      }}
                    >
                      {city.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <Field invalid={Boolean(provinceError)}>
          <FieldLabel htmlFor={`${id}-province`}>
            {citySelectorCopy.provinceLabel}
          </FieldLabel>
          {provinceError ? (
            <RetryRow message={provinceError} onRetry={retryProvinces} />
          ) : (
            <Select
              value={selectedProvinceId || undefined}
              onValueChange={(value) => {
                setSelectedProvince(value);
                setNotice(null);
              }}
              disabled={isLoadingProvinces}
            >
              <SelectTrigger id={`${id}-province`} className="min-h-11 w-full">
                <SelectValue
                  placeholder={
                    isLoadingProvinces
                      ? citySelectorCopy.loading
                      : citySelectorCopy.provincePlaceholder
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        <div>
          <p className="mb-2 type-label font-semibold text-foreground">
            {citySelectorCopy.citiesLabel}
          </p>

          {cityError && !searching ? (
            <RetryRow message={cityError} onRetry={retryCities} />
          ) : isLoadingCities && !searching ? (
            <p className="type-caption text-foreground-muted">
              {citySelectorCopy.loading}
            </p>
          ) : !searching && !selectedProvinceId ? (
            <p className="type-caption text-foreground-muted">
              {citySelectorCopy.emptyHint}
            </p>
          ) : visibleCities.length === 0 ? (
            <p className="type-caption text-foreground-muted">
              {citySelectorCopy.noResults}
            </p>
          ) : (
            <ul className="grid max-h-64 gap-2 overflow-y-auto pe-1">
              {visibleCities.map((city) => {
                const checkboxId = `${id}-city-${city.id}`;
                const provinceName = searching
                  ? provinceNameById.get(city.provinceId)
                  : undefined;

                return (
                  <li
                    key={city.id}
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-border-subtle bg-surface px-3.5 transition-all duration-200 ease-in-out hover:border-primary/20 hover:bg-surface-muted has-data-[state=checked]:border-primary/25 has-data-[state=checked]:bg-primary-subtle/60"
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={selectedIds.has(city.id)}
                      onCheckedChange={() => {
                        toggleCity(city);
                      }}
                    />
                    <Label
                      htmlFor={checkboxId}
                      className="min-w-0 flex-1 cursor-pointer justify-between type-body-sm font-medium text-foreground"
                    >
                      <span className="truncate">{city.name}</span>
                      {provinceName ? (
                        <span className="type-caption font-normal text-foreground-muted">
                          {provinceName}
                        </span>
                      ) : null}
                    </Label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {notice ? <FieldError>{notice}</FieldError> : null}
      </div>
    </ResponsiveDialog>
  );
}

function RetryRow({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2">
      <p className="type-caption text-destructive">{message}</p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="min-h-10 gap-1"
        onClick={onRetry}
      >
        <RefreshCwIcon aria-hidden="true" className="size-4" />
        {citySelectorCopy.retryLabel}
      </Button>
    </div>
  );
}
