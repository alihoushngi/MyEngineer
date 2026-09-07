import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { excerptReviewText } from "@/lib/engineer/review-excerpt/review-excerpt";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerReviewRowProps = {
  review: EngineerReview;
};

export function EngineerReviewRow({ review }: EngineerReviewRowProps) {
  return (
    <Link
      href={`${engineerPanelPaths.reviews}/${review.id}`}
      className="group flex min-h-20 items-start gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {review.authorName ? (
            <p className="type-body font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
              {review.authorName}
            </p>
          ) : null}

          {review.dateLabel ? (
            <p className="type-caption text-foreground-subtle">
              {review.dateLabel}
            </p>
          ) : null}
        </div>

        {review.relatedServiceLabel ? (
          <p className="mt-1 type-caption text-foreground-muted">
            {review.relatedServiceLabel}
          </p>
        ) : null}

        {typeof review.rating === "number" ? (
          <div className="mt-2">
            <ExpertRating rating={review.rating} />
          </div>
        ) : null}

        <p className="mt-2 line-clamp-2 type-body-sm leading-relaxed text-foreground-muted">
          {excerptReviewText(review.text)}
        </p>
      </div>

      <ChevronLeftIcon
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-0.5 group-hover:text-primary motion-reduce:transform-none"
      />
    </Link>
  );
}
