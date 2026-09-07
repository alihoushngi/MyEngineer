import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";

import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceDiscoveryHeroProps = {
  service: ServiceCategory;
  detail: ServiceDetailData;
};

export function ServiceDiscoveryHero({
  service,
  detail,
}: ServiceDiscoveryHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-deep text-primary-deep-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-32 top-16 -z-10 size-96 rounded-full bg-primary/15 blur-[130px]"
      />

      <div className="container-wide py-5">
        <StoreBreadcrumb
          className="[&_a:hover]:text-primary-deep-foreground **:aria-[aria-current=page]:bg-primary-deep-foreground/10 **:aria-[aria-current=page]:text-primary-deep-foreground [&_ol]:text-primary-deep-foreground/60"
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "خدمات", href: "/#service-categories" },
            { label: service.label },
          ]}
        />
      </div>

      <div className="container-wide grid items-stretch lg:min-h-128 lg:grid-cols-[1fr_.92fr]">
        <div className="flex flex-col justify-center py-10 lg:pe-14 lg:py-14">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-deep-foreground/10 bg-primary-deep-foreground/10 px-3 py-1 type-label text-primary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            {detail.eyebrow}
          </p>

          <h1 className="mt-5 max-w-3xl type-display text-primary-deep-foreground">
            {detail.title}
          </h1>

          <p className="mt-5 max-w-2xl type-body-lg leading-relaxed text-primary-deep-foreground/70">
            {detail.description}
          </p>

          <a
            href="#service-experts-heading"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-primary px-5 type-button text-primary-foreground outline-none shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
          >
            {serviceDiscoveryCopy.expertsCta}
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="relative -mx-4 min-h-60 overflow-hidden sm:-mx-6 sm:min-h-72 lg:mx-0 lg:min-h-full lg:rounded-t-3xl">
          <Image
            src={detail.imageSrc}
            alt={detail.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-primary-deep/50 via-transparent to-transparent lg:bg-linear-to-l lg:from-transparent lg:to-primary-deep"
          />
        </div>
      </div>
    </section>
  );
}
