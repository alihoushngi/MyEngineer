import { Badge } from "@/components/ui/badge/badge";

import { type ReviewHighlight } from "@/types/store/review.types";

type ReviewHighlightsProps = {
  highlights?: readonly ReviewHighlight[];
  className?: string;
};

/** Positive/negative tag badges attached to a review. */
export function ReviewHighlights({
  highlights,
  className = "mt-4",
}: ReviewHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <ul className={`${className} flex flex-wrap gap-2`}>
      {highlights.map((item) => (
        <li key={`${item.kind}-${item.label}`}>
          <Badge variant={item.kind === "positive" ? "success" : "danger"}>
            {item.label}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
