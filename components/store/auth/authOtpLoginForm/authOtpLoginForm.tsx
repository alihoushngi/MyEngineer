"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRightIcon, RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { type AuthOtpLoginCopy } from "@/components/store/auth/authOtpLoginForm/type/authOtpLoginForm.types";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { OtpInput } from "@/components/ui/otpInput/otpInput";

import { OTP_RESEND_COOLDOWN_SECONDS } from "@/config/registration.config/registration.config";

import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  loginOtpSchema,
  type LoginOtpData,
} from "@/lib/validation/login/login-otp.schema";
import { LOGIN_OTP_LENGTH } from "@/lib/validation/login/login-otp-length";
import {
  loginPhoneSchema,
  type LoginPhoneData,
} from "@/lib/validation/login/login-phone.schema";

type AuthOtpLoginFormProps = {
  nextPath: string;
  copy: AuthOtpLoginCopy;
  idPrefix: string;
  requestOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
};

export function AuthOtpLoginForm({
  nextPath,
  copy,
  idPrefix,
  requestOtp,
  verifyOtp,
}: AuthOtpLoginFormProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const requestMutation = useApiMutation(requestOtp);
  const verifyMutation = useApiMutation(({ otp }: { otp: string }) =>
    verifyOtp(phone, otp),
  );

  const { secondsLeft, canResend, restartTimer } = useOtpTimer(
    OTP_RESEND_COOLDOWN_SECONDS,
  );

  const phoneForm = useForm<LoginPhoneData>({
    resolver: yupResolver(loginPhoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<LoginOtpData>({
    resolver: yupResolver(loginOtpSchema),
    defaultValues: { code: "" },
  });

  async function onRequestOtp(formData: LoginPhoneData) {
    setAuthError(null);

    try {
      await requestMutation.mutateAsync(formData.phone);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, copy.otpHelp));
      return;
    }

    setPhone(formData.phone);
    setPhase("otp");
    otpForm.reset({ code: "" });
    restartTimer();
  }

  async function onVerify(formData: LoginOtpData) {
    setAuthError(null);

    try {
      await verifyMutation.mutateAsync({ otp: formData.code });
    } catch (error) {
      setAuthError(toUserErrorMessage(error, "کد واردشده صحیح نیست."));
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  async function onResend() {
    if (!canResend || phone === "") {
      return;
    }

    setAuthError(null);

    try {
      await requestMutation.mutateAsync(phone);
      otpForm.reset({ code: "" });
      restartTimer();
    } catch (error) {
      setAuthError(toUserErrorMessage(error, copy.otpHelp));
    }
  }

  const isBusy =
    phoneForm.formState.isSubmitting ||
    otpForm.formState.isSubmitting ||
    requestMutation.isPending ||
    verifyMutation.isPending;

  if (phase === "phone") {
    return (
      <form
        noValidate
        className="space-y-5"
        onSubmit={phoneForm.handleSubmit(onRequestOtp)}
        aria-label={copy.otpMethod}
      >
        <Field invalid={Boolean(phoneForm.formState.errors.phone)}>
          <FieldLabel htmlFor={`${idPrefix}-otp-phone`} required>
            {copy.phoneLabel}
          </FieldLabel>

          <Input
            id={`${idPrefix}-otp-phone`}
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            dir="ltr"
            placeholder={copy.phonePlaceholder}
            aria-invalid={Boolean(phoneForm.formState.errors.phone)}
            className="ltr-data"
            {...phoneForm.register("phone")}
          />

          <FieldError>{phoneForm.formState.errors.phone?.message}</FieldError>
        </Field>

        {authError ? (
          <p
            className="rounded-xl bg-danger/10 px-3 py-2 type-body-sm text-danger"
            role="alert"
          >
            {authError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" loading={isBusy}>
          {copy.requestOtpLabel}
        </Button>
      </form>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={otpForm.handleSubmit(onVerify)}
      aria-label={copy.otpMethod}
    >
      <Field
        invalid={Boolean(otpForm.formState.errors.code) || Boolean(authError)}
      >
        <FieldLabel htmlFor={`${idPrefix}-otp-code`}>
          {copy.otpLabel}
        </FieldLabel>

        <Controller
          control={otpForm.control}
          name="code"
          render={({ field }) => (
            <OtpInput
              id={`${idPrefix}-otp-code`}
              length={LOGIN_OTP_LENGTH}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setAuthError(null);
              }}
              invalid={
                Boolean(otpForm.formState.errors.code) || Boolean(authError)
              }
              disabled={isBusy}
            />
          )}
        />

        <p className="type-caption leading-relaxed text-foreground-muted">
          {copy.otpHelp}
        </p>

        <FieldError>
          {authError ?? otpForm.formState.errors.code?.message}
        </FieldError>
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy}
          className="gap-2"
          onClick={() => {
            setPhase("phone");
            setAuthError(null);
          }}
        >
          <ArrowRightIcon aria-hidden="true" className="size-4" />
          {copy.editPhoneLabel}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canResend || isBusy}
          loading={requestMutation.isPending}
          className="gap-2"
          onClick={() => {
            void onResend();
          }}
        >
          <RefreshCwIcon aria-hidden="true" className="size-4" />
          {canResend ? copy.resendLabel : `ارسال مجدد (${secondsLeft} ثانیه)`}
        </Button>
      </div>

      <Button type="submit" className="w-full" loading={isBusy}>
        {copy.verifyLabel}
      </Button>
    </form>
  );
}
