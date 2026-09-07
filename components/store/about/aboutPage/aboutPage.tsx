import Image from "next/image";
import { CheckIcon, SparklesIcon } from "lucide-react";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { AboutServicesSection } from "@/components/store/about/aboutServicesSection/aboutServicesSection";

import { aboutCopy } from "@/config/about.config/about.config";
import { siteConfig } from "@/config/site.config/site.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

export function AboutPage() {
  return (
    <div className="overflow-hidden pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: aboutCopy.breadcrumb },
          ]}
        />
      </div>

      <section className="container-wide">
        <div className="relative isolate grid overflow-hidden rounded-4xl border border-primary-deep-foreground/10 bg-primary-deep text-primary-deep-foreground shadow-xl lg:grid-cols-[.9fr_1.1fr]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-s-32 -top-32 -z-10 size-80 rounded-full bg-primary/15 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 inset-s-1/3 -z-10 size-96 rounded-full bg-secondary/10 blur-[130px]"
          />

          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-deep-foreground/10 bg-primary-deep-foreground/6 px-3 py-1 type-caption font-semibold text-primary backdrop-blur-md">
              <SparklesIcon aria-hidden="true" className="size-3.5" />
              داستان مهندس من
            </p>

            <h1 className="mt-5 max-w-xl type-display text-primary-deep-foreground">
              {aboutCopy.title}
            </h1>

            <p className="mt-5 max-w-xl type-body-lg leading-relaxed text-primary-deep-foreground/65">
              {aboutCopy.tagline}
            </p>
          </div>

          <div className="relative min-h-72 overflow-hidden lg:min-h-136">
            <Image
              src="/images/home/project-engineer.png"
              alt="مهندس پروژه در محیط ساختمان"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-all duration-200 ease-in-out"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-primary-deep/55 via-primary-deep/10 to-transparent lg:bg-linear-to-s lg:from-primary-deep/75 lg:via-primary-deep/15 lg:to-transparent"
            />
          </div>
        </div>
      </section>

      <section className="container-app grid gap-8 py-section lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div className="max-w-xl">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary-subtle px-3 py-1 type-caption font-semibold text-primary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            چرایی ما
          </p>

          <h2 className="mt-4 type-h1 text-foreground">{aboutCopy.whyTitle}</h2>
        </div>

        <div className="space-y-5">
          {aboutCopy.whyParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="type-body-lg leading-loose text-foreground-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-secondary-subtle py-section">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-40 top-0 -z-10 size-96 rounded-full bg-secondary/8 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -inset-e-40 -z-10 size-112 rounded-full bg-primary/6 blur-[140px]"
        />

        <div className="container-app grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 xl:gap-20">
          <div className="max-w-xl">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/10 bg-surface/60 px-3 py-1 type-caption font-semibold text-secondary">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-secondary"
              />
              روایت شکل‌گیری
            </p>

            <h2 className="mt-4 type-h1 text-foreground">
              {aboutCopy.storyTitle}
            </h2>

            <p className="mt-4 type-body leading-relaxed text-foreground-muted">
              {aboutCopy.storyBody}
            </p>
          </div>

          <ol className="grid items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
            {aboutCopy.howSteps.map((step, index) => (
              <li
                key={step.title}
                className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md motion-reduce:transform-none sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-e-14 -top-14 size-32 rounded-full bg-primary/0 blur-3xl transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:bg-primary/10"
                />

                <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle type-body-sm font-semibold tabular-nums text-primary shadow-xs">
                  {formatFaNumber(index + 1).padStart(2, "۰")}
                </span>

                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AboutServicesSection />

      <section
        aria-labelledby="about-values-heading"
        className="relative isolate container-app pt-section"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-40 top-20 -z-10 size-96 rounded-full bg-primary/5 blur-[130px]"
        />

        <div className="max-w-2xl">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary-subtle px-3 py-1 type-caption font-semibold text-primary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            اصول همکاری
          </p>

          <h2
            id="about-values-heading"
            className="mt-4 type-h1 text-foreground"
          >
            {aboutCopy.valuesTitle}
          </h2>

          <p className="mt-3 type-body leading-relaxed text-foreground-muted">
            {aboutCopy.valuesIntro}
          </p>
        </div>

        <ul className="mt-8 grid items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
          {aboutCopy.values.map((value) => (
            <li
              key={value.title}
              className="group flex h-full min-h-56 flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md motion-reduce:transform-none sm:p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground">
                <CheckIcon aria-hidden="true" className="size-5 stroke-2" />
              </span>

              <div className="mt-auto pt-8">
                <h3 className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                  {value.title}
                </h3>

                <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
