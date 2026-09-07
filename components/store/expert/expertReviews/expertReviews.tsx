"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Pagination } from "@/components/common/pagination/pagination";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertReviewCard } from "@/components/store/expert/expertReviewCard/expertReviewCard";
import { ExpertStarRating } from "@/components/store/expert/expertStarRating/expertStarRating";
import { ReviewSubmitDialog } from "@/components/store/reviews/reviewSubmitDialog/reviewSubmitDialog";
import { Empty } from "@/components/ui/empty/empty";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type ExpertReview } from "@/types/store/review.types";

type ExpertReviewsProps = {
  expertName: string;
  reviews?: readonly ExpertReview[];
  rating?: number;
  reviewCount?: number;
  eligibleRequestId?: string;
};

export function ExpertReviews({
  expertName,
  reviews,
  rating,
  reviewCount,
  eligibleRequestId,
}: ExpertReviewsProps) {
  const [page, setPage] = useState(1);
  const items = reviews ?? [];
  const count = reviewCount ?? (items.length > 0 ? items.length : undefined);
  const pagination = paginateItems(items, page);

  return (
    <section
      aria-labelledby="expert-reviews-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl">
        <SectionHeader
          titleId="expert-reviews-heading"
          title={`${expertProfileCopy.reviewsTitle} ${expertName}`}
        />

        <div className="mt-6 rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {typeof rating === "number" ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <StarIcon
                      aria-hidden="true"
                      className="size-5 fill-current"
                    />
                  </span>
                  <div>
                    <ExpertStarRating
                      rating={rating}
                      label={`${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)}`}
                    />
                    <ExpertRating
                      rating={rating}
                      reviewCount={count}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : count !== undefined ? (
                <p className="type-body-sm text-foreground-muted">
                  {formatFaNumber(count)} {expertProfileCopy.reviewCountNoun}
                </p>
              ) : null}
            </div>

            {eligibleRequestId ? (
              <ReviewSubmitDialog requestId={eligibleRequestId} />
            ) : null}
          </div>

          <p className="mt-4 type-body-sm leading-loose text-foreground-muted">
            {expertProfileCopy.reviewsIntro}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-6">
            <Empty title={expertProfileCopy.reviewsEmpty} />
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-4">
              {pagination.items.map((review) => (
                <li key={review.id}>
                  <ExpertReviewCard review={review} />
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Pagination
                page={pagination.page}
                pageCount={pagination.pageCount}
                ariaLabel={expertProfileCopy.reviewPaginationLabel}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
