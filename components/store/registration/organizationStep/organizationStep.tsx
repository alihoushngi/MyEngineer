"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import { OrganizationLicenseFields } from "@/components/store/registration/organizationStep/organizationLicenseFields/organizationLicenseFields";
import {
  organizationStepSchema,
  type OrganizationStepData,
} from "@/components/store/registration/organizationStep/type/organizationStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveOrganization } from "@/services/registration-service/registration-service";
import {
  type EngineeringDiscipline,
  type EngineeringQualification,
  type RegistrationOrganizationData,
} from "@/types/store/registration.types";

export function OrganizationStep() {
  const router = useRouter();
  const { data, commitOrganization } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveOrganization);
  const [licenseFile, setLicenseFile] = useState<File | undefined>(
    data.organization?.licenseFile,
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationStepData>({
    resolver: yupResolver(organizationStepSchema),
    defaultValues: {
      isMember: data.organization?.isMember === true ? "yes" : "no",
      membershipNumber: data.organization?.membershipNumber ?? "",
      hasLicense: data.organization?.hasLicense === true ? "yes" : "no",
      licenseNumber: data.organization?.licenseNumber ?? "",
      discipline: data.organization?.discipline ?? "",
      qualifications: data.organization?.qualifications
        ? [...data.organization.qualifications]
        : [],
    },
  });

  const isMember = watch("isMember");
  const hasLicense = watch("hasLicense");
  const discipline = watch("discipline");
  const qualifications = watch("qualifications");

  async function onSubmit(formData: OrganizationStepData) {
    setApiError(null);
    const payload = toOrganizationPayload(formData, licenseFile);

    try {
      await saveMutation.mutateAsync({
        isMember: payload.isMember,
        membershipNumber: payload.membershipNumber,
        hasLicense: payload.hasLicense,
        licenseNumber: payload.licenseNumber,
        discipline: payload.discipline,
        qualifications: payload.qualifications,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitOrganization(payload);
    router.push(registrationPaths.resume);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step7Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step7Description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step7Title}
      >
        <YesNoField
          id="reg-is-member"
          label={registrationCopy.isMemberLabel}
          value={isMember}
          disabled={isSubmitting}
          onChange={(value) => {
            setValue("isMember", value);
          }}
        />

        {isMember === "yes" ? (
          <>
            <Field invalid={Boolean(errors.membershipNumber)}>
              <FieldLabel htmlFor="reg-membership-number" required>
                {registrationCopy.membershipNumberLabel}
              </FieldLabel>
              <Controller
                control={control}
                name="membershipNumber"
                render={({ field }) => (
                  <Input
                    id="reg-membership-number"
                    className="ltr-data"
                    dir="ltr"
                    autoComplete="off"
                    placeholder={registrationCopy.membershipNumberPlaceholder}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.membershipNumber)}
                    {...field}
                  />
                )}
              />
              <FieldError>{errors.membershipNumber?.message}</FieldError>
            </Field>

            <YesNoField
              id="reg-has-license"
              label={registrationCopy.hasLicenseLabel}
              value={hasLicense}
              disabled={isSubmitting}
              onChange={(value) => {
                setValue("hasLicense", value);
              }}
            />

            {hasLicense === "yes" ? (
              <OrganizationLicenseFields
                control={control}
                setValue={setValue}
                discipline={discipline ?? ""}
                qualifications={qualifications ?? []}
                licenseFile={licenseFile}
                onLicenseFileChange={setLicenseFile}
                errors={errors}
                disabled={isSubmitting}
              />
            ) : null}
          </>
        ) : null}

        {apiError ? (
          <RegistrationError
            message={apiError}
            onRetry={() => {
              void handleSubmit(onSubmit)();
            }}
          />
        ) : null}

        <RegistrationStepNav
          onBack={() => {
            router.push(registrationPaths.education);
          }}
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

type YesNoFieldProps = {
  id: string;
  label: string;
  value: "yes" | "no";
  disabled: boolean;
  onChange: (value: "yes" | "no") => void;
};

function YesNoField({ id, label, value, disabled, onChange }: YesNoFieldProps) {
  return (
    <Field>
      <FieldLabel id={`${id}-label`}>{label}</FieldLabel>
      <RadioGroup
        value={value}
        disabled={disabled}
        onValueChange={(next) => {
          onChange(next === "no" ? "no" : "yes");
        }}
        aria-labelledby={`${id}-label`}
        className="grid gap-3 sm:grid-cols-2"
      >
        <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
          <RadioGroupItem id={`${id}-yes`} value="yes" />
          <label
            htmlFor={`${id}-yes`}
            className="min-h-11 content-center type-body cursor-pointer"
          >
            {registrationCopy.yesLabel}
          </label>
        </div>
        <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
          <RadioGroupItem id={`${id}-no`} value="no" />
          <label
            htmlFor={`${id}-no`}
            className="min-h-11 content-center type-body cursor-pointer"
          >
            {registrationCopy.noLabel}
          </label>
        </div>
      </RadioGroup>
    </Field>
  );
}

function toOrganizationPayload(
  formData: OrganizationStepData,
  licenseFile: File | undefined,
): RegistrationOrganizationData {
  if (formData.isMember === "no") {
    return { isMember: false };
  }

  if (formData.hasLicense === "no") {
    return {
      isMember: true,
      membershipNumber: formData.membershipNumber?.trim() ?? "",
      hasLicense: false,
    };
  }

  return {
    isMember: true,
    membershipNumber: formData.membershipNumber?.trim() ?? "",
    hasLicense: true,
    licenseNumber: formData.licenseNumber?.trim() ?? "",
    licenseFile,
    discipline: formData.discipline as EngineeringDiscipline,
    qualifications: formData.qualifications as EngineeringQualification[],
  };
}
