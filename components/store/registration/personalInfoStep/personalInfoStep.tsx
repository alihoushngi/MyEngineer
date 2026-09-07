"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserIcon, XIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  personalInfoStepSchema,
  type PersonalInfoStepData,
} from "@/components/store/registration/personalInfoStep/type/personalInfoStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { savePersonalInfo } from "@/services/registration-service/registration-service";

export function PersonalInfoStep() {
  const router = useRouter();
  const { data, commitPersonalInfo } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(savePersonalInfo);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(
    data.personalInfo?.avatarFile,
  );
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(
    undefined,
  );
  const [avatarFormatError, setAvatarFormatError] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoStepData>({
    resolver: yupResolver(personalInfoStepSchema),
    defaultValues: {
      firstName: data.personalInfo?.firstName ?? "",
      lastName: data.personalInfo?.lastName ?? "",
    },
  });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAvatarFormatError(null);
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const accepted = ["image/jpeg", "image/jpg", "image/png"];

    if (!accepted.includes(file.type)) {
      setAvatarFormatError(registrationCopy.avatarInvalidFormat);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreviewUrl(url);
  }

  function handleRemoveAvatar() {
    setAvatarFile(undefined);
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
      setAvatarPreviewUrl(undefined);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(formData: PersonalInfoStepData) {
    setApiError(null);

    try {
      await saveMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        // avatarUploadId: not available until upload API exists
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitPersonalInfo({
      firstName: formData.firstName,
      lastName: formData.lastName,
      avatarFile,
    });
    router.push("/expert-registration/education");
  }

  function handleBack() {
    router.push("/expert-registration/expertise");
  }

  const expertiseIds = data.expertise?.expertiseIds ?? [];
  const softwareIds = data.expertise?.softwareIds ?? [];
  const hasExpertise = expertiseIds.length > 0 || softwareIds.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step5Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step5Description}
        </p>
      </div>

      {/* Expertise summary */}
      <section
        className="space-y-3 rounded-xl border border-border-subtle bg-surface-subtle p-4"
        aria-label={registrationCopy.expertiseSummaryLabel}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="type-body-sm font-medium text-foreground">
            {registrationCopy.expertiseSummaryLabel}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/expert-registration/expertise")}
          >
            {registrationCopy.backToExpertise}
          </Button>
        </div>
        {hasExpertise ? (
          <div className="flex flex-wrap gap-2">
            {expertiseIds.map((id) => (
              <Badge key={id} variant="secondary">
                {id}
              </Badge>
            ))}
            {softwareIds.map((id) => (
              <Badge key={`sw-${id}`} variant="outline">
                {id}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="type-body-sm text-foreground-muted">
            {registrationCopy.expertiseSummaryEmpty}
          </p>
        )}
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step5Title}
      >
        <div className="grid gap-5 md:grid-cols-[10rem_minmax(0,1fr)]">
          {/* Avatar */}
          <Field className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
            <FieldLabel>{registrationCopy.avatarLabel}</FieldLabel>
            <div className="flex items-start gap-3 md:flex-col">
              <div className="relative shrink-0">
                <Avatar size="lg" className="size-20">
                  {avatarPreviewUrl ? (
                    <AvatarImage
                      src={avatarPreviewUrl}
                      alt="پیش‌نمایش تصویر پروفایل"
                    />
                  ) : null}
                  <AvatarFallback>
                    <UserIcon
                      className="size-8 text-foreground-muted"
                      aria-hidden="true"
                    />
                  </AvatarFallback>
                </Avatar>
                {avatarFile ? (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    aria-label={registrationCopy.fileRemoveLabel}
                    className="absolute -end-1 -top-1 inline-flex size-9 items-center justify-center rounded-full bg-danger text-danger-foreground outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <XIcon className="size-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              <div className="min-w-0 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  {avatarFile
                    ? registrationCopy.fileChangeLabel
                    : "انتخاب تصویر"}
                </Button>
                {avatarFile ? (
                  <p className="type-caption text-foreground-muted">
                    {registrationCopy.fileSelected(avatarFile.name)}
                  </p>
                ) : null}
                {!avatarFile ? (
                  <p className="type-caption text-foreground-muted">
                    {registrationCopy.avatarHelp}
                  </p>
                ) : null}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              aria-label={registrationCopy.avatarLabel}
              className="sr-only"
              onChange={handleAvatarChange}
            />
            {avatarFormatError ? (
              <p className="type-body-sm text-danger" role="alert">
                {avatarFormatError}
              </p>
            ) : null}
          </Field>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            <Field invalid={Boolean(errors.firstName)}>
              <FieldLabel htmlFor="reg-first-name" required>
                {registrationCopy.firstNameLabel}
              </FieldLabel>
              <Input
                id="reg-first-name"
                type="text"
                autoComplete="given-name"
                placeholder={registrationCopy.firstNamePlaceholder}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "reg-first-name-error" : undefined
                }
                {...register("firstName")}
              />
              <FieldError id="reg-first-name-error">
                {errors.firstName?.message}
              </FieldError>
            </Field>

            <Field invalid={Boolean(errors.lastName)}>
              <FieldLabel htmlFor="reg-last-name" required>
                {registrationCopy.lastNameLabel}
              </FieldLabel>
              <Input
                id="reg-last-name"
                type="text"
                autoComplete="family-name"
                placeholder={registrationCopy.lastNamePlaceholder}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "reg-last-name-error" : undefined
                }
                {...register("lastName")}
              />
              <FieldError id="reg-last-name-error">
                {errors.lastName?.message}
              </FieldError>
            </Field>

            {/* National ID display — read-only from step 1 */}
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="reg-national-id-display">
                {registrationCopy.nationalIdDisplayLabel}
              </FieldLabel>
              <Input
                type="text"
                id="reg-national-id-display"
                dir="ltr"
                readOnly
                value={data.identity?.nationalId ?? ""}
                aria-readonly="true"
                className="bg-surface-muted text-foreground-muted"
              />
            </Field>
          </div>
        </div>

        {/*
         * Location fields (province/city) omitted per BUSINESS DECISION REQUIRED (P0).
         * Legacy step5 had province/city but it was duplicated vs step 3 and labeled
         * inconsistently (birth vs work). Architecture allows adding them when decided.
         */}

        {apiError ? (
          <RegistrationError
            message={apiError}
            onRetry={() => {
              void handleSubmit(onSubmit)();
            }}
          />
        ) : null}

        <RegistrationStepNav
          onBack={handleBack}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || saveMutation.isPending}
          isContinueDisabled={isSubmitting || saveMutation.isPending}
        />
      </form>
    </div>
  );
}
