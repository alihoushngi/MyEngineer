import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeRouteSlug } from "@/lib/content/decode-route-slug/decode-route-slug";
import { KnowledgeCategoryPage } from "@/components/store/knowledge/knowledgeCategoryPage/knowledgeCategoryPage";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  getKnowledgeCategory,
  listKnowledgeCategories,
} from "@/services/knowledge-service/knowledge-service";

type KnowledgeCategoryRouteProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: KnowledgeCategoryRouteProps): Promise<Metadata> {
  const { category: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const category = await getKnowledgeCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  const page = paginateItems(
    category.tips,
    parsePageParam((await searchParams).page),
  ).page;
  const title =
    page > 1
      ? `${category.title} — صفحه ${page}`
      : `${category.title} | ${knowledgeCopy.landingTitle}`;

  return {
    title,
    description: category.description ?? knowledgeCopy.metadataDescription,
    openGraph: {
      title,
      description: category.description ?? knowledgeCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
    alternates: {
      canonical: page > 1 ? `${category.href}?page=${page}` : category.href,
    },
  };
}

export default async function KnowledgeCategoryRoutePage({
  params,
  searchParams,
}: KnowledgeCategoryRouteProps) {
  const { category: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const categories = await listKnowledgeCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const pagination = paginateItems(
    category.tips,
    parsePageParam((await searchParams).page),
  );

  return (
    <KnowledgeCategoryPage
      category={category}
      categories={categories}
      tips={pagination.items}
      pagination={pagination}
      pathname={category.href}
    />
  );
}
