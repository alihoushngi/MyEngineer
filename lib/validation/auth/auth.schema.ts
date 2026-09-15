import * as yup from "yup";

export const melliLoginSchema = yup.object({
  melli: yup
    .string()
    .required("کد ملی را وارد کنید.")
    .matches(/^\d{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد."),
  password: yup.string().required("رمز عبور را وارد کنید."),
});

export type MelliLoginData = yup.InferType<typeof melliLoginSchema>;

export const registerAccountSchema = yup.object({
  name: yup.string().trim().required("نام را وارد کنید."),
  family: yup.string().trim().required("نام خانوادگی را وارد کنید."),
  mobile: yup
    .string()
    .required("شماره موبایل را وارد کنید.")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست."),
  melli: yup
    .string()
    .required("کد ملی را وارد کنید.")
    .matches(/^\d{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد."),
  email: yup.string().email("ایمیل معتبر نیست.").optional(),
  password: yup
    .string()
    .required("رمز عبور را وارد کنید.")
    .min(8, "رمز عبور باید حداقل ۸ نویسه باشد.")
    .matches(/[A-Za-z]/, "رمز عبور باید شامل حرف باشد.")
    .matches(/\d/, "رمز عبور باید شامل عدد باشد."),
  password_confirmation: yup
    .string()
    .required("تکرار رمز عبور را وارد کنید.")
    .oneOf([yup.ref("password")], "تکرار رمز عبور یکسان نیست."),
});

export type RegisterAccountData = yup.InferType<typeof registerAccountSchema>;

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("رمز عبور جدید را وارد کنید.")
    .min(8, "رمز عبور باید حداقل ۸ نویسه باشد.")
    .matches(/[A-Za-z]/, "رمز عبور باید شامل حرف باشد.")
    .matches(/\d/, "رمز عبور باید شامل عدد باشد."),
  password_confirmation: yup
    .string()
    .required("تکرار رمز عبور را وارد کنید.")
    .oneOf([yup.ref("password")], "تکرار رمز عبور یکسان نیست."),
});

export type ResetPasswordData = yup.InferType<typeof resetPasswordSchema>;
