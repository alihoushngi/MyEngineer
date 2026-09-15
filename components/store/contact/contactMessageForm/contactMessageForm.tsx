"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";

import { sendContactMessageAction } from "@/services/contact-service/contact-actions";

export function ContactMessageForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      name.trim().length < 2 ||
      !/^09\d{9}$/.test(mobile.trim()) ||
      subject.trim().length < 3 ||
      message.trim().length < 5
    ) {
      setError("لطفاً همه فیلدهای ضروری را به‌درستی پر کنید.");
      return;
    }

    startTransition(async () => {
      const result = await sendContactMessageAction({
        name: name.trim(),
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
      setMobile("");
      setEmail("");
      setSubject("");
      setMessage("");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="contact-name">نام</FieldLabel>
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={pending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-mobile">موبایل</FieldLabel>
          <Input
            id="contact-mobile"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            placeholder="09xxxxxxxxx"
            disabled={pending}
            dir="ltr"
            className="ltr-data"
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="contact-email">ایمیل (اختیاری)</FieldLabel>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={pending}
          dir="ltr"
          className="ltr-data"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="contact-subject">موضوع</FieldLabel>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          disabled={pending}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="contact-message">پیام</FieldLabel>
        <Textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={pending}
        />
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
