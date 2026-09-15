"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { AuthLoginMethods } from "@/components/store/auth/authLoginMethods/authLoginMethods";
import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { OtpInput } from "@/components/ui/otpInput/otpInput";

import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { userAuthCopy, userAuthPaths } from "@/config/user-auth.config/user-auth.config";
import {
  melliLoginSchema,
  type MelliLoginData,
} from "@/lib/validation/auth/auth.schema";
import {
  loginWithMelliAction,
  requestOtpAction,
  selectRoleAction,
  verifyOtpAction,
  type AuthActionResult,
  type AuthAudience,
} from "@/services/auth-service/auth-actions";
import { type BackendRole } from "@/services/auth-api-service/auth-api-service";

type UnifiedLoginFormProps = {
  audience: AuthAudience;
  nextPath: string;
  title: string;
  description: string;
};

export function UnifiedLoginForm({
  audience,
  nextPath,
  title,
  description,
}: UnifiedLoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "otp" | "roles">("password");
  const [roles, setRoles] = useState<readonly BackendRole[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);
  const [otpMobile, setOtpMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<MelliLoginData>({
    resolver: yupResolver(melliLoginSchema),
    defaultValues: { melli: "", password: "" },
  });

  const registerHref =
    audience === "engineer"
      ? storePaths.expertRegistration
      : storePaths.register;
  const registerLabel =
    audience === "engineer"
      ? engineerLoginCopy.registerAction
      : userAuthCopy.registerAction;
  const registerPrefix =
    audience === "engineer"
      ? engineerLoginCopy.registerPrefix
      : userAuthCopy.registerPrefix;
  const otherEntryHref =
    audience === "engineer" ? storePaths.login : storePaths.engineerLogin;
  const otherEntryLabel =
    audience === "engineer"
      ? "ورود کاربر عادی"
      : userAuthCopy.engineerLoginAction;
  const otherEntryPrefix =
    audience === "engineer"
      ? "کاربر عادی هستید؟"
      : userAuthCopy.engineerEntryPrefix;

  async function handleAuthResult(result: AuthActionResult) {
    if (!result.ok) {
      setAuthError(result.message);
      return;
    }

    if ("requiresRoleSelection" in result && result.requiresRoleSelection) {
      setRoles(result.roles);
      setMode("roles");
      return;
    }

    if ("redirectTo" in result) {
      router.replace(result.redirectTo || nextPath);
      router.refresh();
    }
  }

  async function onPasswordSubmit(values: MelliLoginData) {
    setAuthError(null);
    setPending(true);
    try {
      const result = await loginWithMelliAction({
        melli: values.melli,
        password: values.password,
        audience,
        nextPath,
      });
      await handleAuthResult(result);
    } finally {
      setPending(false);
    }
  }

  async function onRequestOtp() {
    setAuthError(null);
    if (!/^09\d{9}$/.test(otpMobile.trim())) {
      setAuthError("شماره موبایل معتبر وارد کنید.");
      return;
    }
    setPending(true);
    try {
      const result = await requestOtpAction({
        mobile: otpMobile.trim(),
        purpose: "login",
      });
      if (!result.ok) {
        setAuthError(result.message);
        return;
      }
      setOtpSent(true);
    } finally {
      setPending(false);
    }
  }

  async function onVerifyOtp() {
    setAuthError(null);
    setPending(true);
    try {
      const result = await verifyOtpAction({
        mobile: otpMobile.trim(),
        purpose: "login",
        code: otpCode,
        audience,
        nextPath,
      });
      if (!result.ok) {
        setAuthError(result.message);
        return;
      }
      if ("passwordResetReady" in result) {
        return;
      }
      await handleAuthResult(result);
    } finally {
      setPending(false);
    }
  }

  async function onSelectRole(role: string) {
    setAuthError(null);
    setPending(true);
    try {
      const result = await selectRoleAction({ role, audience, nextPath });
      await handleAuthResult(result);
    } finally {
      setPending(false);
    }
  }

  if (mode === "roles") {
    return (
      <AuthLoginCard
        title="انتخاب نقش"
        description={
          audience === "engineer"
            ? "نقش تخصصی موردنظر برای ورود به پنل را انتخاب کنید."
            : "نقش کاربری موردنظر برای ورود به حساب را انتخاب کنید."
        }
        isMockMode={false}
      >
        <ul className="space-y-3">
          {roles.map((role) => (
            <li key={role.name}>
              <Button
                type="button"
                className="h-12 w-full justify-start"
                variant="outline"
                disabled={pending}
                onClick={() => void onSelectRole(role.name)}
              >
                {role.title || role.name}
              </Button>
            </li>
          ))}
        </ul>
        {authError ? (
          <p className="mt-4 type-caption text-destructive" role="alert">
            {authError}
          </p>
        ) : null}
      </AuthLoginCard>
    );
  }

  return (
    <AuthLoginCard
      title={title}
      description={description}
      isMockMode={false}
      footer={
        <div className="space-y-3 text-center type-body-sm text-foreground-muted">
          <p>
            {registerPrefix}{" "}
            <Link
              href={registerHref}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {registerLabel}
            </Link>
          </p>
          <p>
            {otherEntryPrefix}{" "}
            <Link
              href={otherEntryHref}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {otherEntryLabel}
            </Link>
          </p>
          <p>
            <Link
              href={userAuthPaths.forgotPassword}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              بازیابی رمز عبور
            </Link>
          </p>
        </div>
      }
    >
      <AuthLoginMethods
        otpLabel={userAuthCopy.otpMethod}
        passwordLabel="ورود با کد ملی"
        password={
          <form
            className="space-y-5"
            noValidate
            onSubmit={form.handleSubmit(onPasswordSubmit)}
          >
            <Field invalid={Boolean(form.formState.errors.melli)}>
              <FieldLabel htmlFor="login-melli" required>
                کد ملی
              </FieldLabel>
              <Input
                id="login-melli"
                inputMode="numeric"
                autoComplete="username"
                dir="ltr"
                maxLength={10}
                placeholder="0012345678"
                {...form.register("melli")}
              />
              <FieldError>{form.formState.errors.melli?.message}</FieldError>
            </Field>

            <Field invalid={Boolean(form.formState.errors.password)}>
              <FieldLabel htmlFor="login-password" required>
                رمز عبور
              </FieldLabel>
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                {...form.register("password")}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>

            {authError ? (
              <p className="type-caption text-destructive" role="alert">
                {authError}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={pending}>
              ورود
            </Button>
          </form>
        }
        otp={
          <div className="space-y-5">
            <Field>
              <FieldLabel htmlFor="login-otp-mobile" required>
                شماره موبایل
              </FieldLabel>
              <Input
                id="login-otp-mobile"
                inputMode="tel"
                dir="ltr"
                placeholder="09xxxxxxxxx"
                value={otpMobile}
                onChange={(event) => setOtpMobile(event.target.value)}
              />
            </Field>

            {otpSent ? (
              <Field>
                <FieldLabel required>کد تأیید</FieldLabel>
                <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
              </Field>
            ) : null}

            {authError ? (
              <p className="type-caption text-destructive" role="alert">
                {authError}
              </p>
            ) : null}

            {!otpSent ? (
              <Button
                type="button"
                className="w-full"
                disabled={pending}
                onClick={() => void onRequestOtp()}
              >
                دریافت کد
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full"
                disabled={pending || otpCode.length < 6}
                onClick={() => void onVerifyOtp()}
              >
                تأیید و ورود
              </Button>
            )}
          </div>
        }
      />
    </AuthLoginCard>
  );
}
