"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { searchCopy } from "@/config/search.config/search.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

import { buildSearchHref } from "@/lib/search/search-params/search-params";

import { type SearchInputProps } from "@/components/store/search/searchInput/type/searchInput.types";

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

      <Field className="gap-0">
        <FieldLabel
          htmlFor={id}
          className={labelHidden ? "sr-only" : undefined}
        >
          {searchCopy.inputLabel}
        </FieldLabel>

        <div
          className="
            flex
            w-full
            items-stretch
            gap-2
            p-1
          "
        >
          {/* Input */}
          <div
            className="
              group/input
              relative
              min-w-0
              flex-1
            "
          >
            <SearchIcon
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-s-3.5 top-1/2
                z-10
                size-4.5
                -translate-y-1/2
                text-muted-foreground

                transition-colors
                duration-200

                group-focus-within/input:text-primary
              "
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
              className="
                h-12
                w-full
                rounded-xl

                border-transparent
                bg-transparent

                ps-11
                pe-12

                shadow-none

                transition-all
                duration-200

                placeholder:text-muted-foreground/70

                hover:bg-muted/40

                focus-visible:border-primary/20
                focus-visible:bg-muted/35
                focus-visible:ring-2
                focus-visible:ring-primary/15

                [&::-webkit-search-cancel-button]:hidden
              "
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            />

            {hasValue ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  absolute inset-e-1 top-1/2
                  size-10
                  -translate-y-1/2
                  rounded-lg

                  text-muted-foreground

                  hover:bg-muted
                  hover:text-foreground
                "
                aria-label={searchCopy.clearLabel}
                onClick={clearSearch}
              >
                <XIcon aria-hidden="true" className="size-4" />
              </Button>
            ) : null}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!canSubmit}
            className="
              h-12
              shrink-0
              rounded-xl
              px-4
              shadow-sm

              transition-all
              duration-200

              active:scale-[0.98]

              sm:min-w-24
              sm:px-6
            "
          >
            <SearchIcon
              aria-hidden="true"
              className="
                size-4
                sm:hidden
              "
            />

            <span className="hidden sm:inline">{searchCopy.submitLabel}</span>

            <span className="sr-only sm:hidden">{searchCopy.submitLabel}</span>
          </Button>
        </div>
      </Field>
    </form>
  );
}
