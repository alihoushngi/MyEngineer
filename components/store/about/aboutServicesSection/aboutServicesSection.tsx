import {
  BriefcaseBusinessIcon,
  Building2Icon,
  DraftingCompassIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";

import {
  aboutCopy,
  aboutServiceDomains,
} from "@/config/about.config/about.config";

const icons = [
  DraftingCompassIcon,
  Building2Icon,
  BriefcaseBusinessIcon,
] as const;

export function AboutServicesSection() {
  return (
    <section
      aria-labelledby="about-services-heading"
      className="relative isolate overflow-hidden bg-surface-subtle py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-44 top-0 -z-10 size-112 rounded-full bg-primary/5 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -inset-e-44 -z-10 size-120 rounded-full bg-secondary/5 blur-[140px]"
      />

      <div className="container-app">
        <SectionHeader
          eyebrow="حوزه‌های تخصصی"
          titleId="about-services-heading"
          title={aboutCopy.servicesTitle}
          description={aboutCopy.servicesIntro}
        />

        <ul className="mt-8 grid items-stretch gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {aboutServiceDomains.map((domain, index) => {
            const Icon = icons[index % icons.length] ?? DraftingCompassIcon;

            return (
              <li
                key={domain.slug}
                className="group flex min-h-48 h-full flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md motion-reduce:transform-none sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon aria-hidden="true" className="size-5 stroke-[1.7]" />
                  </span>

                  <span className="type-caption font-semibold tabular-nums text-foreground-subtle transition-all duration-200 ease-in-out group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-auto pt-7">
                  <h3 className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                    {domain.title}
                  </h3>

                  <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
                    {domain.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 border-t border-border-subtle pt-8">
          <ServiceCategoryGrid hideDescription />
        </div>
      </div>
    </section>
  );
}
