import { type Metadata } from "next";
import { FormsPage } from "@/components/store/content/careersAndFormsPages/careersAndFormsPages";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listDownloadableForms } from "@/services/content-service/content-service";

export const metadata: Metadata = {
  title: "فرم‌های قابل‌دانلود",
  description: "دانلود فرم‌های فعال مهندس من",
  alternates: {
    canonical: storePaths.forms,
  },
};

export default async function FormsRoutePage() {
  const forms = await listDownloadableForms().catch(() => []);
  return <FormsPage forms={forms} />;
}
