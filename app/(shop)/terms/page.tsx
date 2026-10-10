import { type Metadata } from "next";
import { LegalPage } from "@/components/store/legal/legalPage/legalPage";
import { termsCopy, termsDocument } from "@/config/legal.config/legal.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export const metadata: Metadata = {
  title: termsCopy.breadcrumb,
  description: termsCopy.metadataDescription,
  openGraph: {
    title: termsCopy.title,
    description: termsCopy.metadataDescription,
    type: "website",
    locale: "fa_IR",
    siteName: "مهندس من",
  },
  alternates: {
    canonical: storePaths.terms,
  },
};

export default function TermsRoutePage() {
  return (
    <LegalPage
      title={termsCopy.title}
      intro={termsCopy.intro}
      breadcrumbLabel={termsCopy.breadcrumb}
      document={termsDocument}
      relatedHref={storePaths.privacy}
      relatedLabel={termsCopy.relatedLabel}
    />
  );
}
