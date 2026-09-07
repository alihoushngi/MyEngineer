"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { type PortfolioImageEntry } from "@/types/store/registration.types";

type PortfolioImageListProps = {
  items: readonly PortfolioImageEntry[];
  previews: ReadonlyMap<string, string>;
  disabled: boolean;
  formatError: string | null;
  onAddFiles: (files: FileList | null) => void;
  onRemove: (id: string) => void;
};

export function PortfolioImageList({
  items,
  previews,
  disabled,
  formatError,
  onAddFiles,
  onRemove,
}: PortfolioImageListProps) {
  return (
    <section
      className="space-y-4"
      aria-label={registrationCopy.portfolioImagesLabel}
    >
      <div className="space-y-1">
        <h3 className="type-h4 text-foreground">
          {registrationCopy.portfolioImagesLabel}
        </h3>
        <p className="type-body-sm text-foreground-muted">
          {registrationCopy.portfolioImagesHelp}
        </p>
      </div>
      <FileUpload
        accept="image/*"
        multiple
        disabled={disabled}
        invalid={Boolean(formatError)}
        label={registrationCopy.addPortfolioImageLabel}
        description={registrationCopy.portfolioUploadApiNote}
        onChange={(event) => {
          onAddFiles(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
      />
      {formatError ? (
        <p className="type-body-sm text-danger" role="alert">
          {formatError}
        </p>
      ) : null}
      {items.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const preview = previews.get(item.id);

            return (
              <li
                key={item.id}
                className="relative overflow-hidden rounded-lg border border-border"
              >
                {preview ? (
                  // Local object URL preview until upload API exists.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt={item.file.name}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <p className="type-caption p-3 text-foreground-muted">
                    {item.file.name}
                  </p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  className="absolute end-1 top-1 size-11 bg-surface"
                  aria-label={`${registrationCopy.removePortfolioImageLabel}: ${item.file.name}`}
                  onClick={() => {
                    onRemove(item.id);
                  }}
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
