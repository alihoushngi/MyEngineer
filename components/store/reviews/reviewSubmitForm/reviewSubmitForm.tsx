"use client";

import {
  InfoIcon,
  MessageSquareTextIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ReviewRatingInput } from "@/components/store/reviews/reviewRatingInput/reviewRatingInput";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";

import {
  REVIEW_COMMENT_MAX_LENGTH,
  REVIEW_COMMENT_MIN_LENGTH,
  reviewsCopy,
} from "@/config/reviews.config/reviews.config";

import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

import { submitReview } from "@/services/review-service/review-service";

type ReviewSubmitFormProps = {
  requestId: string;
  onSuccess?: (reviewId: string) => void;
};

export function ReviewSubmitForm({
  requestId,
  onSuccess,
}: ReviewSubmitFormProps) {
  const router = useRouter();
  const mutation = useApiMutation(submitReview);

  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const trimmed = body.trim();
  const ratingInvalid = rating < 1;
  const commentInvalid =
    trimmed.length > 0 && trimmed.length < REVIEW_COMMENT_MIN_LENGTH;

  async function onSubmit() {
    setError(null);

    if (ratingInvalid) {
      setError(reviewsCopy.ratingRequired);
      return;
    }

    if (trimmed.length < REVIEW_COMMENT_MIN_LENGTH) {
      setError(reviewsCopy.commentMinError);
      return;
    }

    try {
      const reviewId = await mutation.mutateAsync({
        requestId,
        rating,
        body: trimmed,
      });

      onSuccess?.(reviewId);
      router.refresh();
    } catch (err: unknown) {
      setError(toUserErrorMessage(err, reviewsCopy.mutationErrorFallback));
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      {error ? (
        <Alert variant="danger" className="rounded-2xl">
          <InfoIcon aria-hidden="true" />
          <AlertTitle>{reviewsCopy.mutationErrorFallback}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Field invalid={Boolean(error) && ratingInvalid}>
        <FieldLabel required>
          <span className="inline-flex items-center gap-2">
            <StarIcon aria-hidden="true" className="size-4 text-accent" />
            {reviewsCopy.ratingLabel}
          </span>
        </FieldLabel>

        <div className="rounded-2xl bg-surface-subtle p-4">
          <ReviewRatingInput
            value={rating}
            invalid={Boolean(error) && ratingInvalid}
            onChange={(next) => {
              setRating(next);
              setError(null);
            }}
          />

          {rating > 0 ? (
            <p className="mt-3 type-caption font-medium text-foreground-muted">
              {formatFaNumber(rating)} از {formatFaNumber(5)}
            </p>
          ) : null}
        </div>

        {Boolean(error) && ratingInvalid ? (
          <FieldError>{reviewsCopy.ratingRequired}</FieldError>
        ) : null}
      </Field>

      <Field invalid={commentInvalid}>
        <FieldLabel htmlFor="review-comment" required>
          <span className="inline-flex items-center gap-2">
            <MessageSquareTextIcon
              aria-hidden="true"
              className="size-4 text-primary"
            />
            {reviewsCopy.commentLabel}
          </span>
        </FieldLabel>

        <Textarea
          id="review-comment"
          name="body"
          value={body}
          rows={5}
          maxLength={REVIEW_COMMENT_MAX_LENGTH}
          className="min-h-32 resize-y"
          aria-invalid={commentInvalid || undefined}
          onChange={(event) => {
            setBody(event.target.value);
            setError(null);
          }}
        />

        <div className="flex items-start justify-between gap-3">
          <FieldHint className="min-w-0">{reviewsCopy.commentHint}</FieldHint>

          <span className="shrink-0 type-caption tabular-nums text-foreground-subtle">
            {formatFaNumber(body.length)} /{" "}
            {formatFaNumber(REVIEW_COMMENT_MAX_LENGTH)}
          </span>
        </div>

        {commentInvalid ? (
          <FieldError>{reviewsCopy.commentMinError}</FieldError>
        ) : null}
      </Field>

      <Button
        type="submit"
        loading={mutation.isPending}
        disabled={mutation.isPending}
        className="w-full gap-2"
      >
        <SendIcon aria-hidden="true" className="size-4" />
        {reviewsCopy.submitCta}
      </Button>
    </form>
  );
}
