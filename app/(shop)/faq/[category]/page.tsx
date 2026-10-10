import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeRouteSlug } from "@/lib/content/decode-route-slug/decode-route-slug";
import { ContentStructuredData } from "@/components/store/content/contentStructuredData/contentStructuredData";
import { FaqCategoryPage } from "@/components/store/faq/faqCategoryPage/faqCategoryPage";
import { faqCopy } from "@/config/faq.config/faq.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { getFaqCategory } from "@/services/faq-service/faq-service";

type FaqCategoryRouteProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: FaqCategoryRouteProps): Promise<Metadata> {
  const { category: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const category = await getFaqCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  const page = paginateItems(
    category.items,
    parsePageParam((await searchParams).page),
  ).page;
  const title =
    page > 1
      ? `${category.title} — صفحه ${page}`
      : `${category.title} | ${faqCopy.landingTitle}`;

  return {
    title,
    description: category.description ?? faqCopy.metadataDescription,
    openGraph: {
      title,
      description: category.description ?? faqCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
    alternates: {
      canonical: page > 1 ? `${category.href}?page=${page}` : category.href,
    },
  };
}

export default async function FaqCategoryRoutePage({
  params,
  searchParams,
}: FaqCategoryRouteProps) {
  const { category: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  const category = await getFaqCategory(slug);

  if (!category) {
    notFound();
  }

  const pagination = paginateItems(
    category.items,
    parsePageParam((await searchParams).page),
  );

  return (
    <>
      {pagination.items.length > 0 ? (
        <ContentStructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pagination.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      ) : null}
      <FaqCategoryPage
        category={category}
        items={pagination.items}
        pagination={pagination}
        pathname={category.href}
      />
    </>
  );
}
