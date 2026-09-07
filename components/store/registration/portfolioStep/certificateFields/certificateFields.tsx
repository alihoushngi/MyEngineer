"use client";

import { Button } from "@/components/ui/button/button";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { type CertificateEntry } from "@/types/store/registration.types";

type CertificateFieldsProps = {
  items: readonly CertificateEntry[];
  disabled: boolean;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onTitleChange: (id: string, title: string) => void;
  onFileChange: (id: string, file: File | undefined) => void;
};

export function CertificateFields({
  items,
  disabled,
  onAdd,
  onRemove,
  onTitleChange,
  onFileChange,
}: CertificateFieldsProps) {
  return (
    <section
      className="space-y-4"
      aria-label={registrationCopy.certificatesLabel}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="type-h4 text-foreground">
          {registrationCopy.certificatesLabel}
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={onAdd}
        >
          {registrationCopy.addCertificateLabel}
        </Button>
      </div>
      {items.length === 0 ? null : (
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="space-y-4 rounded-xl border border-border-subtle bg-surface-subtle p-4"
            >
              <Field>
                <FieldLabel htmlFor={`reg-cert-title-${item.id}`}>
                  {registrationCopy.certificateTitleLabel}
                </FieldLabel>
                <Input
                  id={`reg-cert-title-${item.id}`}
                  value={item.title}
                  disabled={disabled}
                  placeholder={registrationCopy.certificateTitlePlaceholder}
                  onChange={(event) => {
                    onTitleChange(item.id, event.currentTarget.value);
                  }}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`reg-cert-file-${item.id}`}>
                  {registrationCopy.certificateFileLabel}
                </FieldLabel>
                <FileUpload
                  id={`reg-cert-file-${item.id}`}
                  aria-label={registrationCopy.certificateFileLabel}
                  disabled={disabled}
                  label={
                    item.file ? registrationCopy.fileChangeLabel : "انتخاب فایل"
                  }
                  description={
                    item.file
                      ? registrationCopy.fileSelected(item.file.name)
                      : undefined
                  }
                  onChange={(event) => {
                    onFileChange(item.id, event.currentTarget.files?.[0]);
                  }}
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onRemove(item.id);
                }}
              >
                {registrationCopy.removeCertificateLabel}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
