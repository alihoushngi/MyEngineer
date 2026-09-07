"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlertIcon, RefreshCcwIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  serviceAreaStepSchema,
  type ServiceAreaStepData,
} from "@/components/store/registration/serviceAreaStep/type/serviceAreaStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveServiceArea } from "@/services/registration-service/registration-service";
import { useProvinceCities } from "@/hooks/use-province-cities/use-province-cities";

export function ServiceAreaStep() {
  const router = useRouter();
  const { commitServiceArea, data } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveServiceArea);

  const {
    provinces,
    cities,
    isLoadingProvinces,
    isLoadingCities,
    provinceError,
    cityError,
    retryProvinces,
    retryCities,
    selectedProvinceId,
    setSelectedProvince,
  } = useProvinceCities();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceAreaStepData>({
    resolver: yupResolver(serviceAreaStepSchema),
    defaultValues: {
      provinceId: data.serviceArea?.provinceId ?? "",
      cityId: data.serviceArea?.cityId ?? "",
      nearbyCityIds: data.serviceArea?.nearbyCityIds
        ? [...data.serviceArea.nearbyCityIds]
        : ([] as string[]),
    },
  });

  async function onSubmit(formData: ServiceAreaStepData) {
    setApiError(null);

    try {
      await saveMutation.mutateAsync({
        provinceId: formData.provinceId,
        cityId: formData.cityId,
        nearbyCityIds: formData.nearbyCityIds,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitServiceArea({
      provinceId: formData.provinceId,
      cityId: formData.cityId,
      nearbyCityIds: formData.nearbyCityIds,
    });

    router.push("/expert-registration/expertise");
  }

  function handleBack() {
    router.push("/expert-registration/otp");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-h2 text-foreground">
          {registrationCopy.step3Title}
        </h2>
        <p className="type-body text-foreground-muted">
          {registrationCopy.step3Description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label={registrationCopy.step3Title}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Province selector */}
          <Field invalid={Boolean(errors.provinceId)}>
            <FieldLabel htmlFor="reg-province" required>
              {registrationCopy.provinceLabel}
            </FieldLabel>
            {provinceError ? (
              <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
                <p className="type-body-sm text-danger">
                  {registrationCopy.provinceErrorMessage}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={retryProvinces}
                  aria-label="تلاش مجدد برای بارگذاری استان‌ها"
                >
                  <RefreshCcwIcon className="size-4" />
                  {registrationCopy.retryLabel}
                </Button>
              </div>
            ) : (
              <Controller
                control={control}
                name="provinceId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedProvince(value);
                      // Clear city when province changes
                      setValue("cityId", "");
                    }}
                    disabled={isLoadingProvinces || isSubmitting}
                  >
                    <SelectTrigger
                      id="reg-province"
                      aria-invalid={Boolean(errors.provinceId)}
                      aria-describedby={
                        errors.provinceId ? "reg-province-error" : undefined
                      }
                    >
                      <SelectValue
                        placeholder={
                          isLoadingProvinces
                            ? registrationCopy.provinceLoadingMessage
                            : registrationCopy.provincePlaceholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            <FieldError id="reg-province-error">
              {errors.provinceId?.message}
            </FieldError>
          </Field>

          {/* City selector */}
          <Field invalid={Boolean(errors.cityId)}>
            <FieldLabel htmlFor="reg-city" required>
              {registrationCopy.cityLabel}
            </FieldLabel>
            {cityError ? (
              <div className="flex min-h-12 items-center gap-3 rounded-md border border-border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
                <p className="type-body-sm text-danger">
                  {registrationCopy.cityErrorMessage}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={retryCities}
                  aria-label="تلاش مجدد برای بارگذاری شهرها"
                >
                  <RefreshCcwIcon className="size-4" />
                  {registrationCopy.retryLabel}
                </Button>
              </div>
            ) : (
              <Controller
                control={control}
                name="cityId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={
                      !selectedProvinceId ||
                      isLoadingCities ||
                      cities.length === 0 ||
                      isSubmitting
                    }
                  >
                    <SelectTrigger
                      id="reg-city"
                      aria-invalid={Boolean(errors.cityId)}
                      aria-describedby={
                        errors.cityId ? "reg-city-error" : undefined
                      }
                    >
                      <SelectValue
                        placeholder={
                          !selectedProvinceId
                            ? registrationCopy.cityPlaceholder
                            : isLoadingCities
                              ? registrationCopy.cityLoadingMessage
                              : cities.length === 0
                                ? registrationCopy.cityEmptyMessage
                                : registrationCopy.cityPlaceholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            <FieldError id="reg-city-error">
              {errors.cityId?.message}
            </FieldError>
          </Field>
        </div>

        {selectedProvinceId &&
        !isLoadingCities &&
        !cityError &&
        cities.length === 0 ? (
          <Empty title={registrationCopy.cityEmptyMessage} />
        ) : null}

        {/* Nearby cities — API CONTRACT REQUIRED
            Implementation note: the nearby city list requires an API response
            scoped to the selected city/province (BUSINESS DECISION REQUIRED for radius).
            The field is rendered as disabled/note until the service is available. */}
        <Field>
          <FieldLabel>{registrationCopy.nearbyCitiesLabel}</FieldLabel>
          <Alert variant="info">
            <CircleAlertIcon />
            <AlertDescription>
              {registrationCopy.nearbyCitiesApiNote}
            </AlertDescription>
          </Alert>
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
          onBack={handleBack}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || saveMutation.isPending}
          isContinueDisabled={
            isSubmitting || saveMutation.isPending || isLoadingProvinces
          }
        />
      </form>
    </div>
  );
}
