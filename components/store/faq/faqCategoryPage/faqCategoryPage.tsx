import Link from "next/link";
import { ArrowLeftIcon, CircleHelpIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { FaqCategoryCard } from "@/components/store/faq/faqCategoryCard/faqCategoryCard";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { faqCopy } from "@/config/faq.config/faq.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import { type FaqCategoryDetail, type FaqItem } from "@/types/store/faq.types";

type FaqCategoryPageProps = {
  category: FaqCategoryDetail;
  items: readonly FaqItem[];
  pagination: PaginatedItems<FaqItem>;
  pathname: string;
};

export function FaqCategoryPage({
  category,
  items,
  pagination,
  pathname,
}: FaqCategoryPageProps) {
  const related = category.relatedCategories ?? [];

  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-20 -z-10 size-112 rounded-full bg-primary/5 blur-[140px]"
      />

      <div className="container-narrow flex flex-col gap-8">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: faqCopy.breadcrumb, href: storePaths.faq },
            { label: category.title },
          ]}
        />

        <ContentPageHeader
          title={category.title}
          description={category.description}
        />

        {pagination.total > 0 ? (
          <div className="flex flex-col gap-6">
            <FaqAccordion items={items} />

            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              ariaLabel={faqCopy.paginationLabel}
              pathname={pathname}
            />
          </div>
        ) : (
          <Empty
            icon={<CircleHelpIcon aria-hidden="true" />}
            title={faqCopy.emptyCategoryTitle}
            description={faqCopy.emptyCategoryDescription}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.faq}>{faqCopy.browseCta}</Link>
              </Button>
            }
          />
        )}

        {category.relatedServiceHref && category.relatedServiceLabel ? (
          <div className="rounded-3xl border border-primary/10 bg-primary-subtle/60 p-4 sm:p-5">
            <Button
              asChild
              className="w-full min-w-0 gap-2 whitespace-normal sm:w-auto"
            >
              <Link href={category.relatedServiceHref}>
                <span className="min-w-0">
                  {faqCopy.serviceCtaLabel}: {category.relatedServiceLabel}
                </span>
                <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
              </Link>
            </Button>
          </div>
        ) : null}

        {related.length > 0 ? (
          <section
            aria-labelledby="faq-related-heading"
            className="border-t border-border-subtle pt-8"
          >
            <div className="mb-5">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary-subtle px-3 py-1 type-caption font-semibold text-primary">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-primary"
                />
                بیشتر بخوانید
              </p>

              <h2
                id="faq-related-heading"
                className="mt-3 type-h3 text-foreground"
              >
                {faqCopy.relatedCategoriesHeading}
              </h2>
            </div>

            <ul className="grid items-stretch gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <FaqCategoryCard category={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
