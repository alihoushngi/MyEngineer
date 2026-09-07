"use client";

import { useId, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckIcon,
  ChevronDownIcon,
  CircleAlertIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import { type ExpertiseStepData } from "@/components/store/registration/expertiseStep/type/expertiseStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { type MockExpertiseCatalogItem } from "@/lib/mock-data/registration-expertise-catalog/registration-expertise-catalog";
import { cn } from "@/lib/utils/cn/cn";
import { getExpertiseCatalog } from "@/services/registration-service/registration-service";
import { type UseFormSetValue } from "react-hook-form";

type ExpertiseCatalogPickerProps = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
  setValue: UseFormSetValue<ExpertiseStepData>;
  disabled?: boolean;
};

export function ExpertiseCatalogPicker({
  expertiseIds,
  softwareIds,
  setValue,
  disabled = false,
}: ExpertiseCatalogPickerProps) {
  const catalogQuery = useQuery({
    queryKey: ["registration", "expertise-catalog"],
    queryFn: getExpertiseCatalog,
    retry: false,
  });

  if (catalogQuery.isPending) {
    return (
      <p className="type-body-sm text-foreground-muted">
        {registrationCopy.expertiseCatalogLoading}
      </p>
    );
  }

  if (catalogQuery.error || !catalogQuery.data) {
    return (
      <Alert variant="info">
        <CircleAlertIcon />
        <AlertTitle>{registrationCopy.expertiseCatalogErrorTitle}</AlertTitle>
        <AlertDescription>
          {registrationCopy.expertiseCatalogApiNote}
        </AlertDescription>
      </Alert>
    );
  }

  const { expertise, software } = catalogQuery.data;

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Field>
        <FieldLabel>{registrationCopy.expertiseSelectedLabel}</FieldLabel>
        <CatalogMultiSelect
          items={expertise}
          selectedIds={expertiseIds}
          placeholder={registrationCopy.expertiseSelectPlaceholder}
          searchPlaceholder={registrationCopy.expertiseSearchPlaceholder}
          emptySelectionText={registrationCopy.expertiseNoneSelected}
          disabled={disabled}
          onChange={(nextIds) => {
            setValue("expertiseIds", nextIds, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
      </Field>

      <Field>
        <FieldLabel>{registrationCopy.softwareLabel}</FieldLabel>
        <CatalogMultiSelect
          items={software}
          selectedIds={softwareIds}
          placeholder={registrationCopy.softwareSelectPlaceholder}
          searchPlaceholder={registrationCopy.softwareSearchPlaceholder}
          emptySelectionText={registrationCopy.softwareNoneSelected}
          disabled={disabled}
          onChange={(nextIds) => {
            setValue("softwareIds", nextIds, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
      </Field>
    </div>
  );
}

type CatalogMultiSelectProps = {
  items: readonly MockExpertiseCatalogItem[];
  selectedIds: readonly string[];
  placeholder: string;
  searchPlaceholder: string;
  emptySelectionText: string;
  disabled: boolean;
  onChange: (ids: string[]) => void;
};

export function CatalogMultiSelect({
  items,
  selectedIds,
  placeholder,
  searchPlaceholder,
  emptySelectionText,
  disabled,
  onChange,
}: CatalogMultiSelectProps) {
  const triggerId = useId();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const itemById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );
  const selectedItems = selectedIds
    .map((id) => itemById.get(id))
    .filter((item): item is MockExpertiseCatalogItem => Boolean(item));
  const normalizedSearch = search.trim().toLocaleLowerCase("fa");
  const filteredItems = normalizedSearch
    ? items.filter((item) =>
        item.label.toLocaleLowerCase("fa").includes(normalizedSearch),
      )
    : items;

  function handleSelectionChange(itemId: string) {
    const nextIds = new Set(selectedIds);

    if (nextIds.has(itemId)) {
      nextIds.delete(itemId);
    } else {
      nextIds.add(itemId);
    }

    onChange([...nextIds]);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (!disabled) {
          setOpen(nextOpen);
          if (!nextOpen) setSearch("");
        }
      }}
    >
      <div className="space-y-3">
        {selectedItems.length > 0 ? (
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label={registrationCopy.selectedItemsLabel}
          >
            {selectedItems.map((item) => (
              <Badge key={item.id} role="listitem" className="gap-1 pe-1">
                <span>{item.label}</span>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectionChange(item.id)}
                  aria-label={registrationCopy.removeExpertiseLabel(item.label)}
                  className="inline-flex size-7 items-center justify-center rounded-full outline-none transition-all duration-200 ease-in-out hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <XIcon className="size-3.5" aria-hidden="true" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="type-caption text-foreground-muted">
            {emptySelectionText}
          </p>
        )}

        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between text-start font-normal"
          >
            <span className="min-w-0 truncate">
              {selectedIds.length > 0
                ? registrationCopy.selectedCount(selectedIds.length)
                : placeholder}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className={cn(
                "size-4 shrink-0 text-foreground-muted transition-all duration-200 ease-in-out",
                open && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent
        align="start"
        collisionPadding={12}
        className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-1.5rem)] p-0 sm:p-0"
      >
        <div className="relative border-b border-border-subtle p-3">
          <SearchIcon
            className="pointer-events-none absolute end-6 top-1/2 size-4 -translate-y-1/2 text-foreground-muted"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-11 pe-10"
          />
        </div>

        <div
          className="max-h-[min(15rem,var(--radix-popover-content-available-height))] overflow-y-auto overscroll-contain p-2"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={triggerId}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const checked = selectedIdSet.has(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => handleSelectionChange(item.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-start type-body-sm outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    checked && "bg-primary-subtle text-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-md border border-input bg-input-background text-primary-foreground",
                      checked && "border-primary bg-primary",
                    )}
                  >
                    {checked ? <CheckIcon className="size-3.5" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">{item.label}</span>
                  {checked ? (
                    <CheckIcon
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-6 text-center type-body-sm text-foreground-muted">
              {registrationCopy.catalogNoResults}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
