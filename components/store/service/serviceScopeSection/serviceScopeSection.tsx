import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { serviceDiscoveryCopy } from "@/config/services.config/services.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

import { ServiceScopeDisclosure } from "./serviceScopeDisclosure";

import { type ServiceDetailData } from "@/types/store/service.types";
import { cn } from "@/lib/utils/cn/cn";

type ServiceScopeSectionProps = {
  detail: ServiceDetailData;
  alignMobile?: boolean;
};

export function ServiceScopeSection({
  detail,
  alignMobile = false,
}: ServiceScopeSectionProps) {
  const content = (
    <>
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:gap-16">
        <div>
          <p className="type-label text-primary">
            {serviceDiscoveryCopy.scopeLabel}
          </p>
          <h2
            className={cn(
              "mt-3 type-h1 text-foreground",
              alignMobile && "hidden lg:block",
            )}
          >
            {serviceDiscoveryCopy.scopeTitle}
          </h2>
        </div>

        <p className="type-body-lg leading-relaxed text-foreground-muted">
          {detail.longDescription}
        </p>
      </div>

      <ul
        className={cn(
          "mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3",
          alignMobile && "mt-5 lg:mt-10",
        )}
      >
        {detail.specialties.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/20 hover:shadow-sm",
              alignMobile && "p-4 lg:p-5",
            )}
          >
            <span className="type-caption font-semibold tabular-nums text-primary">
              {formatFaNumber(index + 1).padStart(2, "۰")}
            </span>

            <h3
              className={cn(
                "mt-4 type-h4 text-foreground",
                alignMobile && "mt-2 lg:mt-4",
              )}
            >
              {item.title}
            </h3>

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
    </>
  );

  return (
    <section
      className={cn("container-app py-section", alignMobile && "max-lg:py-4")}
    >
      {alignMobile ? (
        <ServiceScopeDisclosure title={`خدمات ${detail.title} شامل`}>
          {content}
        </ServiceScopeDisclosure>
      ) : (
        content
      )}
    </section>
  );
}
