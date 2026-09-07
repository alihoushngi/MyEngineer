import { MessageSquareQuoteIcon } from "lucide-react";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStarRating } from "@/components/store/expert/expertStarRating/expertStarRating";
import { Badge } from "@/components/ui/badge/badge";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertReview } from "@/types/store/review.types";

type ExpertReviewCardProps = {
  review: ExpertReview;
};

export function ExpertReviewCard({ review }: ExpertReviewCardProps) {
  return (
    <article className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {review.authorName ? (
          <h3 className="type-body font-semibold text-foreground">
            {review.authorName}
          </h3>
        ) : null}
        {review.authorRole ? (
          <p className="type-caption text-foreground-muted">
            {review.authorRole}
          </p>
        ) : null}
        {review.dateLabel ? (
          <p className="type-caption text-foreground-subtle">
            {review.dateLabel}
          </p>
        ) : null}
      </header>

      {typeof review.rating === "number" ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ExpertStarRating
            rating={review.rating}
            label={`${expertProfileCopy.ratingLabel} ${review.rating}`}
          />
          <ExpertRating rating={review.rating} />
        </div>
      ) : null}

      {review.relatedServiceLabel ? (
        <p className="mt-3 inline-flex rounded-full bg-primary-subtle px-3 py-1 type-caption font-medium text-primary">
          {review.relatedServiceLabel}
        </p>
      ) : null}

      <p className="mt-4 type-body leading-loose text-foreground-muted">
        {review.text}
      </p>

      {review.highlights && review.highlights.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {review.highlights.map((item) => (
            <li key={`${item.kind}-${item.label}`}>
              <Badge variant={item.kind === "positive" ? "success" : "danger"}>
                {item.label}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      {review.replyText ? (
        <div className="mt-5 rounded-2xl bg-surface-muted p-4">
          <p className="flex items-center gap-2 type-caption font-semibold text-primary">
            <MessageSquareQuoteIcon aria-hidden="true" className="size-4" />
            {expertProfileCopy.reviewReplyLabel}
          </p>
          <p className="mt-2 type-body-sm leading-relaxed text-foreground">
            {review.replyText}
          </p>
        </div>
      ) : null}
    </article>
  );
}
