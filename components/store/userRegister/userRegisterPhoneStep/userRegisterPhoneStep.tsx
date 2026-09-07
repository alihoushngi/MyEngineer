"use client";

import { CircleAlertIcon, PhoneIcon } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { type LoginPhoneData } from "@/lib/validation/login/login-phone.schema";

type UserRegisterPhoneStepProps = {
  form: UseFormReturn<LoginPhoneData>;
  authError: string | null;
  isBusy: boolean;
  onSubmit: (data: LoginPhoneData) => Promise<void>;
};

export function UserRegisterPhoneStep({
  form,
  authError,
  isBusy,
  onSubmit,
}: UserRegisterPhoneStepProps) {
  const phoneInvalid = Boolean(form.formState.errors.phone);

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.registerTitle}
    >
      <div className="flex items-start gap-3 rounded-2xl bg-primary-subtle/60 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <PhoneIcon aria-hidden="true" className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="type-body-sm font-semibold text-foreground">
            {userAuthCopy.phoneLabel}
          </p>
          <p className="mt-1 type-caption leading-relaxed text-foreground-muted">
            {userAuthCopy.registerDescription}
          </p>
        </div>
      </div>

      <Field invalid={phoneInvalid}>
        <FieldLabel htmlFor="user-register-phone" required>
          {userAuthCopy.phoneLabel}
        </FieldLabel>

        <div className="relative">
          <PhoneIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle motion-reduce:transform-none"
          />

          <Input
            id="user-register-phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            dir="ltr"
            disabled={isBusy}
            placeholder={userAuthCopy.phonePlaceholder}
            aria-invalid={phoneInvalid || undefined}
            className="ps-10 text-start ltr-data"
            {...form.register("phone")}
          />
        </div>

        <FieldError>{form.formState.errors.phone?.message}</FieldError>
      </Field>

      {authError ? (
        <Alert variant="danger" className="rounded-2xl">
          <CircleAlertIcon aria-hidden="true" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        loading={isBusy}
        disabled={isBusy}
      >
        {userAuthCopy.requestOtpLabel}
      </Button>
    </form>
  );
}
