import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeRouteSlug } from "@/lib/content/decode-route-slug/decode-route-slug";
import { ArticleCategoryPage } from "@/components/store/article/articleCategoryPage/articleCategoryPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { recommendArticles } from "@/lib/articles/recommend-articles/recommend-articles";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  getArticleCategory,
  listArticleCategories,
  listArticles,
  listArticlesByCategory,
} from "@/services/article-service/article-service";

type ArticleCategoryRouteProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: ArticleCategoryRouteProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const category = await getArticleCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  const page = paginateItems(
    await listArticlesByCategory(slug),
    parsePageParam((await searchParams).page),
  ).page;
  const title =
    page > 1
      ? `${category.title} — صفحه ${page}`
      : `${category.title} | ${articlesCopy.hubTitle}`;

  return {
    title,
    description: category.description ?? articlesCopy.metadataDescription,
    openGraph: {
      title,
      description: category.description ?? articlesCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
    alternates: {
      canonical: page > 1 ? `${category.href}?page=${page}` : category.href,
    },
  };
}

export default async function ArticleCategoryRoutePage({
  params,
  searchParams,
}: ArticleCategoryRouteProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const category = await getArticleCategory(slug);

  if (!category) {
    notFound();
  }

  const [articles, catalog, categories] = await Promise.all([
    listArticlesByCategory(slug),
    listArticles(),
    listArticleCategories().catch(() => []),
  ]);
  const pagination = paginateItems(
    articles,
    parsePageParam((await searchParams).page),
  );
  const recommended = recommendArticles(catalog, {
    excludeSlugs: pagination.items.map((article) => article.slug),
    categorySlug: slug,
    seedTags: pagination.items.flatMap((article) => article.tags ?? []),
  });

  return (
    <ArticleCategoryPage
      category={category}
      categories={categories}
      articles={pagination.items}
      recommended={recommended}
      pagination={pagination}
      pathname={category.href}
    />
  );
}
