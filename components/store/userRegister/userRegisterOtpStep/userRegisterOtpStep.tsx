"use client";

import { ArrowRightIcon, KeyRoundIcon, RefreshCwIcon } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { OtpInput } from "@/components/ui/otpInput/otpInput";

import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type LoginOtpData } from "@/lib/validation/login/login-otp.schema";
import { LOGIN_OTP_LENGTH } from "@/lib/validation/login/login-otp-length";

type UserRegisterOtpStepProps = {
  form: UseFormReturn<LoginOtpData>;
  authError: string | null;
  isBusy: boolean;
  canResend: boolean;
  secondsLeft: number;
  isResending: boolean;
  onSubmit: (data: LoginOtpData) => Promise<void>;
  onEditPhone: () => void;
  onResend: () => void;
  onOtpChange: () => void;
};

export function UserRegisterOtpStep({
  form,
  authError,
  isBusy,
  canResend,
  secondsLeft,
  isResending,
  onSubmit,
  onEditPhone,
  onResend,
  onOtpChange,
}: UserRegisterOtpStepProps) {
  const invalid = Boolean(form.formState.errors.code) || Boolean(authError);

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.otpLabel}
    >
      <div className="flex items-start gap-3 rounded-2xl bg-primary-subtle/60 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <KeyRoundIcon aria-hidden="true" className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="type-body-sm font-semibold text-foreground">
            {userAuthCopy.otpLabel}
          </p>
          <p className="mt-1 type-caption leading-relaxed text-foreground-muted">
            {userAuthCopy.otpHelp}
          </p>
        </div>
      </div>

      <Field invalid={invalid}>
        <FieldLabel htmlFor="user-register-otp" required>
          {userAuthCopy.otpLabel}
        </FieldLabel>

        <div className="rounded-2xl border border-border-subtle bg-surface p-3">
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <OtpInput
                id="user-register-otp"
                length={LOGIN_OTP_LENGTH}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  onOtpChange();
                }}
                invalid={invalid}
                disabled={isBusy}
              />
            )}
          />
        </div>

        <FieldError>
          {authError ?? form.formState.errors.code?.message}
        </FieldError>
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy}
          icon={
            <ArrowRightIcon aria-hidden="true" className="ltr:rotate-180" />
          }
          onClick={onEditPhone}
        >
          {userAuthCopy.editPhoneLabel}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canResend || isBusy}
          loading={isResending}
          icon={canResend ? <RefreshCwIcon aria-hidden="true" /> : undefined}
          onClick={onResend}
        >
          {canResend
            ? userAuthCopy.resendLabel
            : `ارسال مجدد (${formatFaNumber(secondsLeft)} ثانیه)`}
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isBusy}
        disabled={isBusy}
      >
        {userAuthCopy.verifyLabel}
      </Button>
    </form>
  );
}
