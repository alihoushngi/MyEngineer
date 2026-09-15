"use client";

import { RefreshCwIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { useProvinceCities } from "@/hooks/use-province-cities/use-province-cities";
import {
  type PreferredCity,
  readPreferredCityFromDocumentCookie,
  writePreferredCity,
} from "@/lib/city/preferred-city/preferred-city";

type CitySelectorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title?: string;
  description?: string;
  onSelected?: (city: PreferredCity) => void;
};

export function CitySelectorDialog({
  open,
  onOpenChange,
  id,
  title = "انتخاب شهر",
  description = "استان و شهر خود را انتخاب کنید تا نتایج مرتبط‌تر نمایش داده شود.",
  onSelected,
}: CitySelectorDialogProps) {
  const {
    provinces,
    cities,
    isLoadingProvinces,
    isLoadingCities,
    provinceError,
    cityError,
    retryProvinces,
    retryCities,
    selectedProvinceId,
    setSelectedProvince,
  } = useProvinceCities();

  const [cityId, setCityId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const preferred = readPreferredCityFromDocumentCookie();
    if (!preferred) {
      return;
    }

    setSelectedProvince(preferred.provinceId);
    setCityId(preferred.id);
  }, [open, setSelectedProvince]);

  useEffect(() => {
    if (!cityId) {
      return;
    }

    if (!cities.some((city) => city.id === cityId)) {
      setCityId("");
    }
  }, [cities, cityId]);

  const selectedProvinceName = useMemo(
    () => provinces.find((province) => province.id === selectedProvinceId)?.name ?? "",
    [provinces, selectedProvinceId],
  );

  function handleConfirm() {
    setFormError(null);

    const city = cities.find((item) => item.id === cityId);
    if (!selectedProvinceId || !city) {
      setFormError("استان و شهر را انتخاب کنید.");
      return;
    }

    const preferred: PreferredCity = {
      id: city.id,
      name: city.name,
      provinceId: selectedProvinceId,
      provinceName: selectedProvinceName,
    };

    writePreferredCity(preferred);
    onSelected?.(preferred);
    onOpenChange(false);
  }

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
            انصراف
          </Button>
          <Button
            type="button"
            className="min-h-11"
            disabled={isLoadingProvinces || isLoadingCities}
            onClick={handleConfirm}
          >
            تأیید شهر
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-1">
        <Field invalid={Boolean(provinceError)}>
          <FieldLabel htmlFor={`${id}-province`} required>
            استان
          </FieldLabel>
          {provinceError ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2">
              <p className="type-caption text-destructive">{provinceError}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-h-10 gap-1"
                onClick={retryProvinces}
              >
                <RefreshCwIcon aria-hidden="true" className="size-4" />
                تلاش مجدد
              </Button>
            </div>
          ) : (
            <Select
              value={selectedProvinceId || undefined}
              onValueChange={(value) => {
                setSelectedProvince(value);
                setCityId("");
                setFormError(null);
              }}
              disabled={isLoadingProvinces}
            >
              <SelectTrigger id={`${id}-province`} className="min-h-11 w-full">
                <SelectValue
                  placeholder={
                    isLoadingProvinces ? "در حال بارگذاری…" : "استان را انتخاب کنید"
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

        <Field invalid={Boolean(cityError)}>
          <FieldLabel htmlFor={`${id}-city`} required>
            شهر
          </FieldLabel>
          {cityError ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2">
              <p className="type-caption text-destructive">{cityError}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-h-10 gap-1"
                onClick={retryCities}
              >
                <RefreshCwIcon aria-hidden="true" className="size-4" />
                تلاش مجدد
              </Button>
            </div>
          ) : (
            <Select
              value={cityId || undefined}
              onValueChange={(value) => {
                setCityId(value);
                setFormError(null);
              }}
              disabled={
                !selectedProvinceId || isLoadingCities || cities.length === 0
              }
            >
              <SelectTrigger id={`${id}-city`} className="min-h-11 w-full">
                <SelectValue
                  placeholder={
                    !selectedProvinceId
                      ? "ابتدا استان را انتخاب کنید"
                      : isLoadingCities
                        ? "در حال بارگذاری…"
                        : cities.length === 0
                          ? "شهری یافت نشد"
                          : "شهر را انتخاب کنید"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        {formError ? <FieldError>{formError}</FieldError> : null}
      </div>
    </ResponsiveDialog>
  );
}
