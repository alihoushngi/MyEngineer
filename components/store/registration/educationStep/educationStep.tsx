"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlertIcon, FileIcon, XIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  ABOVE_DIPLOMA_DEGREES,
  educationStepSchema,
  type EducationStepFormData,
} from "@/components/store/registration/educationStep/type/educationStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { type DegreeKey } from "@/types/store/registration.types";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveEducation } from "@/services/registration-service/registration-service";

export function EducationStep() {
  const router = useRouter();
  const { data, commitEducation } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveEducation);
  // Local file selections per degree key — not stored in RHF (File objects)
  const [degreeFiles, setDegreeFiles] = useState<
    Partial<Record<DegreeKey, File>>
  >(data.education?.degreeFiles ?? {});

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EducationStepFormData>({
    resolver: yupResolver(educationStepSchema),
    defaultValues: {
      level: data.education?.level ?? "aboveDiploma",
      degrees: data.education?.degrees ? [...data.education.degrees] : [],
    },
  });

  const level = watch("level");
  const selectedDegrees = watch("degrees");

  function handleFileChange(degreeKey: DegreeKey, file: File | undefined) {
    setDegreeFiles((prev) => {
      if (file === undefined) {
        const next = { ...prev };
        delete next[degreeKey];
        return next;
      }
      return { ...prev, [degreeKey]: file };
    });
  }

  async function onSubmit(formData: EducationStepFormData) {
    setApiError(null);

    try {
      await saveMutation.mutateAsync({
        level: formData.level,
        degrees: formData.degrees,
        degreeFileUploadIds: {},
        // API CONTRACT REQUIRED: files must be uploaded separately first,
        // then their IDs included here. Not yet possible.
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitEducation({
      level: formData.level,
      degrees: formData.degrees as DegreeKey[],
      degreeFiles,
    });
    router.push("/expert-registration/engineering-organization");
  }

  function handleBack() {
    router.push("/expert-registration/personal-info");
  }

  const degreesError =
    errors.degrees?.message ??
    (errors as { degrees?: { root?: { message?: string } } }).degrees?.root
      ?.message;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step6Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step6Description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step6Title}
      >
        {/* Education level branch */}
        <Field>
          <FieldLabel id="reg-edu-level-label">
            {registrationCopy.educationLevelLabel}
          </FieldLabel>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                aria-labelledby="reg-edu-level-label"
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
                  <RadioGroupItem id="reg-edu-above" value="aboveDiploma" />
                  <label
                    htmlFor="reg-edu-above"
                    className="min-h-11 content-center type-body cursor-pointer"
                  >
                    {registrationCopy.educationLevelAboveDiploma}
                  </label>
                </div>
                <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
                  <RadioGroupItem id="reg-edu-diploma" value="diplomaOrLower" />
                  <label
                    htmlFor="reg-edu-diploma"
                    className="min-h-11 content-center type-body cursor-pointer"
                  >
                    {registrationCopy.educationLevelDiplomaOrLower}
                  </label>
                </div>
              </RadioGroup>
            )}
          />
        </Field>

        {/* Degree multi-select — only shown for aboveDiploma */}
        {level === "aboveDiploma" ? (
          <Field invalid={Boolean(degreesError)}>
            <FieldLabel id="reg-edu-degrees-label">
              {registrationCopy.degreeSelectionLabel}
            </FieldLabel>
            <p className="type-body-sm text-foreground-muted">
              {registrationCopy.degreeSelectionHelp}
            </p>
            <Controller
              control={control}
              name="degrees"
              render={({ field }) => (
                <div
                  role="group"
                  aria-labelledby="reg-edu-degrees-label"
                  className="grid gap-2 sm:grid-cols-2"
                  aria-describedby={
                    degreesError ? "reg-edu-degrees-error" : undefined
                  }
                >
                  {ABOVE_DIPLOMA_DEGREES.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-3">
                      <Checkbox
                        id={`reg-edu-degree-${key}`}
                        checked={field.value.includes(key)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, key]);
                          } else {
                            field.onChange(
                              field.value.filter((d) => d !== key),
                            );
                            // Clear file when degree deselected
                            handleFileChange(key, undefined);
                          }
                        }}
                      />
                      <label
                        htmlFor={`reg-edu-degree-${key}`}
                        className="min-h-11 content-center type-body cursor-pointer"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
            <FieldError id="reg-edu-degrees-error">{degreesError}</FieldError>
          </Field>
        ) : null}

        {/* Per-degree file upload cards */}
        {level === "aboveDiploma" && selectedDegrees.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {/*
             * API CONTRACT REQUIRED — file upload endpoint does not exist.
             * Files are selected locally and stored in wizard memory only.
             */}
            <Alert variant="info" className="sm:col-span-2">
              <CircleAlertIcon />
              <AlertDescription>
                {registrationCopy.uploadApiNote}
              </AlertDescription>
            </Alert>
            {selectedDegrees.map((degreeKey) => {
              const degreeLabel =
                ABOVE_DIPLOMA_DEGREES.find((d) => d.key === degreeKey)?.label ??
                degreeKey;
              const file = degreeFiles[degreeKey as DegreeKey];

              return (
                <DegreeFileCard
                  key={degreeKey}
                  degreeKey={degreeKey as DegreeKey}
                  label={degreeLabel}
                  file={file}
                  disabled={isSubmitting}
                  onFileChange={(f) =>
                    handleFileChange(degreeKey as DegreeKey, f)
                  }
                />
              );
            })}
          </div>
        ) : null}

        {/* Diploma or lower: single diploma upload */}
        {level === "diplomaOrLower" ? (
          <div className="space-y-4">
            <Alert variant="info">
              <CircleAlertIcon />
              <AlertDescription>
                {registrationCopy.uploadApiNote}
              </AlertDescription>
            </Alert>
            <DegreeFileCard
              degreeKey="diploma"
              label={registrationCopy.degreeDiploma}
              file={degreeFiles["diploma"]}
              disabled={isSubmitting}
              onFileChange={(f) => handleFileChange("diploma", f)}
            />
          </div>
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

type DegreeFileCardProps = {
  degreeKey: DegreeKey;
  label: string;
  file: File | undefined;
  disabled: boolean;
  onFileChange: (file: File | undefined) => void;
};

function DegreeFileCard({
  degreeKey,
  label,
  file,
  disabled,
  onFileChange,
}: DegreeFileCardProps) {
  const inputId = `reg-edu-file-${degreeKey}`;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    onFileChange(selected);
  }

  function handleRemove() {
    onFileChange(undefined);
    // Reset file input by key remount isn't available; just clear via DOM
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (input) {
      input.value = "";
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <p className="type-body-sm font-medium text-foreground">
        {registrationCopy.uploadDegreeLabel(label)}
      </p>
      {file ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileIcon
              className="size-4 shrink-0 text-foreground-muted"
              aria-hidden="true"
            />
            <span className="type-body-sm truncate text-foreground">
              {file.name}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={handleRemove}
            aria-label={registrationCopy.fileRemoveLabel}
          >
            <XIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ) : null}
      <FileUpload
        key={file?.name ?? "empty"}
        id={inputId}
        accept={registrationCopy.uploadDegreeAccept}
        disabled={disabled}
        aria-label={registrationCopy.uploadDegreeLabel(label)}
        label={file ? registrationCopy.fileChangeLabel : "انتخاب فایل"}
        description={registrationCopy.uploadDegreeDescription}
        onChange={handleChange}
      />
    </div>
  );
}
