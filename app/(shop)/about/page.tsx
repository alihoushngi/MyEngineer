import { type Metadata } from "next";
import { AboutPage } from "@/components/store/about/aboutPage/aboutPage";
import { aboutCopy } from "@/config/about.config/about.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  listBrands,
  listTeamMembers,
} from "@/services/content-service/content-service";

export const metadata: Metadata = {
  title: aboutCopy.breadcrumb,
  description: aboutCopy.metadataDescription,
  openGraph: {
    title: aboutCopy.title,
    description: aboutCopy.metadataDescription,
    type: "website",
    locale: "fa_IR",
    siteName: "مهندس من",
  },
  alternates: {
    canonical: storePaths.about,
  },
};

export default async function AboutRoutePage() {
  const [teamMembers, brands] = await Promise.all([
    listTeamMembers().catch(() => []),
    listBrands().catch(() => []),
  ]);

  return <AboutPage teamMembers={teamMembers} brands={brands} />;
}
