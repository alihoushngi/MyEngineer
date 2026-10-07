import Link from "next/link";
import { CircleHelpIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { ContentFilterBar } from "@/components/common/contentFilterBar/contentFilterBar";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { FaqAskDialog } from "@/components/store/faq/faqAskDialog/faqAskDialog";
import { FaqCategoryCard } from "@/components/store/faq/faqCategoryCard/faqCategoryCard";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { faqCopy } from "@/config/faq.config/faq.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type FaqCategory, type FaqItem } from "@/types/store/faq.types";

type FaqLandingPageProps = {
  categories: readonly FaqCategory[];
  q?: string;
  matchedItems?: readonly FaqItem[];
};

const categoryTones = [
  "bg-category-teal",
  "bg-category-orange",
  "bg-category-blue",
  "bg-category-green",
  "bg-category-rose",
] as const;

export function FaqLandingPage({
  categories,
  q = "",
  matchedItems = [],
}: FaqLandingPageProps) {
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <ContentFilterBar
              q={q}
              searchLabel={faqCopy.searchLabel}
              searchPlaceholder={faqCopy.searchPlaceholder}
            />
          </div>
          <FaqAskDialog />
        </div>

        {matchedItems.length > 0 ? (
          <section aria-labelledby="faq-matched-heading" className="space-y-4">
            <h2 id="faq-matched-heading" className="type-h3 text-foreground">
              {faqCopy.matchedQuestionsHeading}
            </h2>
            <FaqAccordion items={matchedItems} />
          </section>
        ) : null}

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
