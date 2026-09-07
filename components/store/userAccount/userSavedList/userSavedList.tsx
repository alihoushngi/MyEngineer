"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Pagination } from "@/components/common/pagination/pagination";
import { UserSavedExpertCard } from "@/components/store/userAccount/userSavedExpertCard/userSavedExpertCard";

import { userAccountCopy } from "@/config/user-account.config/user-account.config";

import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";

import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedListProps = {
  experts: readonly ExpertCardData[];
  conversationIdByExpertId: Readonly<Record<string, string>>;
};

export function UserSavedList({
  experts,
  conversationIdByExpertId,
}: UserSavedListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pagination = paginateItems(
    experts,
    parsePageParam(searchParams.get("page")),
  );

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2">
        {pagination.items.map((expert) => (
          <li key={expert.id} className="min-w-0">
            <UserSavedExpertCard
              expert={expert}
              conversationId={conversationIdByExpertId[expert.id]}
            />
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
    </div>
  );
}
