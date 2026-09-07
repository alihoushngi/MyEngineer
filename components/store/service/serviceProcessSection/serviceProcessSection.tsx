import { CheckIcon } from "lucide-react";

import { serviceDiscoveryCopy } from "@/config/services.config/services.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceProcessSectionProps = {
  detail: ServiceDetailData;
};

export function ServiceProcessSection({ detail }: ServiceProcessSectionProps) {
  return (
    <section className="container-app py-section">
      <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:gap-16">
        <div>
          <p className="type-label text-primary">
            {serviceDiscoveryCopy.processLabel}
          </p>
          <h2 className="mt-3 type-h1 text-foreground">
            {serviceDiscoveryCopy.processTitle}
          </h2>

          <ol className="mt-7 grid gap-3">
            {detail.process.map((step, index) => (
              <li
                key={step.id}
                className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 rounded-2xl border border-border-subtle bg-surface p-4 transition-all duration-200 ease-in-out hover:border-primary/20 hover:shadow-xs"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle type-body-sm font-semibold tabular-nums text-primary">
                  {formatFaNumber(index + 1)}
                </span>

                <div className="min-w-0">
                  <h3 className="type-h4 text-foreground">{step.title}</h3>
                  <p className="mt-1.5 type-body-sm leading-relaxed text-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="relative isolate overflow-hidden rounded-3xl bg-primary-deep p-6 text-primary-deep-foreground shadow-lg sm:p-8 lg:self-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-e-20 -top-20 -z-10 size-56 rounded-full bg-primary/20 blur-[90px]"
          />

          <span className="flex size-11 items-center justify-center rounded-2xl border border-primary-deep-foreground/10 bg-primary-deep-foreground/10 text-primary">
            <CheckIcon aria-hidden="true" className="size-5" />
          </span>

          <h2 className="mt-5 type-h2 text-primary-deep-foreground">
            {serviceDiscoveryCopy.prepareTitle}
          </h2>

          <p className="mt-3 type-body leading-relaxed text-primary-deep-foreground/70">
            {serviceDiscoveryCopy.prepareBody}
          </p>
        </aside>
      </div>
    </section>
  );
}
