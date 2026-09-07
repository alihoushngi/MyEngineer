"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { OtpInput } from "@/components/ui/otpInput/otpInput";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  otpStepSchema,
  type OtpStepData,
} from "@/components/store/registration/otpStep/type/otpStep.types";
import {
  OTP_LENGTH,
  registrationCopy,
} from "@/config/registration.config/registration.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import {
  sendOtp,
  verifyOtp,
} from "@/services/registration-service/registration-service";

export function OtpStep() {
  const router = useRouter();
  const { data, commitOtpVerified } = useRegistrationWizard();
  const { secondsLeft, canResend, restartTimer } = useOtpTimer();
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const verifyMutation = useApiMutation(verifyOtp);
  const resendMutation = useApiMutation(sendOtp);

  const phone = data.identity?.phone;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OtpStepData>({
    resolver: yupResolver(otpStepSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit(formData: OtpStepData) {
    if (!phone) return;
    setVerifyError(null);

    try {
      await verifyMutation.mutateAsync({ phone, code: formData.code });
    } catch (err) {
      setVerifyError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitOtpVerified();
    router.push("/expert-registration/service-area");
  }

  async function handleResend() {
    if (!phone || !canResend) return;
    setResendError(null);

    try {
      await resendMutation.mutateAsync({
        phone,
        nationalId: data.identity?.nationalId ?? "",
      });
      restartTimer();
      reset();
      setVerifyError(null);
    } catch (err) {
      setResendError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
    }
  }

  function handleEditPhone() {
    router.push("/expert-registration");
  }

  const isBusy =
    isSubmitting || verifyMutation.isPending || resendMutation.isPending;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step2Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {phone
            ? registrationCopy.step2Description(phone)
            : registrationCopy.step2Description("—")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step2Title}
      >
        <Field invalid={Boolean(errors.code) || Boolean(verifyError)}>
          <FieldLabel htmlFor="reg-otp">{registrationCopy.otpLabel}</FieldLabel>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <OtpInput
                id="reg-otp"
                length={OTP_LENGTH}
                value={field.value}
                onChange={field.onChange}
                invalid={Boolean(errors.code) || Boolean(verifyError)}
                disabled={isBusy}
                aria-describedby={
                  verifyError || errors.code ? "reg-otp-error" : undefined
                }
              />
            )}
          />
          <FieldError id="reg-otp-error">
            {verifyError ?? errors.code?.message}
          </FieldError>
        </Field>

        {resendError ? (
          <RegistrationError
            message={resendError}
            onRetry={() => {
              void handleResend();
            }}
          />
        ) : null}

        <p className="sr-only" aria-live="polite">
          {canResend ? registrationCopy.resendLabel : null}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleEditPhone}
            disabled={isBusy}
          >
            {registrationCopy.editPhoneLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              void handleResend();
            }}
            disabled={!canResend || isBusy}
            loading={resendMutation.isPending}
          >
            {canResend
              ? registrationCopy.resendLabel
              : registrationCopy.resendCooldown(secondsLeft)}
          </Button>
        </div>

        <RegistrationStepNav
          onBack={handleEditPhone}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          continueLabel={registrationCopy.verifyLabel}
          isPending={isBusy}
          isContinueDisabled={isBusy}
        />
      </form>
    </div>
  );
}
