import { type Metadata } from "next";
import { FaqLandingPage } from "@/components/store/faq/faqLandingPage/faqLandingPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  listFaqCategories,
  searchFaq,
} from "@/services/faq-service/faq-service";

type FaqRouteProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: FaqRouteProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered =
    (Array.isArray(params.q) ? params.q[0] : params.q)?.trim() !== "" &&
    params.q !== undefined;
  return {
    title: faqCopy.landingTitle,
    description: faqCopy.metadataDescription,
    alternates: { canonical: storePaths.faq },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: faqCopy.landingTitle,
      description: faqCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
  };
}

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
