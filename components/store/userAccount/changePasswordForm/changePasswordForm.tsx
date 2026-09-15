"use client";

import { useState, useTransition } from "react";

import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";

import { updatePasswordAction } from "@/services/profile-service/profile-actions";

export function ChangePasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 8 || password !== confirmation) {
      setError("رمز جدید باید حداقل ۸ نویسه باشد و با تکرار آن یکی باشد.");
      return;
    }

    startTransition(async () => {
      const result = await updatePasswordAction({
        current_password: currentPassword,
        password,
        password_confirmation: confirmation,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setSuccess("رمز عبور به‌روز شد.");
      setCurrentPassword("");
      setPassword("");
      setConfirmation("");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <h2 className="type-h4 text-foreground">تغییر رمز عبور</h2>

      <Field>
        <FieldLabel htmlFor="current-password">رمز فعلی</FieldLabel>
        <PasswordInput
          id="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          disabled={pending}
          autoComplete="current-password"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="new-password">رمز جدید</FieldLabel>
        <PasswordInput
          id="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={pending}
          autoComplete="new-password"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="confirm-password">تکرار رمز جدید</FieldLabel>
        <PasswordInput
          id="confirm-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          disabled={pending}
          autoComplete="new-password"
        />
      </Field>

      {error ? <FieldError>{error}</FieldError> : null}
      {success ? (
        <p className="type-body-sm text-success" role="status">
          {success}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="min-h-11 self-start">
        {pending ? "در حال ذخیره…" : "ذخیره رمز جدید"}
      </Button>
    </form>
  );
}
