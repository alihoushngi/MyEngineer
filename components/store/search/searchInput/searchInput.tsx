"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { type SearchInputProps } from "@/components/store/search/searchInput/type/searchInput.types";
import { Button } from "@/components/ui/button/button";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { storePaths } from "@/config/navigation.config/navigation.config";
import { searchCopy } from "@/config/search.config/search.config";

import { buildSearchHref } from "@/lib/search/search-params/search-params";

export function SearchInput({
  initialQuery,
  cities = [],
  id = "search-query",
  requireQuery = false,
  navigateOnClear = true,
  autoFocus = false,
  labelHidden = false,
  onSubmitted,
}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  const trimmedValue = value.trim();
  const hasValue = trimmedValue !== "";
  const canSubmit = !requireQuery || hasValue;
  const citiesValue = cities.join(",");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    router.push(
      buildSearchHref({
        q: value,
        cities,
      }),
    );

    onSubmitted?.();
  }

  function clearSearch() {
    setValue("");

    if (navigateOnClear) {
      router.push(
        buildSearchHref({
          cities,
        }),
      );
    }
  }

  return (
    <form
      action={storePaths.search}
      method="get"
      className="w-full"
      onSubmit={submitSearch}
    >
      {citiesValue !== "" ? (
        <input type="hidden" name="cities" value={citiesValue} />
      ) : null}

      <Field className="gap-2">
        <FieldLabel
          htmlFor={id}
          className={labelHidden ? "sr-only" : undefined}
        >
          {searchCopy.inputLabel}
        </FieldLabel>

        <div className="flex w-full items-stretch gap-2">
          <div className="group relative min-w-0 flex-1">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-s-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-foreground-muted transition-all duration-200 ease-in-out group-focus-within:text-primary motion-reduce:transform-none"
            />

            <Input
              id={id}
              name="q"
              type="search"
              value={value}
              autoFocus={autoFocus}
              autoComplete="off"
              enterKeyHint="search"
              placeholder={searchCopy.placeholder}
              className="h-12 w-full rounded-xl border-border-subtle bg-surface ps-10 pe-11 shadow-xs transition-all duration-200 ease-in-out placeholder:text-foreground-subtle hover:border-border-interactive focus-visible:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            />

            {hasValue ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute inset-e-1.5 top-1/2 -translate-y-1/2 text-foreground-muted transition-all duration-200 ease-in-out hover:bg-surface-muted hover:text-foreground motion-reduce:transform-none"
                aria-label={searchCopy.clearLabel}
                onClick={clearSearch}
              >
                <XIcon aria-hidden="true" className="size-4" />
              </Button>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="size-12 shrink-0 rounded-xl px-0 shadow-sm transition-all duration-200 ease-in-out active:scale-[0.98] sm:w-auto sm:min-w-24 sm:px-5 motion-reduce:transform-none"
          >
            <SearchIcon aria-hidden="true" className="size-4 sm:hidden" />
            <span className="hidden sm:inline">{searchCopy.submitLabel}</span>
            <span className="sr-only sm:hidden">{searchCopy.submitLabel}</span>
          </Button>
        </div>
      </Field>
    </form>
  );
}
