
export type CareerApplyValues = {
  name: string;
  family: string;
  email: string;
  mobile: string;
  age: string;
  gender: string;
  provinceId: string;
  cityId: string;
  /** Pre-computed file validation message (see validateUpload), or null. */
  resumeError: string | null;
};

export type CareerApplyFieldErrors = Partial<
  Record<keyof CareerApplyValues, string>
>;

/** Per-field validation for the career apply form; empty object means valid. */
export function validateCareerApply(
  values: CareerApplyValues,
): CareerApplyFieldErrors {
  const errors: CareerApplyFieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "نام را وارد کنید (حداقل ۲ نویسه).";
  }

  if (values.family.trim().length < 2) {
    errors.family = "نام خانوادگی را وارد کنید (حداقل ۲ نویسه).";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "ایمیل معتبر وارد کنید.";
  }

  if (!/^09\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = "شماره موبایل را به‌صورت 09xxxxxxxxx وارد کنید.";
  }

  const age = Number(values.age);
  if (!Number.isFinite(age) || age < 18 || age > 80) {
    errors.age = "سن باید بین ۱۸ تا ۸۰ سال باشد.";
  }

  if (values.gender !== "male" && values.gender !== "female") {
    errors.gender = "جنسیت را انتخاب کنید.";
  }

  if (!values.provinceId) {
    errors.provinceId = "استان را انتخاب کنید.";
  }

  if (!values.cityId) {
    errors.cityId = "شهر را انتخاب کنید.";
  }

  if (values.resumeError) {
    errors.resumeError = values.resumeError;
  }

  return errors;
}
