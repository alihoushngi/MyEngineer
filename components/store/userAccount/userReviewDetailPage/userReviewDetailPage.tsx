import { MessageSquareReplyIcon } from "lucide-react";
import Link from "next/link";

import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Button } from "@/components/ui/button/button";

import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { reviewsCopy } from "@/config/reviews.config/reviews.config";
import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewDetailPageProps = {
  review: UserReviewItem;
};

export function UserReviewDetailPage({ review }: UserReviewDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.reviewDetail}
        description={reviewsCopy.detailDescription}
      />

      <article className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="type-h2 text-foreground">{review.expertName}</h2>

            {review.relatedServiceLabel ? (
              <p className="mt-1 type-body-sm text-foreground-muted">
                {reviewsCopy.relatedService}: {review.relatedServiceLabel}
              </p>
            ) : null}
          </div>

          {review.dateLabel ? (
            <p className="shrink-0 type-caption text-foreground-subtle">
              {review.dateLabel}
            </p>
          ) : null}
        </div>

        {typeof review.rating === "number" ? (
          <div className="mt-5 w-fit rounded-xl bg-accent-subtle px-3 py-2">
            <ExpertRating rating={review.rating} />
          </div>
        ) : null}

        <p className="mt-5 type-body leading-loose text-foreground">
          {review.text}
        </p>

        {review.replyText ? (
          <div className="mt-5 rounded-2xl border border-border-subtle bg-surface-muted p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <MessageSquareReplyIcon aria-hidden="true" className="size-4" />
              <p className="type-caption font-semibold">
                {expertProfileCopy.reviewReplyLabel}
              </p>
            </div>

            <p className="type-body-sm leading-relaxed text-foreground">
              {review.replyText}
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={review.expertHref}>
              {userAccountCopy.openPublicProfile}
            </Link>
          </Button>

          {review.relatedRequestId ? (
            <Button asChild variant="outline">
              <Link
                href={`${userAccountPaths.requests}/${review.relatedRequestId}`}
              >
                {reviewsCopy.relatedRequest}
              </Link>
            </Button>
          ) : null}

          <Button asChild>
            <Link href={userAccountPaths.reviews}>
              {userAccountPageTitles.reviews}
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
