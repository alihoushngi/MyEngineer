"use client";

import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { type ContentFilterBarProps } from "@/components/common/contentFilterBar/type/contentFilterBar.types";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

const ALL_VALUE = "all";

/**
 * URL-driven search + select filters for content list pages.
 * The server page reads the same params, so results are filtered by the API.
 */
export function ContentFilterBar({
  q,
  searchLabel,
  searchPlaceholder,
  submitLabel = "جستجو",
  selects = [],
}: ContentFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(q);

  function navigate(nextQ: string, overrides: Record<string, string> = {}) {
    const params = new URLSearchParams();

    if (nextQ.trim() !== "") {
      params.set("q", nextQ.trim());
    }

    for (const select of selects) {
      const next = overrides[select.param] ?? select.value;
      if (next && next !== ALL_VALUE) {
        params.set(select.param, next);
      }
    }

    const serialized = params.toString();
    router.push(serialized === "" ? pathname : `${pathname}?${serialized}`, {
      scroll: false,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(value);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex min-w-0 flex-1 gap-2"
      >
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle"
          />
          <Input
            type="search"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            aria-label={searchLabel}
            placeholder={searchPlaceholder}
            className="ps-10"
          />
        </div>
        <Button type="submit" className="h-12 shrink-0">
          {submitLabel}
        </Button>
      </form>

      {selects.map((select) => (
        <Select
          key={select.param}
          value={select.value === "" ? ALL_VALUE : select.value}
          onValueChange={(next) => {
            navigate(value, { [select.param]: next });
          }}
        >
          <SelectTrigger
            aria-label={select.label}
            className="h-12 w-full lg:w-52"
          >
            <SelectValue placeholder={select.allLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>{select.allLabel}</SelectItem>
            {select.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
