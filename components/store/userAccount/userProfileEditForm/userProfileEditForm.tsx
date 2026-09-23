"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { ProfileAvatarUpload } from "@/components/store/userAccount/profileAvatarUpload/profileAvatarUpload";
import {
  UserProfileExtendedFields,
  type ProfileExtendedValues,
} from "@/components/store/userAccount/userProfileExtendedFields/userProfileExtendedFields";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { updateProfileAction } from "@/services/profile-service/profile-actions";
import { type ProfileRecord } from "@/services/profile-service/profile-service";

type UserProfileEditFormProps = {
  profile: ProfileRecord;
};

function toDateInput(value?: string | null): string {
  return value?.slice(0, 10) ?? "";
}

function toExtendedValues(profile: ProfileRecord): ProfileExtendedValues {
  return {
    birthday: toDateInput(profile.birthday),
    maritalStatus: profile.marital_status ?? "",
    workingYears: profile.working_years ?? "",
    textContact: profile.text_contact ?? "",
    showMobile: profile.show_mobile !== "no",
    showImage: profile.show_image !== "no",
    provinceId:
      profile.province?.id != null ? String(profile.province.id) : "",
    cityId: profile.city?.id != null ? String(profile.city.id) : "",
  };
}

export function UserProfileEditForm({ profile }: UserProfileEditFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState(profile.name ?? "");
  const [family, setFamily] = useState(profile.family ?? "");
  const [email, setEmail] = useState(profile.email ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [gender, setGender] = useState(profile.gender ?? "");
  const [phoneContact, setPhoneContact] = useState(profile.phone_contact ?? "");
  const [extended, setExtended] = useState(() => toExtendedValues(profile));

  const displayName =
    [profile.name, profile.family].filter(Boolean).join(" ").trim() || "کاربر";

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await updateProfileAction({
        name: name.trim(),
        family: family.trim(),
        email: email.trim() || null,
        bio: bio.trim() || null,
        gender:
          gender === "male" || gender === "female" ? gender : undefined,
        phone_contact: phoneContact.trim() || undefined,
        birthday: extended.birthday || undefined,
        marital_status:
          extended.maritalStatus === "single" ||
          extended.maritalStatus === "married"
            ? extended.maritalStatus
            : undefined,
        working_years: extended.workingYears.trim() || undefined,
        text_contact: extended.textContact.trim() || undefined,
        show_mobile: extended.showMobile ? "yes" : "no",
        show_image: extended.showImage ? "yes" : "no",
        province_id: extended.provinceId
          ? Number(extended.provinceId)
          : undefined,
        city_id: extended.cityId ? Number(extended.cityId) : undefined,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess("اطلاعات حساب ذخیره شد.");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
    >
      <ProfileAvatarUpload
        currentImageSrc={resolveMediaUrl(profile.image)}
        displayName={displayName}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-name">نام</FieldLabel>
          <Input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={pending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-family">نام خانوادگی</FieldLabel>
          <Input
            id="profile-family"
            value={family}
            onChange={(event) => setFamily(event.target.value)}
            disabled={pending}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="profile-email">ایمیل</FieldLabel>
        <Input
          id="profile-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={pending}
          dir="ltr"
          className="ltr-data"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="profile-phone-contact">تلفن تماس</FieldLabel>
        <Input
          id="profile-phone-contact"
          value={phoneContact}
          onChange={(event) => setPhoneContact(event.target.value)}
          disabled={pending}
          dir="ltr"
          className="ltr-data"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="profile-gender">جنسیت</FieldLabel>
        <Select
          value={gender || "unset"}
          onValueChange={(value) =>
            setGender(value === "unset" ? "" : value)
          }
          disabled={pending}
        >
          <SelectTrigger id="profile-gender" className="w-full">
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unset">نامشخص</SelectItem>
            <SelectItem value="male">مرد</SelectItem>
            <SelectItem value="female">زن</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="profile-bio">درباره من</FieldLabel>
        <Textarea
          id="profile-bio"
          rows={4}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          disabled={pending}
        />
      </Field>

      <UserProfileExtendedFields
        value={extended}
        onChange={setExtended}
        disabled={pending}
      />

      <dl className="grid gap-3 rounded-2xl bg-surface-subtle p-4 sm:grid-cols-2">
        <div>
          <dt className="type-caption text-foreground-subtle">موبایل</dt>
          <dd className="mt-1 type-body-sm font-medium ltr-data" dir="ltr">
            {profile.mobile || "—"}
          </dd>
        </div>
        <div>
          <dt className="type-caption text-foreground-subtle">کد ملی</dt>
          <dd className="mt-1 type-body-sm font-medium ltr-data" dir="ltr">
            {profile.melli || "—"}
          </dd>
        </div>
      </dl>

      {error ? <FieldError>{error}</FieldError> : null}
      {success ? (
        <p className="type-body-sm text-success" role="status">
          {success}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="min-h-11 self-start">
        {pending ? "در حال ذخیره…" : "ذخیره تغییرات"}
      </Button>
    </form>
  );
}
