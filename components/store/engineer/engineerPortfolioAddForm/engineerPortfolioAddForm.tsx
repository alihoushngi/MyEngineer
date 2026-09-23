"use client";

import { useRouter } from "next/navigation";
import { ImagePlusIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { uploadUserFile } from "@/lib/uploads/upload-user-file/upload-user-file";
import { addEngineerPortfolioItem } from "@/services/engineer-service/engineer-service";

export function EngineerPortfolioAddForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(addEngineerPortfolioItem);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0]);
  }

  async function handleSubmit() {
    setError(null);

    try {
      const imageUploadId = file
        ? await uploadUserFile("portfolio_image", file)
        : undefined;

      await mutation.mutateAsync({
        title: title.trim() || "نمونه‌کار جدید",
        description: description.trim() || undefined,
        imageUploadId,
      });
      setTitle("");
      setDescription("");
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
          <ImagePlusIcon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="type-h4 text-foreground">افزودن نمونه‌کار</h2>
          <p className="mt-0.5 type-caption text-foreground-muted">
            پروژه جدید را به پروفایل حرفه‌ای خود اضافه کنید.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        <Field>
          <FieldLabel htmlFor="portfolio-title">عنوان پروژه</FieldLabel>
          <Input
            id="portfolio-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="portfolio-description">
            توضیح (اختیاری)
          </FieldLabel>
          <Textarea
            id="portfolio-description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>تصویر نمونه‌کار</FieldLabel>
          <FileUpload
            accept="image/*"
            onChange={handleFile}
            label={file ? "تغییر تصویر" : "انتخاب تصویر"}
            description={
              file
                ? `فایل انتخاب‌شده: ${file.name}`
                : engineerPanelCopy.uploadUnavailable
            }
          />
          <FieldDescription>
            تصویر ابتدا بارگذاری می‌شود و سپس به نمونه‌کار متصل می‌گردد.
          </FieldDescription>
        </Field>

        <EngineerActionError
          message={error}
          onRetry={() => void handleSubmit()}
        />

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
