export type ContactFormValues = {
  name: string;
  family: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export const CONTACT_MESSAGE_MAX_LENGTH = 200;

/** Per-field validation for the contact form; empty object means valid. */
export function validateContactMessage(
  values: ContactFormValues,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "نام را وارد کنید (حداقل ۲ نویسه).";
  }

  if (values.family.trim().length < 2) {
    errors.family = "نام خانوادگی را وارد کنید (حداقل ۲ نویسه).";
  }

  if (!/^09\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = "شماره موبایل را به‌صورت 09xxxxxxxxx وارد کنید.";
  }

  const email = values.email.trim();
  if (email !== "" && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "ایمیل واردشده معتبر نیست.";
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "موضوع پیام را وارد کنید (حداقل ۳ نویسه).";
  }

  const message = values.message.trim();
  if (message.length < 5) {
    errors.message = "متن پیام باید حداقل ۵ نویسه باشد.";
  } else if (message.length > CONTACT_MESSAGE_MAX_LENGTH) {
    errors.message = `متن پیام حداکثر ${CONTACT_MESSAGE_MAX_LENGTH} نویسه می‌تواند باشد.`;
  }

  return errors;
}
