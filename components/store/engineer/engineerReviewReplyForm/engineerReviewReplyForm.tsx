"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";

import { submitReviewReplyAction } from "@/services/engineer-service/engineer-actions";

type EngineerReviewReplyFormProps = {
  reviewId: string;
};

export function EngineerReviewReplyForm({
  reviewId,
}: EngineerReviewReplyFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (body.trim().length < 5) {
      setError(reviewsCopy.replyMinError);
      return;
    }

    startTransition(async () => {
      const result = await submitReviewReplyAction({ reviewId, body });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess(result.message ?? reviewsCopy.replySuccess);
      setBody("");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-subtle p-4"
    >
      <Field invalid={Boolean(error)}>
        <FieldLabel htmlFor="review-reply-body" required>
          {reviewsCopy.replyFormLabel}
        </FieldLabel>
        <Textarea
          id="review-reply-body"
          rows={4}
          maxLength={2000}
          value={body}
          disabled={pending}
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <FieldHint>{reviewsCopy.replyFormHint}</FieldHint>
        <FieldError>{error}</FieldError>
      </Field>

      {success ? (
        <p className="type-body-sm text-success" role="status">
          {success}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="min-h-11 self-start">
        {pending ? reviewsCopy.replySubmitting : reviewsCopy.replySubmit}
      </Button>
    </form>
  );
}
