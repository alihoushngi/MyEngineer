import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { KnowledgeTipList } from "@/components/store/knowledge/knowledgeTipList/knowledgeTipList";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import {
  type KnowledgeCategoryDetail,
  type KnowledgeTip,
} from "@/types/store/knowledge.types";

type KnowledgeCategoryPageProps = {
  category: KnowledgeCategoryDetail;
  tips: readonly KnowledgeTip[];
  pagination: PaginatedItems<KnowledgeTip>;
  pathname: string;
};

export function KnowledgeCategoryPage({
  category,
  tips,
  pagination,
  pathname,
}: KnowledgeCategoryPageProps) {
  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-20 -z-10 size-112 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-0 -z-10 size-112 rounded-full bg-secondary/5 blur-[140px]"
      />

      <div className="container-narrow flex flex-col gap-8">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: knowledgeCopy.breadcrumb, href: storePaths.knowledge },
            { label: category.title },
          ]}
        />

        <ContentPageHeader
          title={category.title}
          description={category.description}
        />

        {pagination.total > 0 ? (
          <div className="flex flex-col gap-6">
            <KnowledgeTipList tips={tips} />

            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              ariaLabel={knowledgeCopy.paginationLabel}
              pathname={pathname}
            />
          </div>
        ) : (
          <Empty
            icon={<BookOpenIcon aria-hidden="true" />}
            title={knowledgeCopy.emptyCategoryTitle}
            description={knowledgeCopy.emptyCategoryDescription}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.knowledge}>
                  {knowledgeCopy.browseCta}
                </Link>
              </Button>
            }
          />
        )}

        {category.relatedServiceHref && category.relatedServiceLabel ? (
          <div className="rounded-3xl border border-primary/10 bg-primary-subtle/60 p-4 sm:p-5">
            <Button
              asChild
              variant="outline"
              className="w-full min-w-0 gap-2 whitespace-normal sm:w-auto"
            >
              <Link href={category.relatedServiceHref}>
                <span className="min-w-0">
                  {knowledgeCopy.serviceCtaLabel}:{" "}
                  {category.relatedServiceLabel}
                </span>
                <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
