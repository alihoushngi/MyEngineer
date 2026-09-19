"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TicketIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { createTicketAction } from "@/services/ticket-service/ticket-actions";
import {
  priorityLabels,
  type TicketPriority,
} from "@/services/ticket-service/ticket-service";

type CreateTicketFormProps = {
  redirectBase?: string;
};

export function CreateTicketForm({
  redirectBase = "/account/support",
}: CreateTicketFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("mid");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (subject.trim().length < 3 || message.trim().length < 5) {
      setError("موضوع و متن پیام را کامل وارد کنید.");
      return;
    }

    startTransition(async () => {
      const result = await createTicketAction({
        subject: subject.trim(),
        message: message.trim(),
        priority,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      router.replace(
        result.roomId ? `${redirectBase}/${result.roomId}` : redirectBase,
      );
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <TicketIcon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="type-h4 text-foreground">تیکت جدید</h2>
          <p className="mt-1 type-caption text-foreground-muted">
            پیام شما برای پشتیبانی ثبت می‌شود.
          </p>
        </div>
      </div>

      <Field>
        <FieldLabel htmlFor="ticket-subject">موضوع</FieldLabel>
        <Input
          id="ticket-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="مثلاً مشکل در ورود"
          disabled={pending}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="ticket-priority">اولویت</FieldLabel>
        <Select
          value={priority}
          onValueChange={(value) => setPriority(value as TicketPriority)}
          disabled={pending}
        >
          <SelectTrigger id="ticket-priority" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(priorityLabels) as TicketPriority[]).map((key) => (
              <SelectItem key={key} value={key}>
                {priorityLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="ticket-message">پیام</FieldLabel>
        <Textarea
          id="ticket-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          placeholder="توضیح کامل موضوع را بنویسید…"
          disabled={pending}
        />
      </Field>

      {error ? <FieldError>{error}</FieldError> : null}

      <Button type="submit" disabled={pending} className="min-h-11">
        {pending ? "در حال ثبت…" : "ثبت تیکت"}
      </Button>
    </form>
  );
}
