"use client";

import { ListTreeIcon } from "lucide-react";

import { ArticleToc } from "@/components/store/article/articleToc/articleToc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { type ArticleTocItem } from "@/types/store/article.types";

type ArticleTocMobileProps = {
  items: readonly ArticleTocItem[];
};

export function ArticleTocMobile({ items }: ArticleTocMobileProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="lg:hidden">
      <AccordionItem
        value="toc"
        className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xs"
      >
        <AccordionTrigger className="px-4 py-4 transition-all duration-200 ease-in-out hover:bg-surface-muted">
          <span className="flex items-center gap-2">
            <ListTreeIcon aria-hidden="true" className="size-4 text-primary" />
            {articlesCopy.tocHeading}
          </span>
        </AccordionTrigger>

        <AccordionContent className="border-t border-border-subtle px-3 py-3">
          <ArticleToc items={items} headingHidden />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
