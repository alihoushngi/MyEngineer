"use client";

import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldError } from "@/components/ui/field/field";
import { CertificateFields } from "@/components/store/registration/portfolioStep/certificateFields/certificateFields";
import { PortfolioImageList } from "@/components/store/registration/portfolioStep/portfolioImageList/portfolioImageList";
import {
  portfolioStepSchema,
  type PortfolioStepData,
} from "@/components/store/registration/portfolioStep/type/portfolioStep.types";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { submitRegistration } from "@/services/registration-service/registration-service";
import { toMockEngineerProfileSnapshot } from "@/lib/auth/registration-profile-snapshot/registration-profile-snapshot";
import {
  type CertificateEntry,
  type PortfolioImageEntry,
} from "@/types/store/registration.types";

function createId(): string {
  return crypto.randomUUID();
}

function isDuplicateImage(
  existing: readonly PortfolioImageEntry[],
  file: File,
): boolean {
  return existing.some(
    (item) => item.file.name === file.name && item.file.size === file.size,
  );
}

export function PortfolioStep() {
  const router = useRouter();
  const { data, commitSubmitted } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const submitMutation = useApiMutation(submitRegistration);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [images, setImages] = useState<PortfolioImageEntry[]>(
    data.portfolio?.images ? [...data.portfolio.images] : [],
  );
  const [certificates, setCertificates] = useState<CertificateEntry[]>(
    data.portfolio?.certificates ? [...data.portfolio.certificates] : [],
  );

  const previews = useMemo(() => {
    const map = new Map<string, string>();

    for (const item of images) {
      map.set(item.id, URL.createObjectURL(item.file));
    }

    return map;
  }, [images]);

  useEffect(() => {
    return () => {
      for (const url of previews.values()) {
        URL.revokeObjectURL(url);
      }
    };
  }, [previews]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PortfolioStepData>({
    resolver: yupResolver(portfolioStepSchema),
    defaultValues: {
      acceptRules: data.portfolio?.acceptRules,
    },
  });

  const acceptRules = watch("acceptRules");

  function addImages(files: FileList | null) {
    if (!files) {
      return;
    }

    setFormatError(null);
    const next = [...images];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        setFormatError(registrationCopy.portfolioImageInvalid);
        continue;
      }

      if (isDuplicateImage(next, file)) {
        continue;
      }

      next.push({ id: createId(), file });
    }

    setImages(next);
  }

  function removeImage(id: string) {
    const preview = previews.get(id);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImages((current) => current.filter((item) => item.id !== id));
  }

  async function onSubmit(formData: PortfolioStepData) {
    setApiError(null);

    try {
      await submitMutation.mutateAsync({
        imageCount: images.length,
        certificateCount: certificates.length,
        acceptRules: formData.acceptRules,
        profile: toMockEngineerProfileSnapshot({
          ...data,
          portfolio: {
            images,
            certificates,
            acceptRules: true,
          },
        }),
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitSubmitted({
      images,
      certificates,
      acceptRules: true,
    });
    router.push(registrationPaths.complete);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step9Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step9Description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        aria-label={registrationCopy.step9Title}
      >
        <PortfolioImageList
          items={images}
          previews={previews}
          disabled={isSubmitting}
          formatError={formatError}
          onAddFiles={addImages}
          onRemove={removeImage}
        />

        <CertificateFields
          items={certificates}
          disabled={isSubmitting}
          onAdd={() => {
            setCertificates((current) => [
              ...current,
              { id: createId(), title: "" },
            ]);
          }}
          onRemove={(id) => {
            setCertificates((current) =>
              current.filter((item) => item.id !== id),
            );
          }}
          onTitleChange={(id, title) => {
            setCertificates((current) =>
              current.map((item) =>
                item.id === id ? { ...item, title } : item,
              ),
            );
          }}
          onFileChange={(id, file) => {
            setCertificates((current) =>
              current.map((item) =>
                item.id === id ? { ...item, file } : item,
              ),
            );
          }}
        />

        <Field invalid={Boolean(errors.acceptRules)}>
          <div className="flex items-start gap-3">
            <Controller
              control={control}
              name="acceptRules"
              render={({ field }) => (
                <Checkbox
                  id="reg-accept-rules"
                  checked={field.value === true}
                  disabled={isSubmitting}
                  onCheckedChange={(checked) => {
                    field.onChange(checked === true ? true : undefined);
                  }}
                  aria-invalid={Boolean(errors.acceptRules)}
                  className="mt-0.5 shrink-0"
                />
              )}
            />
            <label
              htmlFor="reg-accept-rules"
              className="type-body-sm cursor-pointer text-foreground"
            >
              {registrationCopy.acceptRulesLabel}
            </label>
          </div>
          <FieldError>{errors.acceptRules?.message}</FieldError>
        </Field>

        {apiError ? (
          <RegistrationError
            message={apiError}
            onRetry={() => {
              void handleSubmit(onSubmit)();
            }}
          />
        ) : null}

        <RegistrationStepNav
          continueLabel={registrationCopy.finalSubmitLabel}
          onBack={() => {
            router.push(registrationPaths.resume);
          }}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || submitMutation.isPending}
          isContinueDisabled={
            isSubmitting || submitMutation.isPending || acceptRules !== true
          }
        />
      </form>
    </div>
  );
}
