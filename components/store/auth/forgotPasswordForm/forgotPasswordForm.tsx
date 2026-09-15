"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { OtpInput } from "@/components/ui/otpInput/otpInput";

import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  requestOtpAction,
  resetPasswordAction,
  verifyOtpAction,
} from "@/services/auth-service/auth-actions";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/lib/validation/auth/auth.schema";

type Step = "mobile" | "otp" | "password";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  async function onRequest() {
    setError(null);
    if (!/^09\d{9}$/.test(mobile.trim())) {
      setError("شماره موبایل معتبر وارد کنید.");
      return;
    }
    setPending(true);
    try {
      const result = await requestOtpAction({
        mobile: mobile.trim(),
        purpose: "password_reset",
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setStep("otp");
    } finally {
      setPending(false);
    }
  }

  async function onVerify() {
    setError(null);
    setPending(true);
    try {
      const result = await verifyOtpAction({
        mobile: mobile.trim(),
        purpose: "password_reset",
        code: otpCode,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      if ("passwordResetReady" in result && result.passwordResetReady) {
        setStep("password");
      }
    } finally {
      setPending(false);
    }
  }

  async function onReset(values: ResetPasswordData) {
    setError(null);
    setPending(true);
    try {
      const result = await resetPasswordAction(values);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.replace(result.redirectTo);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLoginCard
      title="بازیابی رمز عبور"
      description="با موبایل ثبت‌شده کد بگیرید و رمز جدید تعیین کنید."
      isMockMode={false}
      footer={
        <p className="text-center type-body-sm text-foreground-muted">
          <Link
            href={storePaths.login}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            بازگشت به ورود
          </Link>
        </p>
      }
    >
      {step === "mobile" ? (
        <div className="space-y-5">
          <Field>
            <FieldLabel htmlFor="fp-mobile" required>
              موبایل
            </FieldLabel>
            <Input
              id="fp-mobile"
              dir="ltr"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="09xxxxxxxxx"
            />
          </Field>
          {error ? (
            <p className="type-caption text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="button"
            className="w-full"
            disabled={pending}
            onClick={() => void onRequest()}
          >
            دریافت کد
          </Button>
        </div>
      ) : null}

      {step === "otp" ? (
        <div className="space-y-5">
          <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
          {error ? (
            <p className="type-caption text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="button"
            className="w-full"
            disabled={pending || otpCode.length < 6}
            onClick={() => void onVerify()}
          >
            تأیید کد
          </Button>
        </div>
      ) : null}

      {step === "password" ? (
        <form
          className="space-y-5"
          noValidate
          onSubmit={form.handleSubmit(onReset)}
        >
          <Field invalid={Boolean(form.formState.errors.password)}>
            <FieldLabel htmlFor="fp-password" required>
              رمز جدید
            </FieldLabel>
            <PasswordInput
              id="fp-password"
              autoComplete="new-password"
              {...form.register("password")}
            />
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>
          <Field invalid={Boolean(form.formState.errors.password_confirmation)}>
            <FieldLabel htmlFor="fp-password-2" required>
              تکرار رمز جدید
            </FieldLabel>
            <PasswordInput
              id="fp-password-2"
              autoComplete="new-password"
              {...form.register("password_confirmation")}
            />
            <FieldError>
              {form.formState.errors.password_confirmation?.message}
            </FieldError>
          </Field>
          {error ? (
            <p className="type-caption text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            ذخیره رمز جدید
          </Button>
        </form>
      ) : null}
    </AuthLoginCard>
  );
}
