"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { EducationDegreeFileCard } from "@/components/store/registration/educationDegreeFileCard/educationDegreeFileCard";
import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";
import { Input } from "@/components/ui/input/input";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  educationStepSchema,
  type EducationStepFormData,
} from "@/components/store/registration/educationStep/type/educationStep.types";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { EDUCATION_API_LEVELS } from "@/lib/registration/education-levels/education-levels";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { uploadUserFile } from "@/lib/uploads/upload-user-file/upload-user-file";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { listBackendFields } from "@/services/lookup-service/lookup-service";
import { saveEducation } from "@/services/registration-service/registration-service";

export function EducationStep() {
  const router = useRouter();
  const { data, commitEducation } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveEducation);
  const [degreeFiles, setDegreeFiles] = useState<
    Partial<Record<string, File>>
  >({});
  const fieldsQuery = useQuery({
    queryKey: ["registration", "fields"],
    queryFn: listBackendFields,
    retry: false,
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EducationStepFormData>({
    resolver: yupResolver(educationStepSchema),
    defaultValues: {
      level: data.education?.level ?? "karshenasi",
      fieldIds: data.education?.fieldIds ? [...data.education.fieldIds] : [],
      university: data.education?.university ?? "",
    },
  });

  const selectedFields = watch("fieldIds");

  async function onSubmit(formData: EducationStepFormData) {
    setApiError(null);

    try {
      const degreeFileUploadIds: Record<string, string> = {
        ...(data.education?.degreeFileUploadIds ?? {}),
      };

      for (const fieldId of formData.fieldIds) {
        const file = degreeFiles[fieldId];
        if (!file) {
          continue;
        }
        degreeFileUploadIds[fieldId] = await uploadUserFile("degree", file);
      }

      await saveMutation.mutateAsync({
        level: formData.level,
        fieldIds: formData.fieldIds,
        university: formData.university,
        degreeFileUploadIds,
      });

      commitEducation({
        level: formData.level,
        fieldIds: formData.fieldIds,
        university: formData.university,
        degreeFileUploadIds,
      });
      router.push("/expert-registration/engineering-organization");
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
    }
  }

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
                {EDUCATION_API_LEVELS.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle"
                  >
                    <RadioGroupItem
                      id={`reg-edu-level-${item.id}`}
                      value={item.id}
                    />
                    <label
                      htmlFor={`reg-edu-level-${item.id}`}
                      className="min-h-11 content-center type-body cursor-pointer"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </Field>

        <Field invalid={Boolean(errors.fieldIds)}>
          <FieldLabel id="reg-edu-fields-label" required>
            {registrationCopy.degreeSelectionLabel}
          </FieldLabel>
          {fieldsQuery.isPending ? (
            <p className="type-body-sm text-foreground-muted">
              {registrationCopy.expertiseCatalogLoading}
            </p>
          ) : null}
          {fieldsQuery.error ? (
            <Alert variant="danger">
              <CircleAlertIcon />
              <AlertDescription>
                {toUserErrorMessage(
                  fieldsQuery.error,
                  registrationCopy.errorGenericDescription,
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <Controller
              control={control}
              name="fieldIds"
              render={({ field }) => (
                <div
                  role="group"
                  aria-labelledby="reg-edu-fields-label"
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {(fieldsQuery.data ?? []).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`reg-edu-field-${item.id}`}
                        checked={field.value.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, item.id]);
                          } else {
                            field.onChange(
                              field.value.filter((id) => id !== item.id),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`reg-edu-field-${item.id}`}
                        className="min-h-11 content-center type-body cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          )}
          <FieldError>{errors.fieldIds?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="reg-edu-university">دانشگاه</FieldLabel>
          <Input
            id="reg-edu-university"
            {...register("university")}
            disabled={isSubmitting}
          />
        </Field>

        {selectedFields.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {selectedFields.map((fieldId) => {
              const label =
                fieldsQuery.data?.find((item) => item.id === fieldId)?.label ??
                fieldId;
              return (
                <EducationDegreeFileCard
                  key={fieldId}
                  fieldId={fieldId}
                  label={label}
                  file={degreeFiles[fieldId]}
                  uploaded={Boolean(
                    data.education?.degreeFileUploadIds?.[fieldId],
                  )}
                  disabled={isSubmitting}
                  onFileChange={(file) => {
                    setDegreeFiles((prev) => {
                      if (!file) {
                        const next = { ...prev };
                        delete next[fieldId];
                        return next;
                      }
                      return { ...prev, [fieldId]: file };
                    });
                  }}
                />
              );
            })}
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
          onBack={() => {
            router.push("/expert-registration/personal-info");
          }}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || saveMutation.isPending}
          isContinueDisabled={
            isSubmitting || saveMutation.isPending || fieldsQuery.isPending
          }
        />
      </form>
    </div>
  );
}
