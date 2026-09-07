import Link from "next/link";
import { BookOpenIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { KnowledgeCategoryCard } from "@/components/store/knowledge/knowledgeCategoryCard/knowledgeCategoryCard";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type KnowledgeCategory } from "@/types/store/knowledge.types";

type KnowledgeLandingPageProps = {
  categories: readonly KnowledgeCategory[];
};

const categoryTones = [
  "bg-category-blue",
  "bg-category-green",
  "bg-category-violet",
  "bg-category-orange",
] as const;

export function KnowledgeLandingPage({
  categories,
}: KnowledgeLandingPageProps) {
  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-24 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-0 -z-10 size-128 rounded-full bg-secondary/5 blur-[150px]"
      />

      <div className="container-app flex flex-col gap-8">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: knowledgeCopy.breadcrumb },
          ]}
        />

        <ContentPageHeader
          title={knowledgeCopy.landingTitle}
          description={knowledgeCopy.landingDescription}
        />

        {categories.length > 0 ? (
          <ul className="grid items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {categories.map((category, index) => (
              <li key={category.slug} className="h-full min-w-0">
                <KnowledgeCategoryCard
                  category={category}
                  tone={
                    categoryTones[index % categoryTones.length] ??
                    "bg-category-blue"
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            icon={<BookOpenIcon aria-hidden="true" />}
            title={knowledgeCopy.emptyTitle}
            description={knowledgeCopy.emptyDescription}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.home}>{knowledgeCopy.homeCta}</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
