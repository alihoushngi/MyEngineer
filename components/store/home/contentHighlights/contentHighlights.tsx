import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenTextIcon,
  CircleHelpIcon,
  NewspaperIcon,
} from "lucide-react";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";

import { homeContentCopy } from "@/config/home.config/home.config";

import { cn } from "@/lib/utils/cn/cn";

const icons = [NewspaperIcon, BookOpenTextIcon, CircleHelpIcon] as const;

const accents = [
  {
    background: "bg-category-orange",
    text: "text-block-foreground",
  },
  {
    background: "bg-category-blue",
    text: "text-block-foreground",
  },
  {
    background: "bg-category-teal",
    text: "text-block-foreground",
  },
] as const;

export function ContentHighlights() {
  return (
    <section
      aria-labelledby="content-highlights-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-background

        py-section
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-44
          -top-48
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
          -bottom-52
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
            mb-8
            max-w-2xl

            sm:mb-10
          "
        >
          <p
            className="
              inline-flex
              w-fit
              items-center
              gap-2

              rounded-full
              border
              border-primary/10

              bg-primary-subtle

              px-3
              py-1

              type-caption
              font-semibold
              text-primary
            "
          >
            <span
              aria-hidden="true"
              className="
                size-1.5
                shrink-0
                rounded-full
                bg-primary
              "
            />
            مرکز یادگیری
          </p>

          <h2
            id="content-highlights-heading"
            className="
              mt-3

              type-h1
              text-foreground
            "
          >
            {homeContentCopy.title}
          </h2>

          <p
            className="
              mt-3
              max-w-xl

              type-body
              leading-relaxed
              text-foreground-muted
            "
          >
            {homeContentCopy.description}
          </p>
        </div>

        <ul
          className="
            grid
            items-stretch
            gap-3

            md:grid-cols-3
            md:gap-4
          "
        >
          {homeContentCopy.items.map((item, index) => {
            const Icon = icons[index] ?? NewspaperIcon;

            const accent = accents[index] ?? accents[2];

            return (
              <li key={item.href} className="h-full min-w-0">
                <Link
                  href={item.href}
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
                        h-full
                        min-h-64
                        flex-col

                        overflow-hidden

                        rounded-3xl
                        border
                        border-border-subtle

                        bg-surface/85

                        p-5

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

                        sm:min-h-72
                        sm:p-6
                      "
                  >
                    <span
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          -inset-e-16
                          -top-16

                          size-36
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
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          inset-x-8
                          top-0

                          h-px

                          bg-linear-to-r
                          from-transparent
                          via-primary/20
                          to-transparent
                        "
                    />

                    <div
                      className="
                          relative
                          z-10

                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                    >
                      <span
                        className={cn(
                          `
                              flex
                              size-12
                              shrink-0
                              items-center
                              justify-center

                              rounded-2xl

                              shadow-xs

                              transition-all
                              duration-200
                              ease-in-out

                              group-hover:scale-105

                              motion-reduce:transform-none
                            `,
                          accent.background,
                        )}
                      >
                        <Icon
                          aria-hidden="true"
                          className="
                              size-6
                              stroke-[1.6]
                              text-primary-deep
                            "
                        />
                      </span>

                      <span
                        className="
                            type-caption
                            font-semibold
                            tabular-nums
                            text-foreground-subtle

                            transition-all
                            duration-200
                            ease-in-out

                            group-hover:text-primary
                          "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className="
                          relative
                          z-10

                          mt-auto
                          pt-10
                        "
                    >
                      <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                      >
                        <h3
                          className="
                              type-h3
                              text-foreground

                              transition-all
                              duration-200
                              ease-in-out

                              group-hover:text-primary
                            "
                        >
                          {item.title}
                        </h3>

                        <span
                          className="
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
                          <ArrowLeftIcon
                            aria-hidden="true"
                            className="size-4"
                          />
                        </span>
                      </div>

                      <p
                        className="
                            mt-3

                            type-body-sm
                            leading-relaxed
                            text-foreground-muted
                          "
                      >
                        {item.description}
                      </p>

                      <span
                        className={cn(
                          `
                              mt-6
                              inline-flex
                              w-fit
                              items-center

                              rounded-full

                              px-3
                              py-1

                              type-caption
                              font-medium
                            `,
                          accent.background,
                          accent.text,
                        )}
                      >
                        مطالعه بیشتر
                      </span>
                    </div>
                  </GlassInfoCard>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
