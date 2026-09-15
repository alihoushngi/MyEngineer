"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";

import { uploadAvatarAction } from "@/services/profile-service/profile-actions";

type ProfileAvatarUploadProps = {
  currentImageSrc?: string;
  displayName: string;
};

export function ProfileAvatarUpload({
  currentImageSrc,
  displayName,
}: ProfileAvatarUploadProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(null);

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("فقط فایل تصویری مجاز است.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("حداکثر حجم تصویر ۴ مگابایت است.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const result = await uploadAvatarAction(formData);
      URL.revokeObjectURL(objectUrl);

      if (!result.ok) {
        setPreviewSrc(null);
        setError(result.message);
        return;
      }

      setSuccess("تصویر پروفایل به‌روز شد.");
      router.refresh();
    });
  }

  const imageSrc = previewSrc ?? currentImageSrc;

  return (
    <Field>
      <FieldLabel>تصویر پروفایل</FieldLabel>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative size-20 overflow-hidden rounded-2xl bg-surface-subtle">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={displayName}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <span className="flex size-full items-center justify-center type-h4 text-foreground-muted">
              {displayName.slice(0, 1) || "؟"}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFileChange}
            disabled={pending}
          />
          <Button
            type="button"
            variant="outline"
            className="min-h-11 self-start"
            disabled={pending}
            onClick={() => inputRef.current?.click()}
          >
            {pending ? "در حال آپلود…" : "انتخاب تصویر"}
          </Button>
          <p className="type-caption text-foreground-muted">
            JPG یا PNG تا ۴ مگابایت
          </p>
        </div>
      </div>
      {error ? <FieldError>{error}</FieldError> : null}
      {success ? (
        <p className="type-caption text-success" role="status">
          {success}
        </p>
      ) : null}
    </Field>
  );
}
