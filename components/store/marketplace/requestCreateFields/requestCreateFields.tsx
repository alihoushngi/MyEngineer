"use client";

import {
  BriefcaseBusinessIcon,
  MapPinIcon,
  UserRoundIcon,
  WrenchIcon,
} from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";

import { expertRequestDefaults } from "@/lib/marketplace/to-request-expert-option/to-request-expert-option";
import { type CreateServiceRequestFormValues } from "@/lib/validation/marketplace/create-service-request.schema";

import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type RequestCreateFieldsProps = {
  control: Control<CreateServiceRequestFormValues>;
  errors: FieldErrors<CreateServiceRequestFormValues>;
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
  lockedExpertName?: string;
  lockedServiceSlug?: ServiceSlug;
  setValue: UseFormSetValue<CreateServiceRequestFormValues>;
};

export function RequestCreateFields({
  control,
  errors,
  experts,
  cities,
  lockedExpertName,
  lockedServiceSlug,
  setValue,
}: RequestCreateFieldsProps) {
  const lockedService = lockedServiceSlug
    ? serviceCategories.find((service) => service.slug === lockedServiceSlug)
    : undefined;

  return (
    <div className="grid gap-5">
      {lockedExpertName ? (
        <div className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary-subtle/50 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UserRoundIcon aria-hidden="true" className="size-4" />
          </span>

          <div className="min-w-0">
            <p className="type-caption text-foreground-muted">
              {marketplaceCopy.expertLabel}
            </p>
            <p className="mt-1 type-body font-semibold text-foreground">
              {lockedExpertName}
            </p>
          </div>
        </div>
      ) : (
        <Field invalid={Boolean(errors.expertId)}>
          <FieldLabel htmlFor="request-expert" required>
            <span className="inline-flex items-center gap-2">
              <UserRoundIcon
                aria-hidden="true"
                className="size-4 text-primary"
              />
              {marketplaceCopy.expertLabel}
            </span>
          </FieldLabel>

          <Controller
            control={control}
            name="expertId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);

                  const defaults = expertRequestDefaults(
                    experts.find((item) => item.id === value),
                    lockedServiceSlug,
                  );

                  if (defaults.cityId) {
                    setValue("cityId", defaults.cityId, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }

                  if (defaults.serviceSlug) {
                    setValue("serviceSlug", defaults.serviceSlug, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }
                }}
              >
                <SelectTrigger id="request-expert">
                  <SelectValue
                    placeholder={marketplaceCopy.expertPlaceholder}
                  />
                </SelectTrigger>

                <SelectContent>
                  {experts.map((expert) => (
                    <SelectItem key={expert.id} value={expert.id}>
                      {expert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FieldError>{errors.expertId?.message}</FieldError>
        </Field>
      )}

      {lockedServiceSlug ? (
        <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
            <BriefcaseBusinessIcon aria-hidden="true" className="size-4" />
          </span>

          <div className="min-w-0">
            <p className="type-caption text-foreground-muted">
              {marketplaceCopy.serviceLabel}
            </p>
            <p className="mt-1 type-body font-semibold text-foreground">
              {lockedService?.label ?? lockedServiceSlug}
            </p>
          </div>
        </div>
      ) : (
        <Field invalid={Boolean(errors.serviceSlug)}>
          <FieldLabel htmlFor="request-service" required>
            <span className="inline-flex items-center gap-2">
              <WrenchIcon aria-hidden="true" className="size-4 text-primary" />
              {marketplaceCopy.serviceLabel}
            </span>
          </FieldLabel>

          <Controller
            control={control}
            name="serviceSlug"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="request-service">
                  <SelectValue
                    placeholder={marketplaceCopy.servicePlaceholder}
                  />
                </SelectTrigger>

                <SelectContent>
                  {serviceCategories.map((service) => (
                    <SelectItem key={service.slug} value={service.slug}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FieldError>{errors.serviceSlug?.message}</FieldError>
        </Field>
      )}

      <Field invalid={Boolean(errors.cityId)}>
        <FieldLabel htmlFor="request-city" required>
          <span className="inline-flex items-center gap-2">
            <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
            {marketplaceCopy.cityLabel}
          </span>
        </FieldLabel>

        <Controller
          control={control}
          name="cityId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="request-city">
                <SelectValue placeholder={marketplaceCopy.cityPlaceholder} />
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

        <FieldError>{errors.cityId?.message}</FieldError>
      </Field>
    </div>
  );
}
