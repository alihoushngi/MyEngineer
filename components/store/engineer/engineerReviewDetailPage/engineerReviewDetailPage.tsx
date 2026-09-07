import Link from "next/link";
import { ArrowRightIcon, MessageSquareQuoteIcon } from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Button } from "@/components/ui/button/button";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerReviewDetailPageProps = {
  review: EngineerReview;
};

export function EngineerReviewDetailPage({
  review,
}: EngineerReviewDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.reviewDetail}
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          {
            label: engineerPageTitles.reviews,
            href: engineerPanelPaths.reviews,
          },
          { label: engineerPageTitles.reviewDetail },
        ]}
        actions={
          <Button asChild variant="outline">
            <Link href={engineerPanelPaths.reviews} className="gap-2">
              <ArrowRightIcon aria-hidden="true" className="size-4" />
              {engineerPanelCopy.backToReviews}
            </Link>
          </Button>
        }
      />

      <article className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {review.authorName ? (
              <h2 className="type-h3 text-foreground">{review.authorName}</h2>
            ) : null}

            {review.dateLabel ? (
              <p className="mt-1 type-caption text-foreground-subtle">
                {review.dateLabel}
              </p>
            ) : null}
          </div>

          {typeof review.rating === "number" ? (
            <ExpertRating rating={review.rating} />
          ) : null}
        </div>

        {review.relatedServiceLabel ? (
          <p className="mt-4 inline-flex rounded-full bg-primary-subtle px-3 py-1 type-caption font-medium text-primary">
            {review.relatedServiceLabel}
          </p>
        ) : null}

        <p className="mt-5 type-body leading-loose text-foreground-muted">
          {review.text}
        </p>

        {review.replyText ? (
          <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-subtle p-4">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquareQuoteIcon aria-hidden="true" className="size-4" />
              <p className="type-caption font-semibold">
                {expertProfileCopy.reviewReplyLabel}
              </p>
            </div>

            <p className="mt-2 type-body-sm leading-relaxed text-foreground">
              {review.replyText}
            </p>
          </div>
        ) : null}
      </article>
    </div>
  );
}
