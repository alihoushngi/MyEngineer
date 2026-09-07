"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerRequestRow } from "@/components/store/engineer/engineerRequestRow/engineerRequestRow";
import { Empty } from "@/components/ui/empty/empty";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { cn } from "@/lib/utils/cn/cn";
import { type EngineerRequest } from "@/types/store/engineer.types";

type FilterId = "all" | "new" | "in_review" | "closed";

const FILTERS: readonly { id: FilterId; label: string }[] = [
  { id: "all", label: engineerPanelCopy.filterAll },
  { id: "new", label: engineerPanelCopy.filterNew },
  { id: "in_review", label: engineerPanelCopy.filterInReview },
  { id: "closed", label: engineerPanelCopy.filterClosed },
];

type EngineerRequestListProps = {
  requests: readonly EngineerRequest[];
};

export function EngineerRequestList({ requests }: EngineerRequestListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = parseFilter(searchParams.get("status"));

  const items = useMemo(() => {
    if (filter === "all") {
      return requests;
    }

    if (filter === "new") {
      return requests.filter((item) => item.status === "new");
    }

    return requests.filter((item) => item.status === filter);
  }, [filter, requests]);

  const pagination = paginateItems(
    items,
    parsePageParam(searchParams.get("page")),
  );

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="فیلتر درخواست‌ها"
        className="-mx-4 flex overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <div className="flex gap-2">
          {FILTERS.map((item) => (
            <Link
              key={item.id}
              href={filterHref(pathname, item.id)}
              scroll={false}
              role="tab"
              aria-selected={filter === item.id}
              className={cn(
                "inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 type-caption font-semibold outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring",
                filter === item.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border-subtle bg-surface text-foreground-muted hover:border-primary/20 hover:bg-primary-subtle hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {pagination.total === 0 ? (
        <Empty title={engineerPanelCopy.emptyRequests} />
      ) : (
        <>
          <ul className="grid gap-1 rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs sm:p-3">
            {pagination.items.map((request) => (
              <li key={request.id}>
                <EngineerRequestRow request={request} />
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
            query={searchParams.toString()}
          />
        </>
      )}
    </div>
  );
}

function parseFilter(value: string | null): FilterId {
  if (value === "new" || value === "in_review" || value === "closed") {
    return value;
  }

  return "all";
}

function filterHref(pathname: string, id: FilterId): string {
  if (id === "all") {
    return pathname;
  }

  return `${pathname}?status=${id}`;
}
