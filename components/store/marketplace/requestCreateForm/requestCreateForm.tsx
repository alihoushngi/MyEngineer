"use client";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { RequestCreateFields } from "@/components/store/marketplace/requestCreateFields/requestCreateFields";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";
import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { type ServiceSlug } from "@/config/services.config/services.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { env } from "@/lib/env/env";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  createServiceRequestSchema,
  isCreateServiceSlug,
  type CreateServiceRequestFormValues,
} from "@/lib/validation/marketplace/create-service-request.schema";
import { createServiceRequest } from "@/services/user-marketplace-service/user-marketplace-service";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type RequestCreateFormProps = {
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
  lockedExpertId?: string;
  lockedServiceSlug?: ServiceSlug;
  defaultCityId?: string;
  onSuccess?: () => void;
};

export function RequestCreateForm({
  experts,
  cities,
  lockedExpertId,
  lockedServiceSlug,
  defaultCityId,
  onSuccess,
}: RequestCreateFormProps) {
  const router = useRouter();
  const mutation = useApiMutation(createServiceRequest);
  const lockedExpert = experts.find((item) => item.id === lockedExpertId);
  const initialExpert = lockedExpert ?? experts[0];
  const form = useForm<CreateServiceRequestFormValues>({
    resolver: yupResolver(
      createServiceRequestSchema,
    ) as Resolver<CreateServiceRequestFormValues>,
    defaultValues: {
      expertId: initialExpert?.id ?? "",
      serviceSlug: lockedServiceSlug ?? initialExpert?.serviceSlugs?.[0] ?? "",
      cityId: initialExpert?.cityId ?? defaultCityId ?? "",
      description: "",
    },
  });

  async function onSubmit(values: CreateServiceRequestFormValues) {
    if (!isCreateServiceSlug(values.serviceSlug)) {
      return;
    }

    const requestId = await mutation.mutateAsync({
      expertId: values.expertId,
      serviceSlug: values.serviceSlug,
      cityId: values.cityId,
      description: values.description,
    });
    onSuccess?.();
    router.push(`${userAccountPaths.requests}/${requestId}`);
  }

  if (experts.length === 0) {
    return (
      <p className="type-body leading-loose text-foreground">
        {marketplaceCopy.noExpertsToRequest}
      </p>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      {env.apiBaseUrl ? null : (
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>{marketplaceCopy.mockNotProductionTitle}</AlertTitle>
          <AlertDescription>
            {marketplaceCopy.mockNotProductionDescription}
          </AlertDescription>
        </Alert>
      )}
      {mutation.isError ? (
        <Alert variant="danger">
          <AlertTitle>
            {toUserErrorMessage(
              mutation.error,
              marketplaceCopy.mutationErrorFallback,
            )}
          </AlertTitle>
        </Alert>
      ) : null}
      <RequestCreateFields
        control={form.control}
        errors={form.formState.errors}
        experts={experts}
        cities={cities}
        lockedExpertName={lockedExpert?.name}
        lockedServiceSlug={lockedServiceSlug}
        setValue={form.setValue}
      />
      <Field invalid={Boolean(form.formState.errors.description)}>
        <FieldLabel htmlFor="request-description" required>
          {marketplaceCopy.descriptionLabel}
        </FieldLabel>
        <Textarea
          id="request-description"
          rows={5}
          {...form.register("description")}
        />
        <FieldHint>{marketplaceCopy.descriptionHint}</FieldHint>
        <FieldError>{form.formState.errors.description?.message}</FieldError>
      </Field>
      <Button
        type="submit"
        className="w-full"
        loading={form.formState.isSubmitting}
      >
        {marketplaceCopy.createRequestSubmit}
      </Button>
    </form>
  );
}
