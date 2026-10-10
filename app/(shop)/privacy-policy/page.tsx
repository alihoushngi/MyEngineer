import { type Metadata } from "next";
import { LegalPage } from "@/components/store/legal/legalPage/legalPage";
import {
  privacyCopy,
  privacyDocument,
} from "@/config/legal.config/legal.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export const metadata: Metadata = {
  title: privacyCopy.breadcrumb,
  description: privacyCopy.metadataDescription,
  openGraph: {
    title: privacyCopy.title,
    description: privacyCopy.metadataDescription,
    type: "website",
    locale: "fa_IR",
    siteName: "مهندس من",
  },
  alternates: {
    canonical: storePaths.privacy,
  },
};

export default function PrivacyPolicyRoutePage() {
  return (
    <LegalPage
      title={privacyCopy.title}
      intro={privacyCopy.intro}
      breadcrumbLabel={privacyCopy.breadcrumb}
      document={privacyDocument}
      relatedHref={storePaths.terms}
      relatedLabel={privacyCopy.relatedLabel}
    />
  );
}
