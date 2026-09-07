import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { serviceDiscoveryCopy } from "@/config/services.config/services.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceScopeSectionProps = {
  detail: ServiceDetailData;
};

export function ServiceScopeSection({ detail }: ServiceScopeSectionProps) {
  return (
    <section className="container-app py-section">
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:gap-16">
        <div>
          <p className="type-label text-primary">
            {serviceDiscoveryCopy.scopeLabel}
          </p>
          <h2 className="mt-3 type-h1 text-foreground">
            {serviceDiscoveryCopy.scopeTitle}
          </h2>
        </div>

        <p className="type-body-lg leading-relaxed text-foreground-muted">
          {detail.longDescription}
        </p>
      </div>

      <ul className="mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {detail.specialties.map((item, index) => (
          <li
            key={item.id}
            className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/20 hover:shadow-sm"
          >
            <span className="type-caption font-semibold tabular-nums text-primary">
              {formatFaNumber(index + 1).padStart(2, "۰")}
            </span>

            <h3 className="mt-4 type-h4 text-foreground">{item.title}</h3>

            <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      {detail.scopeItems && detail.scopeItems.length > 0 ? (
        <div className="mt-8 rounded-2xl border border-border-subtle bg-surface px-4 shadow-xs sm:px-5">
          <Accordion type="single" collapsible>
            <AccordionItem value="scope" className="border-none">
              <AccordionTrigger>
                {serviceFilterCopy.scopeAccordionTitle}
              </AccordionTrigger>

              <AccordionContent>
                <ul className="grid gap-2 pb-2">
                  {detail.scopeItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 type-body-sm leading-relaxed text-foreground-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}
    </section>
  );
}
