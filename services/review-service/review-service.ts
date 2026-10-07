/**
 * Customer engineer-review mutations. Mock overlay only; no invented API URL.
 */

import {
  mutationFailed,
  throwIfMutationFailed,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { submitReviewAction } from "@/services/review-service/review-actions";

export async function submitReview(input: {
  requestId: string;
  rating: number;
  body: string;
  tagIds?: readonly number[];
  isAnonymous?: boolean;
}): Promise<string> {
  const result = await submitReviewAction(input);
  throwIfMutationFailed(result);

  if (!result.reviewId) {
    throwIfMutationFailed(mutationFailed("شناسه نظر ساخته نشد."));
    throw new Error("شناسه نظر ساخته نشد.");
  }

  return result.reviewId;
}
