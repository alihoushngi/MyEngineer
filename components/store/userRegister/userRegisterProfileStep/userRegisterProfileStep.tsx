"use client";

import {
  CircleAlertIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  UserRoundIcon,
} from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { type UserRegisterProfileData } from "@/lib/validation/user/user-register.schema";

type UserRegisterProfileStepProps = {
  form: UseFormReturn<UserRegisterProfileData>;
  authError: string | null;
  isBusy: boolean;
  onSubmit: (data: UserRegisterProfileData) => Promise<void>;
};

export function UserRegisterProfileStep({
  form,
  authError,
  isBusy,
  onSubmit,
}: UserRegisterProfileStepProps) {
  const nameInvalid = Boolean(form.formState.errors.displayName);
  const passwordInvalid = Boolean(form.formState.errors.password);

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.completeRegisterLabel}
    >
      <div className="flex items-start gap-3 rounded-2xl bg-success/10 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground">
          <ShieldCheckIcon aria-hidden="true" className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="type-body-sm font-semibold text-foreground">
            {userAuthCopy.completeRegisterLabel}
          </p>
          <p className="mt-1 type-caption leading-relaxed text-foreground-muted">
            {userAuthCopy.registerPasswordHelp}
          </p>
        </div>
      </div>

      <Field invalid={nameInvalid}>
        <FieldLabel htmlFor="user-register-name" required>
          {userAuthCopy.displayNameLabel}
        </FieldLabel>

        <div className="relative">
          <UserRoundIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle motion-reduce:transform-none"
          />

          <Input
            id="user-register-name"
            autoComplete="name"
            disabled={isBusy}
            placeholder={userAuthCopy.displayNamePlaceholder}
            aria-invalid={nameInvalid || undefined}
            className="ps-10"
            {...form.register("displayName")}
          />
        </div>

        <FieldError>{form.formState.errors.displayName?.message}</FieldError>
      </Field>

      <Field invalid={passwordInvalid}>
        <FieldLabel htmlFor="user-register-password" required>
          <span className="inline-flex items-center gap-2">
            <LockKeyholeIcon
              aria-hidden="true"
              className="size-4 text-primary"
            />
            {userAuthCopy.passwordLabel}
          </span>
        </FieldLabel>

        <PasswordInput
          id="user-register-password"
          autoComplete="new-password"
          disabled={isBusy}
          placeholder={userAuthCopy.passwordPlaceholder}
          aria-invalid={passwordInvalid || undefined}
          {...form.register("password")}
        />

        <p className="type-caption leading-relaxed text-foreground-muted">
          {userAuthCopy.registerPasswordHelp}
        </p>

        <FieldError>{form.formState.errors.password?.message}</FieldError>
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
        {userAuthCopy.completeRegisterLabel}
      </Button>
    </form>
  );
}
