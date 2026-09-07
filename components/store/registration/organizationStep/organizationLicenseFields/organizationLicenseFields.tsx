"use client";

import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { type OrganizationStepData } from "@/components/store/registration/organizationStep/type/organizationStep.types";
import {
  ENGINEERING_DISCIPLINES,
  ENGINEERING_QUALIFICATIONS,
  QUALIFICATIONS_BY_DISCIPLINE,
  registrationCopy,
} from "@/config/registration.config/registration.config";

type OrganizationLicenseFieldsProps = {
  control: Control<OrganizationStepData>;
  setValue: UseFormSetValue<OrganizationStepData>;
  discipline: string;
  qualifications: string[];
  licenseFile: File | undefined;
  onLicenseFileChange: (file: File | undefined) => void;
  errors: {
    licenseNumber?: { message?: string };
    discipline?: { message?: string };
    qualifications?: { message?: string };
  };
  disabled: boolean;
};

export function OrganizationLicenseFields({
  control,
  setValue,
  discipline,
  qualifications,
  licenseFile,
  onLicenseFileChange,
  errors,
  disabled,
}: OrganizationLicenseFieldsProps) {
  const qualificationOptions =
    discipline in QUALIFICATIONS_BY_DISCIPLINE
      ? QUALIFICATIONS_BY_DISCIPLINE[
          discipline as keyof typeof QUALIFICATIONS_BY_DISCIPLINE
        ]
      : [];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field invalid={Boolean(errors.licenseNumber)}>
        <FieldLabel htmlFor="reg-license-number" required>
          {registrationCopy.licenseNumberLabel}
        </FieldLabel>
        <Controller
          control={control}
          name="licenseNumber"
          render={({ field }) => (
            <Input
              id="reg-license-number"
              className="ltr-data"
              dir="ltr"
              autoComplete="off"
              placeholder={registrationCopy.licenseNumberPlaceholder}
              disabled={disabled}
              aria-invalid={Boolean(errors.licenseNumber)}
              aria-describedby={
                errors.licenseNumber ? "reg-license-number-error" : undefined
              }
              {...field}
            />
          )}
        />
        <FieldError id="reg-license-number-error">
          {errors.licenseNumber?.message}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="reg-license-file">
          {registrationCopy.licenseFileLabel}
        </FieldLabel>
        <FileUpload
          id="reg-license-file"
          aria-label={registrationCopy.licenseFileLabel}
          disabled={disabled}
          label={licenseFile ? registrationCopy.fileChangeLabel : "انتخاب فایل"}
          description={
            licenseFile
              ? registrationCopy.fileSelected(licenseFile.name)
              : registrationCopy.licenseUploadApiNote
          }
          onChange={(event) => {
            onLicenseFileChange(event.currentTarget.files?.[0]);
          }}
        />
      </Field>

      <Field invalid={Boolean(errors.discipline)}>
        <FieldLabel htmlFor="reg-discipline" required>
          {registrationCopy.disciplineLabel}
        </FieldLabel>
        <Controller
          control={control}
          name="discipline"
          render={({ field }) => (
            <Select
              value={field.value}
              disabled={disabled}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("qualifications", []);
              }}
            >
              <SelectTrigger
                id="reg-discipline"
                aria-describedby={
                  errors.discipline ? "reg-discipline-error" : undefined
                }
                aria-invalid={Boolean(errors.discipline)}
              >
                <SelectValue
                  placeholder={registrationCopy.disciplinePlaceholder}
                />
              </SelectTrigger>
              <SelectContent>
                {ENGINEERING_DISCIPLINES.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError id="reg-discipline-error">
          {errors.discipline?.message}
        </FieldError>
      </Field>

      {discipline !== "" && qualificationOptions.length === 0 ? (
        <Alert variant="info" className="sm:col-span-2">
          <CircleAlertIcon />
          <AlertDescription>
            {registrationCopy.qualificationsUnavailable}
          </AlertDescription>
        </Alert>
      ) : null}

      {qualificationOptions.length > 0 ? (
        <Field
          invalid={Boolean(errors.qualifications)}
          className="sm:col-span-2"
        >
          <FieldLabel id="reg-qualifications-label" required>
            {registrationCopy.qualificationsLabel}
          </FieldLabel>
          <div
            role="group"
            aria-labelledby="reg-qualifications-label"
            aria-describedby={
              errors.qualifications ? "reg-qualifications-error" : undefined
            }
            className="grid gap-2 sm:grid-cols-2"
          >
            {ENGINEERING_QUALIFICATIONS.filter((item) =>
              qualificationOptions.includes(item.id),
            ).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  id={`reg-qualification-${item.id}`}
                  checked={qualifications.includes(item.id)}
                  disabled={disabled}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setValue("qualifications", [...qualifications, item.id], {
                        shouldValidate: true,
                      });
                    } else {
                      setValue(
                        "qualifications",
                        qualifications.filter((id) => id !== item.id),
                        { shouldValidate: true },
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`reg-qualification-${item.id}`}
                  className="min-h-11 content-center type-body cursor-pointer"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <FieldError id="reg-qualifications-error">
            {errors.qualifications?.message}
          </FieldError>
        </Field>
      ) : null}
    </div>
  );
}
