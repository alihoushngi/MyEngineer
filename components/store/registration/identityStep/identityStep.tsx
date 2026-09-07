"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  identityStepSchema,
  type IdentityStepData,
} from "@/components/store/registration/identityStep/type/identityStep.types";
import { RegistrationLoginCrossLink } from "@/components/store/registration/registrationLoginCrossLink/registrationLoginCrossLink";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { sendOtp } from "@/services/registration-service/registration-service";

export function IdentityStep() {
  const router = useRouter();
  const { commitIdentity, data } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const sendOtpMutation = useApiMutation(sendOtp);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IdentityStepData>({
    resolver: yupResolver(identityStepSchema),
    defaultValues: {
      phone: data.identity?.phone ?? "",
      nationalId: data.identity?.nationalId ?? "",
      termsAccepted: undefined,
    },
  });

  async function onSubmit(formData: IdentityStepData) {
    setApiError(null);

    try {
      await sendOtpMutation.mutateAsync({
        phone: formData.phone,
        nationalId: formData.nationalId,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitIdentity({
      phone: formData.phone,
      nationalId: formData.nationalId,
    });
    router.push("/expert-registration/otp");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step1Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step1Description}
        </p>
        <RegistrationLoginCrossLink />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step1Title}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field invalid={Boolean(errors.phone)}>
            <FieldLabel htmlFor="reg-phone" required>
              {registrationCopy.mobileLabel}
            </FieldLabel>
            <Input
              id="reg-phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="tel"
              placeholder={registrationCopy.mobilePlaceholder}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "reg-phone-error" : "reg-phone-help"
              }
              {...register("phone")}
            />
            <FieldDescription id="reg-phone-help">
              {registrationCopy.mobileHelp}
            </FieldDescription>
            <FieldError id="reg-phone-error">
              {errors.phone?.message}
            </FieldError>
          </Field>

          <Field invalid={Boolean(errors.nationalId)}>
            <FieldLabel htmlFor="reg-national-id" required>
              {registrationCopy.nationalIdLabel}
            </FieldLabel>
            <Input
              id="reg-national-id"
              dir="ltr"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              placeholder={registrationCopy.nationalIdPlaceholder}
              aria-invalid={Boolean(errors.nationalId)}
              aria-describedby={
                errors.nationalId ? "reg-national-id-error" : undefined
              }
              {...register("nationalId")}
            />
            <FieldError id="reg-national-id-error">
              {errors.nationalId?.message}
            </FieldError>
          </Field>
        </div>

        <Field invalid={Boolean(errors.termsAccepted)}>
          <div className="flex items-start gap-3">
            <Controller
              control={control}
              name="termsAccepted"
              render={({ field }) => (
                <Checkbox
                  id="reg-terms"
                  checked={field.value === true}
                  onCheckedChange={(checked) => {
                    field.onChange(checked === true ? true : undefined);
                  }}
                  aria-invalid={Boolean(errors.termsAccepted)}
                  aria-describedby={
                    errors.termsAccepted ? "reg-terms-error" : undefined
                  }
                  className="mt-0.5 shrink-0"
                />
              )}
            />
            <label
              htmlFor="reg-terms"
              className="type-body-sm cursor-pointer text-foreground"
            >
              {/*
               * Implementation note: legacy had no checkbox (terms implied by form fill).
               * BUSINESS DECISION REQUIRED for exact wording.
               * Checkbox is implemented as required based on COMPONENT-ARCHITECTURE.md §9.1.
               */}
              <Link
                href={storePaths.terms}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {registrationCopy.termsLink}
              </Link>{" "}
              و{" "}
              <Link
                href={storePaths.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {registrationCopy.privacyLink}
              </Link>{" "}
              را خواندم و می‌پذیرم
            </label>
          </div>
          <FieldError id="reg-terms-error">
            {errors.termsAccepted?.message}
          </FieldError>
        </Field>

        {apiError ? (
          <RegistrationError
            message={apiError}
            onRetry={() => {
              void handleSubmit(onSubmit)();
            }}
          />
        ) : null}

        <RegistrationStepNav
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || sendOtpMutation.isPending}
          isContinueDisabled={isSubmitting || sendOtpMutation.isPending}
        />
      </form>
    </div>
  );
}
