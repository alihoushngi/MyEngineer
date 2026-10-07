"use client";

import { Label } from "@/components/ui/label/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";

import {
  ALL_FILTER,
  type FilterKey,
  type FilterOption,
  type ServiceFilterValues,
} from "@/lib/service/service-query/service-query";

export type ServiceFilterOptionMap = Record<
  Exclude<FilterKey, "city">,
  readonly FilterOption[]
>;

type ServiceFilterFieldsProps = {
  options: ServiceFilterOptionMap;
  values: ServiceFilterValues;
  overlayKeys: readonly FilterKey[];
  onChange: (key: Exclude<FilterKey, "city">, value: string) => void;
};

const labels: Record<Exclude<FilterKey, "city">, string> = {
  skill: serviceFilterCopy.skillLabel,
  experience: serviceFilterCopy.experienceLabel,
  license: serviceFilterCopy.licenseLabel,
  discipline: serviceFilterCopy.disciplineLabel,
  degree: serviceFilterCopy.degreeLabel,
  sort: serviceFilterCopy.sortLabel,
};

export function ServiceFilterFields({
  options,
  values,
  overlayKeys,
  onChange,
}: ServiceFilterFieldsProps) {
  return (
    <div className="grid gap-7">
      {overlayKeys
        .filter((key): key is Exclude<FilterKey, "city"> => key !== "city")
        .map((key) => {
          const allLabel =
            key === "sort"
              ? serviceFilterCopy.defaultSortLabel
              : serviceFilterCopy.allOptionLabel;
          const items = [{ id: ALL_FILTER, label: allLabel }, ...options[key]];

          return (
            <fieldset key={key} className="min-w-0">
              <legend className="mb-3 type-label font-semibold text-foreground">
                {labels[key]}
              </legend>

              <RadioGroup
                value={values[key]}
                onValueChange={(value) => {
                  onChange(key, value);
                }}
                className="grid gap-2"
              >
                {items.map((option) => {
                  const optionId = `service-filter-${key}-${option.id}`;

                  return (
                    <div
                      key={option.id}
                      className="flex min-h-12 items-center gap-3 rounded-xl border border-border-subtle bg-surface px-3.5 transition-all duration-200 ease-in-out hover:border-primary/20 hover:bg-surface-muted has-data-[state=checked]:border-primary/25 has-data-[state=checked]:bg-primary-subtle/60"
                    >
                      <RadioGroupItem value={option.id} id={optionId} />

                      <Label
                        htmlFor={optionId}
                        className="min-w-0 flex-1 cursor-pointer type-body-sm font-medium text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </fieldset>
          );
        })}
    </div>
  );
}
