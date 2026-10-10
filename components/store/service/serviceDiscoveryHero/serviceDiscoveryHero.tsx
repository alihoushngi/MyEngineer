import { ArrowDownIcon, SearchIcon } from "lucide-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";

import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type ServiceDetailData } from "@/types/store/service.types";
import { cn } from "@/lib/utils/cn/cn";

type ServiceDiscoveryHeroProps = {
  service: ServiceCategory;
  detail: ServiceDetailData;
  alignMobile?: boolean;
};

export function ServiceDiscoveryHero({
  service,
  detail,
  alignMobile = false,
}: ServiceDiscoveryHeroProps) {
  const mobileBanner = alignMobile
    ? getImageProps({
        src: "/images/services/service-banner.png",
        alt: detail.imageAlt,
        fill: true,
        sizes: "100vw",
      }).props
    : null;
  const serviceImage = (
    <Image
      src={detail.imageSrc}
      alt={detail.imageAlt}
      fill
      priority={!alignMobile}
      loading={alignMobile ? "eager" : undefined}
      fetchPriority={alignMobile ? "high" : undefined}
      sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 100vw"
      className="object-cover"
    />
  );

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-primary-deep text-primary-deep-foreground",
        alignMobile &&
          "bg-background-subtle text-foreground lg:bg-primary-deep lg:text-primary-deep-foreground",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-s-32 top-16 -z-10 size-96 rounded-full bg-primary/15 blur-[130px]",
          alignMobile && "hidden lg:block",
        )}
      />

      <div className="container-wide py-5">
        <StoreBreadcrumb
          className={
            alignMobile
              ? "[&_a:hover]:text-primary [&_ol]:text-foreground-muted lg:[&_a:hover]:text-primary-deep-foreground lg:[&_[aria-current=page]]:bg-primary-deep-foreground/10 lg:[&_[aria-current=page]]:text-primary-deep-foreground lg:[&_ol]:text-primary-deep-foreground/60"
              : "[&_a:hover]:text-primary-deep-foreground **:aria-[aria-current=page]:bg-primary-deep-foreground/10 **:aria-[aria-current=page]:text-primary-deep-foreground [&_ol]:text-primary-deep-foreground/60"
          }
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "خدمات", href: "/#service-categories" },
            { label: service.label },
          ]}
        />
      </div>

      <div className="container-wide grid items-stretch lg:min-h-128 lg:grid-cols-[1fr_.92fr]">
        <div
          className={cn(
            "flex flex-col justify-center py-10 lg:pe-14 lg:py-14",
            alignMobile &&
              "items-center pb-5 pt-2 text-center lg:items-start lg:py-14 lg:text-start",
          )}
        >
          <p
            className={cn(
              "inline-flex w-fit items-center gap-2 rounded-full border border-primary-deep-foreground/10 bg-primary-deep-foreground/10 px-3 py-1 type-label text-primary",
              alignMobile &&
                "border-primary/15 bg-primary-subtle lg:border-primary-deep-foreground/10 lg:bg-primary-deep-foreground/10",
            )}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            {detail.eyebrow}
          </p>

          <h1
            className={cn(
              "mt-5 max-w-3xl type-display text-primary-deep-foreground",
              alignMobile &&
                "mt-3 max-lg:type-h2 text-primary lg:mt-5 lg:type-display lg:text-primary-deep-foreground",
            )}
          >
            {detail.title}
          </h1>

          <p
            className={cn(
              "mt-5 max-w-2xl type-body-lg leading-relaxed text-primary-deep-foreground/70",
              alignMobile &&
                "mt-3 max-lg:type-body-sm text-foreground-muted lg:mt-5 lg:type-body-lg lg:text-primary-deep-foreground/70",
            )}
          >
            {detail.description}
          </p>

          {alignMobile ? (
            <Link
              href="/search"
              className="mt-5 flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 type-body-sm text-foreground-muted outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
              جستجو در خدمات و متخصصین
            </Link>
          ) : null}

          <a
            href="#service-experts-heading"
            className={cn(
              "mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-primary px-5 type-button text-primary-foreground outline-none shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none",
              alignMobile && "mt-3 lg:mt-8",
            )}
          >
            {serviceDiscoveryCopy.expertsCta}
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div
          className={cn(
            "relative -mx-4 min-h-60 overflow-hidden sm:-mx-6 sm:min-h-72 lg:mx-0 lg:min-h-full lg:rounded-t-3xl",
            alignMobile &&
              "mx-0 mb-4 min-h-0 aspect-[959/299] rounded-xl sm:mx-0 sm:min-h-0 lg:mb-0 lg:aspect-auto lg:min-h-full lg:rounded-none lg:rounded-t-3xl",
          )}
        >
          {mobileBanner ? (
            <picture className="relative block size-full">
              <source
                media="(max-width: 1023px)"
                srcSet={mobileBanner.srcSet ?? mobileBanner.src}
                sizes={mobileBanner.sizes}
              />
              {serviceImage}
            </picture>
          ) : (
            serviceImage
          )}

          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-linear-to-t from-primary-deep/50 via-transparent to-transparent lg:bg-linear-to-l lg:from-transparent lg:to-primary-deep",
              alignMobile && "hidden lg:block",
            )}
          />
        </div>
      </div>
    </section>
  );
}
