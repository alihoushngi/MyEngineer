/* eslint-disable react-hooks/incompatible-library */
"use client";

import { MapPinIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Label } from "@/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { updateEngineerServiceArea } from "@/services/engineer-service/engineer-service";
import { type EngineerServiceArea } from "@/types/store/engineer.types";
import { type City, type Province } from "@/types/store/registration.types";

const schema = z.object({
  provinceId: z.string().min(1),
  cityId: z.string().min(1),
  nearbyCityIds: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

type EngineerServiceAreaFormProps = {
  area: EngineerServiceArea;
  provinces: readonly Province[];
  cities: readonly City[];
};

export function EngineerServiceAreaForm({
  area,
  provinces,
  cities,
}: EngineerServiceAreaFormProps) {
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(updateEngineerServiceArea);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      provinceId: area.provinceId,
      cityId: area.cityId,
      nearbyCityIds: area.nearbyCities.map((city) => city.id),
    },
  });

  const provinceId = form.watch("provinceId");
  const cityId = form.watch("cityId");
  const nearbyCityIds = form.watch("nearbyCityIds");

  const provinceCities = useMemo(
    () => cities.filter((city) => city.provinceId === provinceId),
    [cities, provinceId],
  );

  const nearbyOptions = useMemo(
    () =>
      cities.filter(
        (city) => city.provinceId === provinceId && city.id !== cityId,
      ),
    [cities, cityId, provinceId],
  );

  async function onSubmit(values: FormValues) {
    setError(null);

    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <form
      className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <MapPinIcon aria-hidden="true" className="size-5" />
        </span>

        <div>
          <h2 className="type-h4 text-foreground">مدیریت محدوده فعالیت</h2>
          <p className="mt-0.5 type-caption text-foreground-muted">
            شهر اصلی و شهرهای مجاور قابل ارائه خدمت را مشخص کنید.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel>استان</FieldLabel>

          <Select
            value={provinceId}
            onValueChange={(value) => {
              form.setValue("provinceId", value, { shouldDirty: true });
              form.setValue("cityId", "", { shouldDirty: true });
              form.setValue("nearbyCityIds", [], { shouldDirty: true });
            }}
          >
            <SelectTrigger aria-label="استان">
              <SelectValue placeholder="انتخاب استان" />
            </SelectTrigger>

            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>شهر اصلی</FieldLabel>

          <Select
            value={cityId || undefined}
            onValueChange={(value) =>
              form.setValue("cityId", value, { shouldDirty: true })
            }
          >
            <SelectTrigger aria-label="شهر اصلی">
              <SelectValue placeholder="انتخاب شهر" />
            </SelectTrigger>

            <SelectContent>
              {provinceCities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="type-label text-foreground">شهرهای مجاور</legend>

        {nearbyOptions.length === 0 ? (
          <p className="mt-2 rounded-xl bg-surface-subtle px-3 py-3 type-body-sm leading-relaxed text-foreground-muted">
            پس از انتخاب شهر اصلی، شهرهای همان استان در صورت وجود نمایش داده
            می‌شوند.
          </p>
        ) : (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {nearbyOptions.map((city) => {
              const checked = nearbyCityIds.includes(city.id);

              return (
                <div
                  key={city.id}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-border-subtle bg-surface-subtle px-3 transition-all duration-200 ease-in-out hover:border-primary/15"
                >
                  <Checkbox
                    id={`nearby-${city.id}`}
                    checked={checked}
                    onCheckedChange={(value) => {
                      const next =
                        value === true
                          ? [...nearbyCityIds, city.id]
                          : nearbyCityIds.filter((id) => id !== city.id);

                      form.setValue("nearbyCityIds", next, {
                        shouldDirty: true,
                      });
                    }}
                  />

                  <Label
                    htmlFor={`nearby-${city.id}`}
                    className="flex min-h-11 flex-1 cursor-pointer items-center"
                  >
                    {city.name}
                  </Label>
                </div>
              );
            })}
          </div>
        )}
      </fieldset>

      <div className="mt-5">
        <EngineerActionError
          message={error}
          onRetry={() => void form.handleSubmit(onSubmit)()}
        />
      </div>

      <Button
        type="submit"
        loading={mutation.isPending}
        disabled={!form.formState.isDirty || mutation.isPending}
        className="mt-5 w-full sm:w-auto"
      >
        {engineerPanelCopy.saveLabel}
      </Button>
    </form>
  );
}
