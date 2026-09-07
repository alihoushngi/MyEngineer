import Link from "next/link";
import { CircleHelpIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqCategoryCard } from "@/components/store/faq/faqCategoryCard/faqCategoryCard";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { faqCopy } from "@/config/faq.config/faq.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type FaqCategory } from "@/types/store/faq.types";

type FaqLandingPageProps = {
  categories: readonly FaqCategory[];
};

const categoryTones = [
  "bg-category-teal",
  "bg-category-orange",
  "bg-category-blue",
  "bg-category-green",
  "bg-category-rose",
] as const;

export function FaqLandingPage({ categories }: FaqLandingPageProps) {
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
            { label: faqCopy.breadcrumb },
          ]}
        />

        <ContentPageHeader
          title={faqCopy.landingTitle}
          description={faqCopy.landingDescription}
        />

        {categories.length > 0 ? (
          <ul className="grid items-stretch gap-3 sm:grid-cols-2 sm:gap-4">
            {categories.map((category, index) => (
              <li key={category.slug} className="h-full min-w-0">
                <FaqCategoryCard
                  category={category}
                  tone={
                    categoryTones[index % categoryTones.length] ??
                    "bg-category-teal"
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            icon={<CircleHelpIcon aria-hidden="true" />}
            title={faqCopy.emptyTitle}
            description={faqCopy.emptyDescription}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.home}>{faqCopy.homeCta}</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
