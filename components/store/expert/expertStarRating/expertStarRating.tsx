import { StarIcon } from "lucide-react";
import { getFilledStarCount } from "@/lib/experts/star-rating/star-rating";
import { cn } from "@/lib/utils/cn/cn";

type ExpertStarRatingProps = {
  rating: number;
  label: string;
  className?: string;
};

export function ExpertStarRating({
  rating,
  label,
  className,
}: ExpertStarRatingProps) {
  const filled = getFilledStarCount(rating);

  return (
    <p
      className={cn("flex items-center gap-0.5", className)}
      aria-label={label}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden="true"
          className={cn(
            "size-4",
            index < filled ? "fill-accent text-accent" : "text-border-strong",
          )}
        />
      ))}
    </p>
  );
}
