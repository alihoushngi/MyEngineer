"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FilePlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
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
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import {
  EDUCATION_API_LEVELS,
  type EducationApiLevel,
} from "@/lib/registration/education-levels/education-levels";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { uploadUserFile } from "@/lib/uploads/upload-user-file/upload-user-file";
import { listBackendFields } from "@/services/lookup-service/lookup-service";
import {
  addEngineerCredential,
  type AddEngineerCredentialRequest,
} from "@/services/engineer-service/engineer-service";

type CredentialKind = AddEngineerCredentialRequest["kind"];

const KIND_LABELS: Record<CredentialKind, string> = {
  certificate: "گواهی",
  license: "پروانه",
  degree: "مدرک تحصیلی",
};

export function EngineerCredentialAddForm() {
  const router = useRouter();
  const [kind, setKind] = useState<CredentialKind>("certificate");
  const [title, setTitle] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [level, setLevel] = useState<EducationApiLevel>("karshenasi");
  const [fieldId, setFieldId] = useState("");
  const [university, setUniversity] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(addEngineerCredential);
  const fieldsQuery = useQuery({
    queryKey: ["lookup", "fields"],
    queryFn: listBackendFields,
    enabled: kind === "degree",
  });

  async function handleSubmit() {
    setError(null);

    try {
      const purpose =
        kind === "degree"
          ? "degree"
          : kind === "license"
            ? "license"
            : "certificate";
      const uploadId = file ? await uploadUserFile(purpose, file) : undefined;

      await mutation.mutateAsync({
        kind,
        title: kind === "certificate" ? title.trim() || "گواهی" : undefined,
        licenseNumber:
          kind === "license" ? licenseNumber.trim() || undefined : undefined,
        level: kind === "degree" ? level : undefined,
        fieldId:
          kind === "degree" && fieldId ? Number(fieldId) : undefined,
        university:
          kind === "degree" ? university.trim() || null : undefined,
        uploadId,
      });
      setTitle("");
      setLicenseNumber("");
      setUniversity("");
      setFile(undefined);
      router.refresh();
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <form
      className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <FilePlusIcon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="type-h4 text-foreground">افزودن مدرک</h2>
          <p className="mt-0.5 type-caption text-foreground-muted">
            گواهی، پروانه یا مدرک تحصیلی را مطابق قرارداد سامانه ثبت کنید.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        <Field>
          <FieldLabel htmlFor="credential-kind">نوع مدرک</FieldLabel>
          <Select
            value={kind}
            onValueChange={(value) => setKind(value as CredentialKind)}
          >
            <SelectTrigger id="credential-kind" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(KIND_LABELS) as CredentialKind[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {KIND_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {kind === "certificate" ? (
          <Field>
            <FieldLabel htmlFor="credential-title">عنوان گواهی</FieldLabel>
            <Input
              id="credential-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>
        ) : null}

        {kind === "license" ? (
          <Field>
            <FieldLabel htmlFor="credential-license">شماره پروانه</FieldLabel>
            <Input
              id="credential-license"
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value)}
              dir="ltr"
              className="ltr-data"
            />
          </Field>
        ) : null}

        {kind === "degree" ? (
          <>
            <Field>
              <FieldLabel htmlFor="credential-level">مقطع</FieldLabel>
              <Select
                value={level}
                onValueChange={(value) =>
                  setLevel(value as EducationApiLevel)
                }
              >
                <SelectTrigger id="credential-level" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_API_LEVELS.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          <Field>
            <FieldLabel htmlFor="credential-field">رشته</FieldLabel>
            <Select
              value={fieldId || "unset"}
              onValueChange={(value) =>
                setFieldId(value === "unset" ? "" : value)
              }
            >
                <SelectTrigger id="credential-field" className="w-full">
                  <SelectValue placeholder="انتخاب رشته" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unset">انتخاب نشده</SelectItem>
                  {(fieldsQuery.data ?? []).map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="credential-university">دانشگاه</FieldLabel>
              <Input
                id="credential-university"
                value={university}
                onChange={(event) => setUniversity(event.target.value)}
              />
            </Field>
          </>
        ) : null}

        <Field>
          <FieldLabel>فایل مدرک</FieldLabel>
          <FileUpload
            accept="image/*,.pdf"
            onChange={(event) => setFile(event.currentTarget.files?.[0])}
            label={file ? "تغییر فایل" : "انتخاب فایل"}
            description={
              file ? `فایل انتخاب‌شده: ${file.name}` : "تصویر یا PDF مدرک"
            }
          />
        </Field>

        {error ? <FieldError>{error}</FieldError> : null}

        <Button
          type="submit"
          loading={mutation.isPending}
          disabled={mutation.isPending}
          className="w-full sm:w-auto sm:self-start"
        >
          {engineerPanelCopy.addLabel}
        </Button>
      </div>
    </form>
  );
}
