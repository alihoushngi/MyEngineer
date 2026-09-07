import { StarIcon } from "lucide-react";

import { Pagination } from "@/components/common/pagination/pagination";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserReviewRow } from "@/components/store/userAccount/userReviewRow/userReviewRow";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewsPageProps = {
  reviews: readonly UserReviewItem[];
  pagination: PaginatedItems<UserReviewItem>;
  pathname: string;
};

export function UserReviewsPage({
  reviews,
  pagination,
  pathname,
}: UserReviewsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.reviews}
        description={userAccountCopy.reviewsDescription}
      />

      {pagination.total === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<StarIcon aria-hidden="true" />}
            title={userAccountCopy.emptyReviews}
          />
        </div>
      ) : (
        <>
          <ul className="rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs">
            {reviews.map((review) => (
              <li key={review.id}>
                <UserReviewRow review={review} />
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
