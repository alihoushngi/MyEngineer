"use client";

import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";

import {
  type ActiveFilterChip,
  type FilterKey,
} from "@/lib/service/filter-experts/filter-experts";

type ServiceActiveFiltersProps = {
  chips: readonly ActiveFilterChip[];
  onClear: (key: FilterKey) => void;
  onReset: () => void;
};

export function ServiceActiveFilters({
  chips,
  onClear,
  onReset,
}: ServiceActiveFiltersProps) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
      <ul className="flex min-w-0 flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <button
              type="button"
              className="group inline-flex min-h-9 max-w-full items-center gap-2 rounded-xl border border-primary/15 bg-primary-subtle px-3 type-caption font-medium text-primary outline-none transition-all duration-200 ease-in-out hover:border-primary/25 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`حذف فیلتر ${chip.label}`}
              onClick={() => {
                onClear(chip.key);
              }}
            >
              <span className="min-w-0 truncate">{chip.label}</span>
              <XIcon
                aria-hidden="true"
                className="size-3.5 shrink-0 transition-all duration-200 ease-in-out group-hover:rotate-90 motion-reduce:transform-none"
              />
            </button>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="shrink-0"
        onClick={onReset}
      >
        {serviceFilterCopy.resetLabel}
      </Button>
    </div>
  );
}
