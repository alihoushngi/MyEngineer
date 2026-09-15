import { type Metadata } from "next";
import { ForgotPasswordForm } from "@/components/store/auth/forgotPasswordForm/forgotPasswordForm";

export const metadata: Metadata = {
  title: "بازیابی رمز عبور",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
