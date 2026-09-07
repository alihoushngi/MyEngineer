import { XIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";

import { searchCopy } from "@/config/search.config/search.config";

import { type SearchActiveFilter } from "@/types/store/search.types";

type ActiveFiltersProps = {
  items: readonly SearchActiveFilter[];
  clearHref: string;
};

export function ActiveFilters({ items, clearHref }: ActiveFiltersProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
      <ul className="flex min-w-0 flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Badge variant="secondary" asChild>
              <Link
                href={item.href}
                className="group inline-flex min-h-9 items-center gap-2 rounded-lg px-3 outline-none transition-all duration-200 ease-in-out hover:bg-primary-subtle hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="min-w-0 truncate">{item.label}</span>
                <XIcon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 transition-all duration-200 ease-in-out group-hover:rotate-90 motion-reduce:transform-none"
                />
                <span className="sr-only">حذف {item.label}</span>
              </Link>
            </Badge>
          </li>
        ))}
      </ul>

      <Button asChild variant="ghost" size="sm" className="shrink-0">
        <Link href={clearHref}>{searchCopy.clearFilters}</Link>
      </Button>
    </div>
  );
}
