"use client";

import { Label } from "@/components/ui/label/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";

import {
  degreeFilterOptions,
  disciplineFilterOptions,
  licenseFilterOptions,
  serviceFilterCopy,
  type ServiceFilterDefinition,
} from "@/config/service-filters.config/service-filters.config";

import {
  ALL_FILTER,
  type FilterKey,
  type FilterOption,
  type ServiceFilterValues,
} from "@/lib/service/filter-experts/filter-experts";

type ServiceFilterFieldsProps = {
  definition: ServiceFilterDefinition;
  values: ServiceFilterValues;
  overlayKeys: readonly FilterKey[];
  onChange: (key: FilterKey, value: string) => void;
};

function allOption(): FilterOption {
  return {
    id: ALL_FILTER,
    label: serviceFilterCopy.allOptionLabel,
  };
}

function optionsForKey(
  key: FilterKey,
  definition: ServiceFilterDefinition,
): readonly FilterOption[] {
  if (key === "skill") {
    return definition.skills;
  }

  if (key === "experience") {
    return definition.experienceBands;
  }

  if (key === "license") {
    return licenseFilterOptions;
  }

  if (key === "discipline") {
    return disciplineFilterOptions;
  }

  if (key === "degree") {
    return degreeFilterOptions;
  }

  return [];
}

function labelForKey(key: FilterKey): string {
  const labels: Record<Exclude<FilterKey, "city">, string> = {
    skill: serviceFilterCopy.skillLabel,
    experience: serviceFilterCopy.experienceLabel,
    license: serviceFilterCopy.licenseLabel,
    discipline: serviceFilterCopy.disciplineLabel,
    degree: serviceFilterCopy.degreeLabel,
  };

  return key === "city" ? serviceFilterCopy.cityFilterLabel : labels[key];
}

export function ServiceFilterFields({
  definition,
  values,
  overlayKeys,
  onChange,
}: ServiceFilterFieldsProps) {
  return (
    <div className="grid gap-7">
      {overlayKeys.map((key) => {
        const options = [allOption(), ...optionsForKey(key, definition)];

        return (
          <fieldset key={key} className="min-w-0">
            <legend className="mb-3 type-label font-semibold text-foreground">
              {labelForKey(key)}
            </legend>

            <RadioGroup
              value={values[key]}
              onValueChange={(value) => {
                onChange(key, value);
              }}
              className="grid gap-2"
            >
              {options.map((option) => {
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
