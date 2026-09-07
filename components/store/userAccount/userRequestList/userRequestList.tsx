"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Pagination } from "@/components/common/pagination/pagination";
import { UserRequestRow } from "@/components/store/userAccount/userRequestRow/userRequestRow";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";

import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  filterRequestsByStatus,
  parseUserRequestFilter,
  type UserRequestFilterId,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";
import { cn } from "@/lib/utils/cn/cn";

import { type UserRequest } from "@/types/store/user-account.types";

const FILTERS: readonly {
  id: UserRequestFilterId;
  label: string;
}[] = [
  { id: "all", label: userAccountCopy.filterAll },
  { id: "sent", label: userAccountCopy.filterSent },
  { id: "in_review", label: userAccountCopy.filterInReview },
  { id: "closed", label: userAccountCopy.filterClosed },
];

type UserRequestListProps = {
  requests: readonly UserRequest[];
};

export function UserRequestList({ requests }: UserRequestListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = parseUserRequestFilter(searchParams.get("status"));

  const items = useMemo(
    () => filterRequestsByStatus(requests, filter),
    [filter, requests],
  );

  const pagination = paginateItems(
    items,
    parsePageParam(searchParams.get("page")),
  );

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="فیلتر درخواست‌ها"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {FILTERS.map((item) => {
          const active = filter === item.id;

          return (
            <Link
              key={item.id}
              href={filterHref(pathname, item.id)}
              scroll={false}
              role="tab"
              aria-selected={active}
              className={cn(
                "inline-flex min-h-10 shrink-0 items-center rounded-xl border px-3.5 type-caption font-semibold outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-xs"
                  : "border-border-subtle bg-surface text-foreground-muted hover:border-primary/20 hover:bg-primary-subtle hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {pagination.total === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            title={userAccountCopy.emptyRequests}
            description={userAccountCopy.emptyRequestsHint}
            action={
              <Button asChild>
                <Link href={siteConfig.homeHref}>
                  {userAccountCopy.findExpert}
                </Link>
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <ul className="rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs">
            {pagination.items.map((request) => (
              <li key={request.id}>
                <UserRequestRow request={request} />
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
            query={searchParams.toString()}
          />
        </>
      )}
    </div>
  );
}

function filterHref(pathname: string, id: UserRequestFilterId): string {
  if (id === "all") {
    return pathname;
  }

  return `${pathname}?status=${id}`;
}
