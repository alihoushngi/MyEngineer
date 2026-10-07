"use client";

import { useState, useTransition, type FormEvent } from "react";
import { CircleHelpIcon } from "lucide-react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";

import { faqCopy } from "@/config/faq.config/faq.config";

import { submitFaqQuestionAction } from "@/services/faq-service/faq-actions";

type FieldErrors = { question?: string; mobile?: string };

export function FaqAskDialog() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleOpenChange(next: boolean) {
    setOpen(next);

    if (!next) {
      setSuccess(null);
      setError(null);
      setFieldErrors({});
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const errors: FieldErrors = {};
    if (question.trim().length < 10) {
      errors.question = faqCopy.askQuestionTooShort;
    }
    if (mobile.trim() !== "" && !/^09\d{9}$/.test(mobile.trim())) {
      errors.mobile = faqCopy.askMobileInvalid;
    }
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    startTransition(async () => {
      const result = await submitFaqQuestionAction({
        question,
        name,
        mobile,
      });

      if (!result.ok) {
        setFieldErrors({
          question: result.fieldErrors?.question,
          mobile: result.fieldErrors?.mobile,
        });
        setError(result.message);
        return;
      }

      setSuccess(result.message ?? faqCopy.askSuccessFallback);
      setQuestion("");
      setName("");
      setMobile("");
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="min-h-11 self-start"
        icon={<CircleHelpIcon aria-hidden="true" />}
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
        }}
      >
        {faqCopy.askButtonLabel}
      </Button>

      <ResponsiveDialog
        id="faq-ask-dialog"
        open={open}
        onOpenChange={handleOpenChange}
        title={faqCopy.askDialogTitle}
        description={faqCopy.askDialogDescription}
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
              {faqCopy.askCloseLabel}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-1">
            <Field invalid={Boolean(fieldErrors.question)}>
              <FieldLabel htmlFor="faq-ask-question" required>
                {faqCopy.askQuestionLabel}
              </FieldLabel>
              <Textarea
                id="faq-ask-question"
                rows={5}
                maxLength={1000}
                value={question}
                placeholder={faqCopy.askQuestionPlaceholder}
                aria-invalid={Boolean(fieldErrors.question)}
                disabled={pending}
                onChange={(event) => {
                  setQuestion(event.target.value);
                }}
              />
              <FieldError>{fieldErrors.question}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="faq-ask-name">
                {faqCopy.askNameLabel}
              </FieldLabel>
              <Input
                id="faq-ask-name"
                value={name}
                disabled={pending}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Field>

            <Field invalid={Boolean(fieldErrors.mobile)}>
              <FieldLabel htmlFor="faq-ask-mobile">
                {faqCopy.askMobileLabel}
              </FieldLabel>
              <Input
                id="faq-ask-mobile"
                type="tel"
                value={mobile}
                placeholder="09xxxxxxxxx"
                aria-invalid={Boolean(fieldErrors.mobile)}
                disabled={pending}
                className="ltr-data"
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
              />
              <FieldError>{fieldErrors.mobile}</FieldError>
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
                {faqCopy.askCancelLabel}
              </Button>
              <Button type="submit" className="min-h-11" disabled={pending}>
                {pending ? faqCopy.askSubmittingLabel : faqCopy.askSubmitLabel}
              </Button>
            </div>
          </form>
        )}
      </ResponsiveDialog>
    </>
  );
}
