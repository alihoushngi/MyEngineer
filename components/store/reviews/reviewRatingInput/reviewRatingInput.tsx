"use client";

import { StarIcon } from "lucide-react";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ReviewRatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
  invalid?: boolean;
};

export function ReviewRatingInput({
  value,
  onChange,
  invalid = false,
}: ReviewRatingInputProps) {
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    rating: number,
  ) {
    let nextRating: number | null = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextRating = Math.min(5, rating + 1);
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextRating = Math.max(1, rating - 1);
    }

    if (event.key === "Home") {
      nextRating = 1;
    }

    if (event.key === "End") {
      nextRating = 5;
    }

    if (nextRating === null) {
      return;
    }

    event.preventDefault();
    onChange(nextRating);

    document.getElementById(`review-rating-${nextRating}`)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={reviewsCopy.ratingLabel}
      aria-invalid={invalid || undefined}
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-2xl border bg-surface p-1.5 shadow-xs",
        invalid ? "border-danger/30 bg-danger/5" : "border-border-subtle",
      )}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const rating = index + 1;
        const selected = rating <= value;
        const active = value === rating;

        return (
          <button
            id={`review-rating-${rating}`}
            key={rating}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${reviewsCopy.ratingOptionLabel} ${formatFaNumber(rating)}`}
            tabIndex={active || (value === 0 && rating === 1) ? 0 : -1}
            className={cn(
              "group inline-flex size-10 items-center justify-center rounded-xl outline-none transition-all duration-200 ease-in-out hover:bg-accent-subtle focus-visible:ring-2 focus-visible:ring-ring sm:size-11",
              active && "bg-accent-subtle",
              invalid && "focus-visible:ring-danger",
            )}
            onClick={() => {
              onChange(rating);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event, rating);
            }}
          >
            <StarIcon
              aria-hidden="true"
              className={cn(
                "size-5 transition-all duration-200 ease-in-out group-hover:scale-110 sm:size-5.5 motion-reduce:transform-none",
                selected
                  ? "fill-accent text-accent"
                  : "text-foreground-subtle group-hover:text-accent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
