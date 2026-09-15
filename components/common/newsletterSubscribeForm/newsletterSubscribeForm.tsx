"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { subscribeNewsletterAction } from "@/services/contact-service/contact-actions";

export function NewsletterSubscribeForm() {
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await subscribeNewsletterAction(contact);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setSuccess("عضویت شما در خبرنامه ثبت شد.");
      setContact("");
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <Field>
        <FieldLabel
          htmlFor="footer-newsletter"
          className="text-primary-deep-foreground"
        >
          خبرنامه
        </FieldLabel>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="footer-newsletter"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="ایمیل یا موبایل"
            disabled={pending}
            className="border-primary-deep-foreground/15 bg-primary-deep-foreground/5 text-primary-deep-foreground placeholder:text-primary-deep-foreground/40"
          />
          <Button
            type="submit"
            disabled={pending}
            className="min-h-11 shrink-0"
          >
            {pending ? "…" : "عضویت"}
          </Button>
        </div>
      </Field>
      {error ? (
        <FieldError className="text-danger-foreground">{error}</FieldError>
      ) : null}
      {success ? (
        <p className="type-caption text-primary" role="status">
          {success}
        </p>
      ) : null}
    </form>
  );
}
