import { StarIcon } from "lucide-react";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ExpertRatingProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

export function ExpertRating({
  rating,
  reviewCount,
  className,
}: ExpertRatingProps) {
  const label =
    reviewCount === undefined
      ? `${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)}`
      : `${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)} از ${formatFaNumber(reviewCount)} نظر`;

  return (
    <p
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 type-body-sm text-foreground-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent"
      >
        <StarIcon className="size-3.5 fill-current" />
      </span>
      <span className="min-w-0">{label}</span>
    </p>
  );
}
