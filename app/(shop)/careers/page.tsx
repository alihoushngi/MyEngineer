import { type Metadata } from "next";
import { CareersPage } from "@/components/store/content/careersAndFormsPages/careersAndFormsPages";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listCareers } from "@/services/content-service/content-service";

export const metadata: Metadata = {
  title: "فرصت‌های شغلی",
  description: "آگهی‌های شغلی فعال در مهندس من",
  alternates: {
    canonical: storePaths.careers,
  },
};

export default async function CareersRoutePage() {
  const careers = await listCareers().catch(() => []);
  return <CareersPage careers={careers} />;
}
