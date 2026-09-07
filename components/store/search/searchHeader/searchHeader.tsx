import { SearchIcon } from "lucide-react";

import { SearchFilters } from "@/components/store/search/searchFilters/searchFilters";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";

import { searchCopy } from "@/config/search.config/search.config";

type SearchHeaderProps = {
  initialQuery: string;
  cities?: readonly string[];
};

export function SearchHeader({ initialQuery, cities }: SearchHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-24 -top-24 -z-10 size-64 rounded-full bg-primary/5 blur-[90px]"
      />

      <div className="mb-6 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <SearchIcon aria-hidden="true" className="size-5" />
        </span>

        <div className="min-w-0 max-w-2xl">
          <h1 className="type-h1 text-foreground">{searchCopy.title}</h1>

          <p className="mt-2 type-body leading-relaxed text-foreground-muted">
            {searchCopy.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <SearchInput
            key={initialQuery}
            initialQuery={initialQuery}
            cities={cities}
          />
        </div>

        <SearchFilters cities={cities} />
      </div>
    </header>
  );
}
