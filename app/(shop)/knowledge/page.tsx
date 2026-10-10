import { type Metadata } from "next";
import { KnowledgeLandingPage } from "@/components/store/knowledge/knowledgeLandingPage/knowledgeLandingPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  listKnowledgeCategories,
  listKnowledgeLanding,
} from "@/services/knowledge-service/knowledge-service";

type KnowledgeRouteProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
};

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export async function generateMetadata({
  searchParams,
}: KnowledgeRouteProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered = first(params.q) !== "" || first(params.category) !== "";
  return {
    title: knowledgeCopy.landingTitle,
    description: knowledgeCopy.metadataDescription,
    alternates: { canonical: storePaths.knowledge },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: knowledgeCopy.landingTitle,
      description: knowledgeCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
  };
}

export default async function KnowledgeRoutePage({
  searchParams,
}: KnowledgeRouteProps) {
  const params = await searchParams;
  const q = first(params.q).slice(0, 100);
  const category = first(params.category);
  const [allCategories, categories, details] = await Promise.all([
    listKnowledgeLanding({}),
    q || category ? listKnowledgeLanding({ q, category }) : undefined,
    listKnowledgeCategories().catch(() => []),
  ]);
  const previewTips = new Map(
    details.map((item) => [
      item.slug,
      item.tips.find((tip) => tip.body?.trim() || tip.title.trim()),
    ]),
  );

  return (
    <KnowledgeLandingPage
      categories={(categories ?? allCategories).map((item) => ({
        ...item,
        previewTip: previewTips.get(item.slug),
      }))}
      categoryOptions={allCategories}
      q={q}
      category={category}
    />
  );
}
