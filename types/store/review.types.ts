export type ReviewHighlightKind = "positive" | "negative";

export type ReviewHighlight = {
  kind: ReviewHighlightKind;
  label: string;
};

/**
 * Public/engineer display shape. Customer-authored reviews project into this
 * same record so `/experts/[id]`, `/engineer/reviews`, and `/account/reviews`
 * do not keep three catalogs.
 */
export type ExpertReview = {
  id: string;
  text: string;
  authorName?: string;
  authorRole?: string;
  dateLabel?: string;
  rating?: number;
  highlights?: readonly ReviewHighlight[];
  replyText?: string;
  replyAuthorName?: string;
  replyDateLabel?: string;
  relatedServiceLabel?: string;
};

/**
 * Canonical customer-authored engineer review. Not an article comment.
 */
export type ServiceReview = {
  id: string;
  expertId: string;
  expertName: string;
  authorCustomerId: string;
  authorDisplayName: string;
  relatedRequestId: string;
  relatedServiceLabel: string;
  rating: number;
  text: string;
  dateLabel: string;
  createdAtMs: number;
  highlights?: readonly ReviewHighlight[];
  replyText?: string;
  replyAuthorName?: string;
  replyDateLabel?: string;
};

export type ReviewOverlay = {
  reviews: readonly ServiceReview[];
};
