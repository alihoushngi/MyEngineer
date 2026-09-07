"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type AuthPasswordLoginCopy } from "@/components/store/auth/authPasswordLoginForm/type/authPasswordLoginForm.types";
import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  loginPasswordSchema,
  type LoginPasswordData,
} from "@/lib/validation/login/login-password.schema";

type AuthPasswordLoginFormProps = {
  nextPath: string;
  copy: AuthPasswordLoginCopy;
  idPrefix: string;
  loginWithPassword: (phone: string, password: string) => Promise<void>;
};

export function AuthPasswordLoginForm({
  nextPath,
  copy,
  idPrefix,
  loginWithPassword,
}: AuthPasswordLoginFormProps) {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const mutation = useApiMutation(({ phone, password }: LoginPasswordData) =>
    loginWithPassword(phone, password),
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPasswordData>({
    resolver: yupResolver(loginPasswordSchema),
    defaultValues: { phone: "", password: "" },
  });

  async function onSubmit(formData: LoginPasswordData) {
    setAuthError(null);

    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      setAuthError(
        toUserErrorMessage(error, "شماره موبایل یا رمز عبور صحیح نیست."),
      );
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      aria-label={copy.passwordMethod}
    >
      <Field invalid={Boolean(errors.phone)}>
        <FieldLabel htmlFor={`${idPrefix}-password-phone`} required>
          {copy.phoneLabel}
        </FieldLabel>

        <Input
          id={`${idPrefix}-password-phone`}
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          dir="ltr"
          placeholder={copy.phonePlaceholder}
          aria-invalid={Boolean(errors.phone)}
          className="ltr-data"
          {...register("phone")}
        />

        <FieldError>{errors.phone?.message}</FieldError>
      </Field>

      <Field invalid={Boolean(errors.password) || Boolean(authError)}>
        <FieldLabel htmlFor={`${idPrefix}-password`} required>
          {copy.passwordLabel}
        </FieldLabel>

        <PasswordInput
          id={`${idPrefix}-password`}
          placeholder={copy.passwordPlaceholder}
          aria-invalid={Boolean(errors.password) || Boolean(authError)}
          {...register("password")}
        />

        <FieldError>{authError ?? errors.password?.message}</FieldError>
      </Field>

      <Button type="submit" className="w-full" loading={isBusy}>
        {copy.submitPassword}
      </Button>
    </form>
  );
}
