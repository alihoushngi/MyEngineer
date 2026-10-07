import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import {
  type ExpertReview,
  type ServiceReview,
} from "@/types/store/review.types";
import { type UserReviewItem } from "@/types/store/user-account.types";

export function toPublicExpertReview(review: ServiceReview): ExpertReview {
  return {
    id: review.id,
    text: review.text,
    authorName: review.authorDisplayName,
    authorRole: "مشتری",
    dateLabel: review.dateLabel,
    rating: review.rating,
    highlights: review.highlights,
    replyText: review.replyText,
    replyAuthorName: review.replyAuthorName,
    replyDateLabel: review.replyDateLabel,
    relatedServiceLabel: review.relatedServiceLabel,
  };
}

export function toUserReviewItem(review: ServiceReview): UserReviewItem {
  return {
    id: review.id,
    expertId: review.expertId,
    expertName: review.expertName,
    expertHref: `/experts/${review.expertId}`,
    text: review.text,
    rating: review.rating,
    dateLabel: review.dateLabel,
    relatedRequestId: review.relatedRequestId,
    relatedServiceLabel: review.relatedServiceLabel,
    replyText: review.replyText,
    replyAuthorName: review.replyAuthorName,
    replyDateLabel: review.replyDateLabel,
    highlights: review.highlights,
    href: `${userAccountPaths.reviews}/${review.id}`,
  };
}

export function userReviewsForCustomer(
  reviews: readonly ServiceReview[],
  customerId: string,
): readonly UserReviewItem[] {
  return reviews
    .filter((item) => item.authorCustomerId === customerId)
    .sort((left, right) => right.createdAtMs - left.createdAtMs)
    .map(toUserReviewItem);
}

export function mergePublicReviews(
  existing: readonly ExpertReview[] | undefined,
  authored: readonly ServiceReview[],
  expertId: string,
): readonly ExpertReview[] {
  const extras = authored
    .filter((item) => item.expertId === expertId)
    .map(toPublicExpertReview);
  const existingItems = existing ?? [];
  const seen = new Set(existingItems.map((item) => item.id));
  const prepended = extras.filter((item) => !seen.has(item.id));
  return [...prepended, ...existingItems];
}
