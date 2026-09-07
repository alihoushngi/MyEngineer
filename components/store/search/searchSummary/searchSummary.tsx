import { SearchIcon } from "lucide-react";

import { searchCopy } from "@/config/search.config/search.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type SearchSummaryProps = {
  query: string;
  serviceCount?: number;
  expertCount?: number;
};

export function SearchSummary({
  query,
  serviceCount,
  expertCount,
}: SearchSummaryProps) {
  if (query === "") {
    return null;
  }

  const hasCounts =
    typeof serviceCount === "number" && typeof expertCount === "number";

  return (
    <div
      className="flex items-start gap-2.5 rounded-2xl border border-border-subtle bg-surface px-4 py-3 shadow-xs"
      aria-live="polite"
    >
      <SearchIcon
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-primary"
      />

      <p className="type-body-sm leading-relaxed text-foreground-muted">
        {searchCopy.summaryPrefix}{" "}
        <strong className="font-semibold text-foreground">«{query}»</strong>
        {hasCounts
          ? ` — ${searchCopy.resultCount(
              formatFaNumber(serviceCount),
              formatFaNumber(expertCount),
            )}`
          : null}
      </p>
    </div>
  );
}
