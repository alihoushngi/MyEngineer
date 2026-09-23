"use client";

import { FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { registrationCopy } from "@/config/registration.config/registration.config";

type EducationDegreeFileCardProps = {
  fieldId: string;
  label: string;
  file: File | undefined;
  uploaded: boolean;
  disabled: boolean;
  onFileChange: (file: File | undefined) => void;
};

export function EducationDegreeFileCard({
  fieldId,
  label,
  file,
  uploaded,
  disabled,
  onFileChange,
}: EducationDegreeFileCardProps) {
  const inputId = `reg-edu-file-${fieldId}`;

  return (
    <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <p className="type-body-sm font-medium text-foreground">
        {registrationCopy.uploadDegreeLabel(label)}
      </p>
      {file || uploaded ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileIcon
              className="size-4 shrink-0 text-foreground-muted"
              aria-hidden="true"
            />
            <span className="type-body-sm truncate text-foreground">
              {file?.name ?? "فایل قبلاً بارگذاری شده است"}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => onFileChange(undefined)}
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
        onChange={(event) => onFileChange(event.currentTarget.files?.[0])}
      />
    </div>
  );
}
