"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpertiseCatalogPicker } from "@/components/store/registration/expertiseCatalogPicker/expertiseCatalogPicker";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  expertiseStepSchema,
  type ExpertiseStepData,
} from "@/components/store/registration/expertiseStep/type/expertiseStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveExpertise } from "@/services/registration-service/registration-service";

export function ExpertiseStep() {
  const router = useRouter();
  const { data, commitExpertise } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveExpertise);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ExpertiseStepData>({
    resolver: yupResolver(expertiseStepSchema),
    defaultValues: {
      expertiseIds: data.expertise?.expertiseIds
        ? [...data.expertise.expertiseIds]
        : [],
      softwareIds: data.expertise?.softwareIds
        ? [...data.expertise.softwareIds]
        : [],
    },
  });

  const expertiseIds = watch("expertiseIds");
  const softwareIds = watch("softwareIds");
  const isBusy = isSubmitting || saveMutation.isPending;

  async function onSubmit(formData: ExpertiseStepData) {
    setApiError(null);

    try {
      await saveMutation.mutateAsync({
        expertiseIds: formData.expertiseIds,
        softwareIds: formData.softwareIds,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitExpertise({
      expertiseIds: formData.expertiseIds,
      softwareIds: formData.softwareIds,
    });
    router.push("/expert-registration/personal-info");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step4Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step4Description}
        </p>
      </div>

      <ExpertiseCatalogPicker
        expertiseIds={expertiseIds}
        softwareIds={softwareIds}
        setValue={setValue}
        disabled={isBusy}
      />

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
          router.push("/expert-registration/service-area");
        }}
        onContinue={() => {
          void handleSubmit(onSubmit)();
        }}
        isPending={isBusy}
        isContinueDisabled={isBusy}
      />
    </div>
  );
}
