"use client";

import { Field, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Switch } from "@/components/ui/switch/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { useProvinceCities } from "@/hooks/use-province-cities/use-province-cities";

export type ProfileExtendedValues = {
  birthday: string;
  maritalStatus: string;
  workingYears: string;
  textContact: string;
  showMobile: boolean;
  showImage: boolean;
  provinceId: string;
  cityId: string;
};

type UserProfileExtendedFieldsProps = {
  value: ProfileExtendedValues;
  onChange: (value: ProfileExtendedValues) => void;
  disabled: boolean;
};

export function UserProfileExtendedFields({
  value,
  onChange,
  disabled,
}: UserProfileExtendedFieldsProps) {
  const {
    provinces,
    cities,
    isLoadingProvinces,
    isLoadingCities,
    setSelectedProvince,
  } = useProvinceCities({ initialProvinceId: value.provinceId });

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-birthday">تاریخ تولد</FieldLabel>
          <Input
            id="profile-birthday"
            type="date"
            value={value.birthday}
            onChange={(event) =>
              onChange({ ...value, birthday: event.target.value })
            }
            disabled={disabled}
            dir="ltr"
            className="ltr-data"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-marital">وضعیت تأهل</FieldLabel>
          <Select
            value={value.maritalStatus || "unset"}
            onValueChange={(next) =>
              onChange({
                ...value,
                maritalStatus: next === "unset" ? "" : next,
              })
            }
            disabled={disabled}
          >
            <SelectTrigger id="profile-marital" className="w-full">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unset">نامشخص</SelectItem>
              <SelectItem value="single">مجرد</SelectItem>
              <SelectItem value="married">متأهل</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-working-years">سابقه کار (سال)</FieldLabel>
          <Input
            id="profile-working-years"
            value={value.workingYears}
            onChange={(event) =>
              onChange({ ...value, workingYears: event.target.value })
            }
            disabled={disabled}
            dir="ltr"
            className="ltr-data"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-text-contact">راه‌های پیامکی</FieldLabel>
          <Input
            id="profile-text-contact"
            value={value.textContact}
            onChange={(event) =>
              onChange({ ...value, textContact: event.target.value })
            }
            disabled={disabled}
            dir="ltr"
            className="ltr-data"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-province">استان</FieldLabel>
          <Select
            value={value.provinceId || "unset"}
            onValueChange={(next) => {
              const provinceId = next === "unset" ? "" : next;
              setSelectedProvince(provinceId);
              onChange({ ...value, provinceId, cityId: "" });
            }}
            disabled={disabled || isLoadingProvinces}
          >
            <SelectTrigger id="profile-province" className="w-full">
              <SelectValue placeholder="انتخاب استان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unset">انتخاب نشده</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-city">شهر</FieldLabel>
          <Select
            value={value.cityId || "unset"}
            onValueChange={(next) =>
              onChange({ ...value, cityId: next === "unset" ? "" : next })
            }
            disabled={disabled || !value.provinceId || isLoadingCities}
          >
            <SelectTrigger id="profile-city" className="w-full">
              <SelectValue placeholder="انتخاب شهر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unset">انتخاب نشده</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label
          htmlFor="profile-show-mobile"
          className="flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-surface-subtle px-4 py-3"
        >
          <span className="type-body-sm text-foreground">نمایش موبایل</span>
          <Switch
            id="profile-show-mobile"
            checked={value.showMobile}
            onCheckedChange={(checked) =>
              onChange({ ...value, showMobile: checked })
            }
            disabled={disabled}
          />
        </label>
        <label
          htmlFor="profile-show-image"
          className="flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-surface-subtle px-4 py-3"
        >
          <span className="type-body-sm text-foreground">نمایش تصویر</span>
          <Switch
            id="profile-show-image"
            checked={value.showImage}
            onCheckedChange={(checked) =>
              onChange({ ...value, showImage: checked })
            }
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
}
