import { type Metadata } from "next";
import { FaqLandingPage } from "@/components/store/faq/faqLandingPage/faqLandingPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listFaqCategories, searchFaq } from "@/services/faq-service/faq-service";

export const metadata: Metadata = {
  title: faqCopy.landingTitle,
  description: faqCopy.metadataDescription,
  alternates: {
    canonical: storePaths.faq,
  },
};

type FaqRouteProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function FaqRoutePage({ searchParams }: FaqRouteProps) {
  const params = await searchParams;
  const rawQ = Array.isArray(params.q) ? params.q[0] : params.q;
  const q = rawQ?.trim().slice(0, 100) ?? "";

  if (q !== "") {
    const result = await searchFaq(q);

    return (
      <FaqLandingPage
        categories={result.categories}
        q={q}
        matchedItems={result.items}
      />
    );
  }

  const categories = await listFaqCategories();

  return <FaqLandingPage categories={categories} />;
}
