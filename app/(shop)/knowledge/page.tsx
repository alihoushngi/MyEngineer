import { type Metadata } from "next";
import { KnowledgeLandingPage } from "@/components/store/knowledge/knowledgeLandingPage/knowledgeLandingPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listKnowledgeLanding } from "@/services/knowledge-service/knowledge-service";

export const metadata: Metadata = {
  title: knowledgeCopy.landingTitle,
  description: knowledgeCopy.metadataDescription,
  alternates: {
    canonical: storePaths.knowledge,
  },
};

type KnowledgeRouteProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
};

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function KnowledgeRoutePage({
  searchParams,
}: KnowledgeRouteProps) {
  const params = await searchParams;
  const q = first(params.q).slice(0, 100);
  const category = first(params.category);
  const [allCategories, categories] = await Promise.all([
    listKnowledgeLanding({}),
    q || category ? listKnowledgeLanding({ q, category }) : undefined,
  ]);

  return (
    <KnowledgeLandingPage
      categories={categories ?? allCategories}
      categoryOptions={allCategories}
      q={q}
      category={category}
    />
  );
}
