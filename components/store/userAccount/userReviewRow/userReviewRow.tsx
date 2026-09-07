import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";

import { excerptReviewText } from "@/lib/engineer/review-excerpt/review-excerpt";

import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewRowProps = {
  review: UserReviewItem;
};

export function UserReviewRow({ review }: UserReviewRowProps) {
  return (
    <Link
      href={review.href}
      className="group flex min-h-20 flex-col gap-2 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
            {review.expertName}
          </p>

          {review.relatedServiceLabel ? (
            <p className="mt-1 type-caption text-foreground-subtle">
              {review.relatedServiceLabel}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {review.dateLabel ? (
            <p className="type-caption text-foreground-subtle">
              {review.dateLabel}
            </p>
          ) : null}

          <ArrowLeftIcon
            aria-hidden="true"
            className="size-4 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none ltr:rotate-180"
          />
        </div>
      </div>

      {typeof review.rating === "number" ? (
        <ExpertRating rating={review.rating} />
      ) : null}

      <p className="line-clamp-2 type-body-sm leading-relaxed text-foreground-muted">
        {excerptReviewText(review.text)}
      </p>
    </Link>
  );
}
