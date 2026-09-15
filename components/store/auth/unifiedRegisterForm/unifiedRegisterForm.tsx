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
  registerAction,
  requestOtpAction,
  verifyOtpAction,
  type AuthActionResult,
} from "@/services/auth-service/auth-actions";
import {
  registerAccountSchema,
  type RegisterAccountData,
} from "@/lib/validation/auth/auth.schema";

type Step = "form" | "otp";

export function UnifiedRegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [mobile, setMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<RegisterAccountData>({
    resolver: yupResolver(registerAccountSchema),
    defaultValues: {
      name: "",
      family: "",
      mobile: "",
      melli: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onRegister(values: RegisterAccountData) {
    setError(null);
    setPending(true);
    try {
      const result = await registerAction({
        ...values,
        email: values.email || undefined,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMobile(result.mobile);
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
        mobile,
        purpose: "account_activation",
        code: otpCode,
        audience: "user",
        nextPath: storePaths.account,
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      if ("passwordResetReady" in result) {
        return;
      }
      const authResult = result as AuthActionResult;
      if (authResult.ok && "redirectTo" in authResult) {
        router.replace(authResult.redirectTo);
        router.refresh();
      }
      if (
        authResult.ok &&
        "requiresRoleSelection" in authResult &&
        authResult.requiresRoleSelection
      ) {
        router.replace(storePaths.login);
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  async function onResend() {
    setError(null);
    setPending(true);
    try {
      const result = await requestOtpAction({
        mobile,
        purpose: "account_activation",
      });
      if (!result.ok) {
        setError(result.message);
      }
    } finally {
      setPending(false);
    }
  }

  if (step === "otp") {
    return (
      <AuthLoginCard
        title="فعال‌سازی حساب"
        description={`کد پیامک‌شده به ${mobile} را وارد کنید.`}
        isMockMode={false}
      >
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
            تأیید و ورود
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={pending}
            onClick={() => void onResend()}
          >
            ارسال مجدد کد
          </Button>
        </div>
      </AuthLoginCard>
    );
  }

  return (
    <AuthLoginCard
      title="ثبت‌نام کاربر"
      description="این مسیر فقط برای حساب کاربری عادی است. متخصصان از ثبت‌نام مهندس استفاده کنند."
      isMockMode={false}
      footer={
        <div className="space-y-3 text-center type-body-sm text-foreground-muted">
          <p>
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link
              href={storePaths.login}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              وارد شوید
            </Link>
          </p>
          <p>
            متخصص هستید؟{" "}
            <Link
              href={storePaths.expertRegistration}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              ثبت‌نام مهندس
            </Link>
          </p>
        </div>
      }
    >
      <form
        className="space-y-4"
        noValidate
        onSubmit={form.handleSubmit(onRegister)}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field invalid={Boolean(form.formState.errors.name)}>
            <FieldLabel htmlFor="reg-name" required>
              نام
            </FieldLabel>
            <Input id="reg-name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>
          <Field invalid={Boolean(form.formState.errors.family)}>
            <FieldLabel htmlFor="reg-family" required>
              نام خانوادگی
            </FieldLabel>
            <Input id="reg-family" {...form.register("family")} />
            <FieldError>{form.formState.errors.family?.message}</FieldError>
          </Field>
        </div>

        <Field invalid={Boolean(form.formState.errors.mobile)}>
          <FieldLabel htmlFor="reg-mobile" required>
            موبایل
          </FieldLabel>
          <Input
            id="reg-mobile"
            dir="ltr"
            inputMode="tel"
            placeholder="09xxxxxxxxx"
            {...form.register("mobile")}
          />
          <FieldError>{form.formState.errors.mobile?.message}</FieldError>
        </Field>

        <Field invalid={Boolean(form.formState.errors.melli)}>
          <FieldLabel htmlFor="reg-melli" required>
            کد ملی
          </FieldLabel>
          <Input
            id="reg-melli"
            dir="ltr"
            inputMode="numeric"
            maxLength={10}
            {...form.register("melli")}
          />
          <FieldError>{form.formState.errors.melli?.message}</FieldError>
        </Field>

        <Field invalid={Boolean(form.formState.errors.email)}>
          <FieldLabel htmlFor="reg-email">ایمیل (اختیاری)</FieldLabel>
          <Input id="reg-email" type="email" dir="ltr" {...form.register("email")} />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field invalid={Boolean(form.formState.errors.password)}>
          <FieldLabel htmlFor="reg-password" required>
            رمز عبور
          </FieldLabel>
          <PasswordInput
            id="reg-password"
            autoComplete="new-password"
            {...form.register("password")}
          />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>

        <Field invalid={Boolean(form.formState.errors.password_confirmation)}>
          <FieldLabel htmlFor="reg-password-2" required>
            تکرار رمز عبور
          </FieldLabel>
          <PasswordInput
            id="reg-password-2"
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
          ادامه و دریافت کد
        </Button>
      </form>
    </AuthLoginCard>
  );
}
