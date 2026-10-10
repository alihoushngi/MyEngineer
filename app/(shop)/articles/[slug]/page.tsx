import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeRouteSlug } from "@/lib/content/decode-route-slug/decode-route-slug";
import { ContentStructuredData } from "@/components/store/content/contentStructuredData/contentStructuredData";
import { ArticleDetailPage } from "@/components/store/article/articleDetailPage/articleDetailPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { relatedArticlesByTag } from "@/lib/articles/related-articles-by-tag/related-articles-by-tag";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { listArticleComments } from "@/services/article-comment-service/article-comment-service";
import {
  getArticleBySlug,
  listArticleCategories,
  listArticles,
} from "@/services/article-service/article-service";

type ArticleDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticleDetailRouteProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const article = await getArticleBySlug(slug);

  if (!article) {
    return notFoundMetadata;
  }

  return {
    title: `${article.title} | ${articlesCopy.hubTitle}`,
    description: article.excerpt ?? articlesCopy.metadataDescription,
    alternates: {
      canonical: article.href,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? articlesCopy.metadataDescription,
      type: "article",
      locale: "fa_IR",
      siteName: "مهندس من",
      ...(article.coverSrc
        ? { images: [{ url: article.coverSrc, alt: article.title }] }
        : {}),
      ...(article.author ? { authors: [article.author] } : {}),
    },
  };
}

export default async function ArticleDetailRoutePage({
  params,
}: ArticleDetailRouteProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [categories, catalog, comments] = await Promise.all([
    listArticleCategories(),
    listArticles(),
    listArticleComments(article.id),
  ]);

  return (
    <>
      <ContentStructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          ...(article.excerpt ? { description: article.excerpt } : {}),
          ...(article.coverSrc ? { image: article.coverSrc } : {}),
          ...(article.publishedAt &&
          Number.isFinite(Date.parse(article.publishedAt))
            ? { datePublished: new Date(article.publishedAt).toISOString() }
            : {}),
        }}
      />
      <ArticleDetailPage
        article={article}
        categories={categories}
        related={relatedArticlesByTag(catalog, article)}
        comments={comments}
      />
    </>
  );
}
