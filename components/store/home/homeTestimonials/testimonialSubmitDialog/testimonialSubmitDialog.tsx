"use client";

import { useState, useTransition, type FormEvent } from "react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";

import { homeTestimonialCopy } from "@/config/home.config/home.config";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { uploadUserFile } from "@/lib/uploads/upload-user-file/upload-user-file";
import {
  photoUploadRule,
  validateUpload,
} from "@/lib/uploads/validate-upload/validate-upload";

import { submitTestimonialAction } from "@/services/content-service/content-actions";

type TestimonialSubmitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName?: string;
};

type FieldErrors = {
  jobTitle?: string;
  comment?: string;
  photo?: string;
};

export function TestimonialSubmitDialog({
  open,
  onOpenChange,
  defaultName = "",
}: TestimonialSubmitDialogProps) {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(defaultName);
  const [jobTitle, setJobTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);

    if (!next) {
      setError(null);
      setFieldErrors({});
      setSuccess(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const errors: FieldErrors = {};
    if (jobTitle.trim().length < 2) {
      errors.jobTitle = homeTestimonialCopy.jobTitleError;
    }
    if (comment.trim().length < 10) {
      errors.comment = homeTestimonialCopy.commentMinError;
    }
    if (photo) {
      const photoError = validateUpload(photo, photoUploadRule);
      if (photoError) {
        errors.photo = photoError;
      }
    }
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    startTransition(async () => {
      try {
        const photoUploadId = photo
          ? await uploadUserFile("testimonial", photo)
          : undefined;
        const result = await submitTestimonialAction({
          jobTitle,
          comment,
          name,
          photoUploadId,
        });

        if (!result.ok) {
          setFieldErrors({
            jobTitle: result.fieldErrors?.job_title,
            comment: result.fieldErrors?.comment,
          });
          setError(result.message);
          return;
        }

        setSuccess(homeTestimonialCopy.successText);
        setJobTitle("");
        setComment("");
        setPhoto(null);
      } catch (err: unknown) {
        setError(
          toUserErrorMessage(err, "ثبت نظر انجام نشد. دوباره تلاش کنید."),
        );
      }
    });
  }

  return (
    <ResponsiveDialog
      id="home-testimonial-dialog"
      open={open}
      onOpenChange={handleOpenChange}
      title={homeTestimonialCopy.dialogTitle}
      description={homeTestimonialCopy.dialogDescription}
      contentClassName="sm:max-w-md"
    >
      {success ? (
        <div className="flex flex-col gap-4 py-2">
          <p className="type-body text-success" role="status">
            {success}
          </p>
          <Button
            type="button"
            className="min-h-11 self-start"
            onClick={() => {
              handleOpenChange(false);
            }}
          >
            {homeTestimonialCopy.closeLabel}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-1">
          <Field>
            <FieldLabel htmlFor="testimonial-name">
              {homeTestimonialCopy.nameLabel}
            </FieldLabel>
            <Input
              id="testimonial-name"
              value={name}
              disabled={pending}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Field>

          <Field invalid={Boolean(fieldErrors.jobTitle)}>
            <FieldLabel htmlFor="testimonial-job" required>
              {homeTestimonialCopy.jobTitleLabel}
            </FieldLabel>
            <Input
              id="testimonial-job"
              value={jobTitle}
              maxLength={100}
              aria-invalid={Boolean(fieldErrors.jobTitle)}
              disabled={pending}
              onChange={(event) => {
                setJobTitle(event.target.value);
              }}
            />
            <FieldError>{fieldErrors.jobTitle}</FieldError>
          </Field>

          <Field invalid={Boolean(fieldErrors.comment)}>
            <FieldLabel htmlFor="testimonial-comment" required>
              {homeTestimonialCopy.commentLabel}
            </FieldLabel>
            <Textarea
              id="testimonial-comment"
              rows={5}
              maxLength={1000}
              value={comment}
              aria-invalid={Boolean(fieldErrors.comment)}
              disabled={pending}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <FieldError>{fieldErrors.comment}</FieldError>
          </Field>

          <Field invalid={Boolean(fieldErrors.photo)}>
            <FieldLabel htmlFor="testimonial-photo">
              {homeTestimonialCopy.photoLabel}
            </FieldLabel>
            <FileUpload
              id="testimonial-photo"
              accept=".jpg,.jpeg,.png,.webp"
              description={
                photo ? photo.name : homeTestimonialCopy.photoDescription
              }
              invalid={Boolean(fieldErrors.photo)}
              disabled={pending}
              onChange={(event) => {
                setPhoto(event.target.files?.[0] ?? null);
              }}
            />
            <FieldError>{fieldErrors.photo}</FieldError>
          </Field>

          {error ? <FieldError>{error}</FieldError> : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              disabled={pending}
              onClick={() => {
                handleOpenChange(false);
              }}
            >
              {homeTestimonialCopy.cancelLabel}
            </Button>
            <Button type="submit" className="min-h-11" disabled={pending}>
              {pending
                ? homeTestimonialCopy.submittingLabel
                : homeTestimonialCopy.submitLabel}
            </Button>
          </div>
        </form>
      )}
    </ResponsiveDialog>
  );
}
