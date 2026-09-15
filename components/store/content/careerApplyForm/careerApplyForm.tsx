"use client";

import { RefreshCwIcon } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { useProvinceCities } from "@/hooks/use-province-cities/use-province-cities";
import { applyCareerAction } from "@/services/content-service/content-actions";

type CareerApplyFormProps = {
  careerId: string;
  careerTitle: string;
};

export function CareerApplyForm({
  careerId,
  careerTitle,
}: CareerApplyFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [gender, setGender] = useState("");
  const [cityId, setCityId] = useState("");

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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("careerId", careerId);
    formData.set("gender", gender);
    formData.set("provinceId", selectedProvinceId);
    formData.set("cityId", cityId);

    startTransition(async () => {
      const result = await applyCareerAction(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess("درخواست همکاری شما ثبت شد.");
      form.reset();
      setGender("");
      setSelectedProvince("");
      setCityId("");
    });
  }

  return (
    <section
      aria-labelledby="career-apply-heading"
      className="mt-12 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <h2 id="career-apply-heading" className="type-h3 text-foreground">
        درخواست همکاری
      </h2>
      <p className="mt-2 type-body-sm text-foreground-muted">
        برای «{careerTitle}» فرم زیر را تکمیل کنید.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="career-name" required>
              نام
            </FieldLabel>
            <Input id="career-name" name="name" required disabled={pending} />
          </Field>
          <Field>
            <FieldLabel htmlFor="career-family" required>
              نام خانوادگی
            </FieldLabel>
            <Input
              id="career-family"
              name="family"
              required
              disabled={pending}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="career-email" required>
              ایمیل
            </FieldLabel>
            <Input
              id="career-email"
              name="email"
              type="email"
              required
              disabled={pending}
              dir="ltr"
              className="ltr-data"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="career-mobile" required>
              موبایل
            </FieldLabel>
            <Input
              id="career-mobile"
              name="mobile"
              required
              disabled={pending}
              placeholder="09xxxxxxxxx"
              dir="ltr"
              className="ltr-data"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="career-age" required>
              سن
            </FieldLabel>
            <Input
              id="career-age"
              name="age"
              type="number"
              min={18}
              max={80}
              required
              disabled={pending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="career-gender" required>
              جنسیت
            </FieldLabel>
            <Select
              value={gender || undefined}
              onValueChange={setGender}
              disabled={pending}
            >
              <SelectTrigger id="career-gender" className="w-full">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">مرد</SelectItem>
                <SelectItem value="female">زن</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field invalid={Boolean(provinceError)}>
          <FieldLabel htmlFor="career-province" required>
            استان
          </FieldLabel>
          {provinceError ? (
            <div className="flex items-center justify-between gap-3">
              <p className="type-caption text-destructive">{provinceError}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={retryProvinces}
              >
                <RefreshCwIcon aria-hidden="true" className="size-4" />
                تلاش مجدد
              </Button>
            </div>
          ) : (
            <Select
              value={selectedProvinceId || undefined}
              onValueChange={(value) => {
                setSelectedProvince(value);
                setCityId("");
              }}
              disabled={pending || isLoadingProvinces}
            >
              <SelectTrigger id="career-province" className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingProvinces ? "در حال بارگذاری…" : "انتخاب استان"
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
        </Field>

        <Field invalid={Boolean(cityError)}>
          <FieldLabel htmlFor="career-city" required>
            شهر
          </FieldLabel>
          {cityError ? (
            <div className="flex items-center justify-between gap-3">
              <p className="type-caption text-destructive">{cityError}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={retryCities}
              >
                <RefreshCwIcon aria-hidden="true" className="size-4" />
                تلاش مجدد
              </Button>
            </div>
          ) : (
            <Select
              value={cityId || undefined}
              onValueChange={setCityId}
              disabled={
                pending ||
                !selectedProvinceId ||
                isLoadingCities ||
                cities.length === 0
              }
            >
              <SelectTrigger id="career-city" className="w-full">
                <SelectValue
                  placeholder={
                    !selectedProvinceId
                      ? "ابتدا استان را انتخاب کنید"
                      : isLoadingCities
                        ? "در حال بارگذاری…"
                        : "انتخاب شهر"
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
        </Field>

        <Field>
          <FieldLabel htmlFor="career-resume">رزومه (اختیاری)</FieldLabel>
          <Input
            id="career-resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            disabled={pending}
          />
        </Field>

        {error ? <FieldError>{error}</FieldError> : null}
        {success ? (
          <p className="type-body-sm text-success" role="status">
            {success}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="min-h-11 self-start">
          {pending ? "در حال ارسال…" : "ارسال درخواست"}
        </Button>
      </form>
    </section>
  );
}
