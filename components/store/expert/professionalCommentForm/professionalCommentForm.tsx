"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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

import { storePaths } from "@/config/navigation.config/navigation.config";
import { submitProfessionalCommentAction } from "@/services/expert-service/expert-actions";

type ProfessionalCommentFormProps = {
  professionalId: string;
  isAuthenticated: boolean;
};

export function ProfessionalCommentForm({
  professionalId,
  isAuthenticated,
}: ProfessionalCommentFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("5");

  if (!isAuthenticated) {
    return (
      <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-subtle p-4">
        <p className="type-body-sm text-foreground-muted">
          برای ثبت دیدگاه وارد حساب کاربری شوید.
        </p>
        <Button asChild variant="outline" className="mt-3 min-h-11">
          <Link href={storePaths.login}>ورود</Link>
        </Button>
      </div>
    );
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await submitProfessionalCommentAction({
        professionalId,
        title,
        comment,
        rate: Number(rate),
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess("دیدگاه شما ثبت شد و پس از تأیید نمایش داده می‌شود.");
      setTitle("");
      setComment("");
      setRate("5");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-subtle p-4"
    >
      <h3 className="type-h4 text-foreground">ثبت دیدگاه</h3>

      <Field>
        <FieldLabel htmlFor="professional-comment-title" required>
          عنوان
        </FieldLabel>
        <Input
          id="professional-comment-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={pending}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="professional-comment-rate" required>
          امتیاز
        </FieldLabel>
        <Select value={rate} onValueChange={setRate} disabled={pending}>
          <SelectTrigger id="professional-comment-rate" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 4, 3, 2, 1].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="professional-comment-body" required>
          متن دیدگاه
        </FieldLabel>
        <Textarea
          id="professional-comment-body"
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
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
        {pending ? "در حال ارسال…" : "ارسال دیدگاه"}
      </Button>
    </form>
  );
}
