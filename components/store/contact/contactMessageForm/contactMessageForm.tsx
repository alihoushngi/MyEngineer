"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";

import {
  validateContactMessage,
  type ContactFieldErrors,
} from "@/lib/validation/contact/contact-message";

import { sendContactMessageAction } from "@/services/contact-service/contact-actions";

export function ContactMessageForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const errors = validateContactMessage({
      name,
      family,
      mobile,
      email,
      subject,
      message,
    });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    startTransition(async () => {
      const result = await sendContactMessageAction({
        name: name.trim(),
        family: family.trim(),
        mobile: mobile.trim(),
        email: email.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess("پیام شما ثبت شد. به‌زودی پاسخ می‌دهیم.");
      setName("");
      setFamily("");
      setMobile("");
      setEmail("");
      setSubject("");
      setMessage("");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field invalid={Boolean(fieldErrors.name)}>
          <FieldLabel htmlFor="contact-name" required>
            نام
          </FieldLabel>
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            disabled={pending}
          />
          <FieldError>{fieldErrors.name}</FieldError>
        </Field>
        <Field invalid={Boolean(fieldErrors.family)}>
          <FieldLabel htmlFor="contact-family" required>
            نام خانوادگی
          </FieldLabel>
          <Input
            id="contact-family"
            value={family}
            onChange={(event) => setFamily(event.target.value)}
            aria-invalid={Boolean(fieldErrors.family)}
            disabled={pending}
          />
          <FieldError>{fieldErrors.family}</FieldError>
        </Field>
      </div>

      <Field invalid={Boolean(fieldErrors.mobile)}>
        <FieldLabel htmlFor="contact-mobile" required>
          موبایل
        </FieldLabel>
        <Input
          id="contact-mobile"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          placeholder="09xxxxxxxxx"
          aria-invalid={Boolean(fieldErrors.mobile)}
          disabled={pending}
          dir="ltr"
          className="ltr-data"
        />
        <FieldError>{fieldErrors.mobile}</FieldError>
      </Field>

      <Field invalid={Boolean(fieldErrors.email)}>
        <FieldLabel htmlFor="contact-email">ایمیل (اختیاری)</FieldLabel>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          disabled={pending}
          dir="ltr"
          className="ltr-data"
        />
        <FieldError>{fieldErrors.email}</FieldError>
      </Field>

      <Field invalid={Boolean(fieldErrors.subject)}>
        <FieldLabel htmlFor="contact-subject" required>
          موضوع
        </FieldLabel>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          aria-invalid={Boolean(fieldErrors.subject)}
          disabled={pending}
        />
        <FieldError>{fieldErrors.subject}</FieldError>
      </Field>

      <Field invalid={Boolean(fieldErrors.message)}>
        <FieldLabel htmlFor="contact-message" required>
          پیام
        </FieldLabel>
        <Textarea
          id="contact-message"
          rows={5}
          maxLength={200}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          disabled={pending}
        />
        <FieldError>{fieldErrors.message}</FieldError>
      </Field>

      {error ? <FieldError>{error}</FieldError> : null}
      {success ? (
        <p className="type-body-sm text-success" role="status">
          {success}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="min-h-11 self-start">
        {pending ? "در حال ارسال…" : "ارسال پیام"}
      </Button>
    </form>
  );
}
