import { type Metadata } from "next";
import { ContactPage } from "@/components/store/contact/contactPage/contactPage";
import { storePaths } from "@/config/navigation.config/navigation.config";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "ارسال پیام به تیم مهندس من",
  alternates: {
    canonical: storePaths.contact,
  },
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
