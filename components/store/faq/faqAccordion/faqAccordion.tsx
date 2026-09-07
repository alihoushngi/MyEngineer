"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";

import { type FaqItem } from "@/types/store/faq.types";

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="grid w-full gap-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xs transition-all duration-200 ease-in-out data-[state=open]:border-primary/15 data-[state=open]:shadow-sm"
        >
          <AccordionTrigger className="min-h-14 px-4 py-4 text-start type-body font-semibold text-foreground transition-all duration-200 ease-in-out hover:bg-surface-muted hover:text-primary sm:px-5">
            {item.question}
          </AccordionTrigger>

          <AccordionContent className="border-t border-border-subtle px-4 py-4 type-body-sm leading-loose text-foreground-muted sm:px-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
