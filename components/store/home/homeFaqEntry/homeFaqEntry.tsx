import Link from "next/link";
import { ArrowLeftIcon, CircleHelpIcon, SparklesIcon } from "lucide-react";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";

import { homeFaqCopy } from "@/config/home.config/home.config";

import { type FaqCategory } from "@/types/store/faq.types";

type HomeFaqEntryProps = {
  categories: readonly FaqCategory[];
};

export function HomeFaqEntry({ categories }: HomeFaqEntryProps) {
  return (
    <section
      id="home-faq"
      aria-labelledby="home-faq-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-background

        pb-section
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-44
          top-10
          -z-10

          size-120
          rounded-full

          bg-primary/5
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -inset-e-44
          -z-10

          size-128
          rounded-full

          bg-secondary/5
          blur-[140px]
        "
      />

      <div className="container-app">
        <div
          className="
            border-t
            border-border-subtle

            pt-8

            sm:pt-10
          "
        >
          <SectionHeader
            eyebrow="پرسش‌های پرتکرار"
            titleId="home-faq-heading"
            title={homeFaqCopy.title}
            description={homeFaqCopy.description}
            action={
              <Button
                asChild
                variant="outline"
                className="
                  group

                  transition-all
                  duration-200
                  ease-in-out

                  hover:-translate-y-0.5
                  hover:border-primary/20
                  hover:shadow-sm

                  motion-reduce:transform-none
                "
              >
                <Link href={homeFaqCopy.href} className="gap-2">
                  {homeFaqCopy.actionLabel}

                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="
                      size-4

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:-translate-x-1

                      motion-reduce:transform-none
                    "
                  />
                </Link>
              </Button>
            }
          />

          {categories.length > 0 ? (
            <ul
              className="
                mt-8

                grid
                grid-cols-1
                items-stretch
                gap-3

                sm:grid-cols-2
                sm:gap-4

                lg:mt-10
                lg:grid-cols-3
              "
            >
              {categories.map((category, index) => (
                <li key={category.slug} className="h-full min-w-0">
                  <Link
                    href={category.href}
                    className="
                        group
                        block
                        h-full

                        rounded-3xl

                        outline-none

                        transition-all
                        duration-200
                        ease-in-out

                        focus-visible:ring-2
                        focus-visible:ring-ring
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-background
                      "
                  >
                    <GlassInfoCard
                      className="
                          relative

                          flex
                          min-h-32
                          h-full
                          flex-row
                          items-center
                          justify-between
                          gap-4

                          overflow-hidden

                          rounded-3xl
                          border
                          border-border-subtle

                          bg-surface/85

                          p-4

                          shadow-xs
                          backdrop-blur-md

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:-translate-y-1
                          group-hover:border-primary/20
                          group-hover:bg-surface
                          group-hover:shadow-md

                          motion-reduce:transform-none

                          sm:p-5
                        "
                    >
                      <span
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -inset-e-12
                            -top-12

                            size-28
                            rounded-full

                            bg-primary/0
                            blur-3xl

                            transition-all
                            duration-200
                            ease-in-out

                            group-hover:scale-125
                            group-hover:bg-primary/10
                          "
                      />

                      <span
                        className="
                            relative
                            z-10

                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                      >
                        <span
                          className="
                              flex
                              size-11
                              shrink-0
                              items-center
                              justify-center

                              rounded-2xl
                              border
                              border-primary/10

                              bg-primary-subtle
                              text-primary

                              shadow-xs

                              transition-all
                              duration-200
                              ease-in-out

                              group-hover:border-primary/20
                              group-hover:bg-primary
                              group-hover:text-primary-foreground
                            "
                        >
                          <CircleHelpIcon
                            aria-hidden="true"
                            className="
                                size-5
                                stroke-[1.7]
                              "
                          />
                        </span>

                        <span className="min-w-0">
                          <span
                            className="
                                block

                                type-h4
                                text-foreground

                                transition-all
                                duration-200
                                ease-in-out

                                group-hover:text-primary
                              "
                          >
                            {category.title}
                          </span>

                          <span
                            className="
                                mt-1
                                block

                                type-caption
                                tabular-nums
                                text-foreground-subtle
                              "
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </span>
                      </span>

                      <span
                        className="
                            relative
                            z-10

                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center

                            rounded-xl

                            bg-primary-subtle
                            text-primary

                            transition-all
                            duration-200
                            ease-in-out

                            group-hover:-translate-x-1
                            group-hover:bg-primary
                            group-hover:text-primary-foreground

                            motion-reduce:transform-none
                          "
                      >
                        <ArrowLeftIcon aria-hidden="true" className="size-4" />
                      </span>
                    </GlassInfoCard>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="
                mt-8

                flex
                min-h-40
                flex-col
                items-center
                justify-center
                gap-3

                rounded-3xl
                border
                border-dashed
                border-border-subtle

                bg-surface-subtle

                px-6
                py-8

                text-center
              "
            >
              <span
                className="
                  flex
                  size-11
                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary-subtle
                  text-primary
                "
              >
                <SparklesIcon aria-hidden="true" className="size-5" />
              </span>

              <p className="type-body-sm text-foreground-muted">
                دسته‌بندی پرسش‌ها به‌زودی اضافه می‌شود.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
