import * as yup from "yup";
import { OTP_LENGTH } from "@/lib/validation/otp-length/otp-length";

export const loginOtpSchema = yup.object({
  code: yup
    .string()
    .required("کد تأیید الزامی است.")
    .matches(
      new RegExp(`^\\d{${OTP_LENGTH}}$`),
      `کد تأیید باید دقیقاً ${OTP_LENGTH} رقم باشد.`,
    ),
});

export type LoginOtpData = yup.InferType<typeof loginOtpSchema>;
