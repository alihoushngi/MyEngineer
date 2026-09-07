import Link from "next/link";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerLatestReviewsProps = {
  reviews: readonly EngineerReview[];
};

export function EngineerLatestReviews({ reviews }: EngineerLatestReviewsProps) {
  const latest = reviews[0];

  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-warning/10 text-warning">
            <StarIcon aria-hidden="true" className="size-4.5" />
          </span>
          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.latestReviews}
          </h2>
        </div>

        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.reviews} className="gap-1.5">
            {engineerPanelCopy.viewAll}
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>

      {!latest ? (
        <Empty title={engineerPanelCopy.emptyReviews} className="py-8" />
      ) : (
        <Link
          href={`${engineerPanelPaths.reviews}/${latest.id}`}
          className="group block rounded-2xl border border-border-subtle bg-surface-subtle p-4 outline-none transition-all duration-200 ease-in-out hover:border-primary/15 hover:bg-primary-subtle/40 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {typeof latest.rating === "number" ? (
            <ExpertRating rating={latest.rating} />
          ) : null}

          <p className="mt-3 line-clamp-3 type-body leading-relaxed text-foreground">
            {latest.text}
          </p>

          <p className="mt-3 type-caption text-foreground-subtle">
            {[latest.authorName, latest.dateLabel].filter(Boolean).join(" · ")}
          </p>
        </Link>
      )}
    </section>
  );
}
