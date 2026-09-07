import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";

import { homePopularCopy } from "@/config/home.config/home.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

import { type HomePopularService } from "@/types/store/home.types";

type PopularServicesProps = {
  items: readonly HomePopularService[];
};

export function PopularServices({ items }: PopularServicesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-services-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-background
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-48
          top-10
          -z-10

          size-136
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
          -inset-e-52
          bottom-0
          -z-10

          size-152
          rounded-full

          bg-secondary/5
          blur-[140px]
        "
      />

      <div className="container-wide py-section">
        <div
          className="
            flex
            flex-col
            gap-7

            sm:gap-9
            lg:gap-10
          "
        >
          <SectionHeader
            eyebrow="محبوب‌ترین انتخاب‌ها"
            titleId="popular-services-heading"
            title={homePopularCopy.title}
            description={homePopularCopy.description}
          />

          <ul
            className="
              grid
              gap-3

              sm:grid-cols-2
              sm:gap-4

              lg:grid-cols-3
            "
          >
            {items.map((item, index) => (
              <li key={item.id} className="min-w-0">
                <Link
                  href={item.href}
                  className="
                    group
                    relative

                    flex
                    min-h-56
                    h-full

                    overflow-hidden

                    rounded-3xl
                    border
                    border-border-subtle

                    bg-primary-deep

                    text-primary-deep-foreground

                    shadow-sm

                    outline-none

                    transition-all
                    duration-200
                    ease-in-out

                    hover:-translate-y-1
                    hover:border-primary/25
                    hover:shadow-xl

                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-background

                    motion-reduce:transform-none

                    sm:min-h-72
                    lg:min-h-80
                  "
                >
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    sizes="
                      (min-width: 1024px) 33vw,
                      (min-width: 640px) 50vw,
                      100vw
                    "
                    className="
                      object-cover

                      opacity-70

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:scale-[1.04]
                      group-hover:opacity-80

                      motion-reduce:transform-none
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0

                      bg-linear-to-t
                      from-primary-deep
                      via-primary-deep/55
                      to-primary-deep/5
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0

                      bg-linear-to-br
                      from-transparent
                      via-transparent
                      to-primary/10

                      opacity-0

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:opacity-100
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -inset-e-20
                      -top-20

                      size-44
                      rounded-full

                      bg-primary/0
                      blur-3xl

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:scale-125
                      group-hover:bg-primary/20
                    "
                  />

                  <span
                    className="
                      relative
                      z-10

                      flex
                      w-full
                      flex-col
                      justify-between

                      p-4

                      sm:p-5
                      lg:p-6
                    "
                  >
                    <span
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <span
                        className="
                          inline-flex
                          min-h-8
                          items-center

                          rounded-full
                          border
                          border-primary-deep-foreground/10

                          bg-primary-deep-foreground/8

                          px-3

                          type-caption
                          font-semibold
                          tabular-nums
                          text-primary-deep-foreground/75

                          backdrop-blur-md
                        "
                      >
                        {formatFaNumber(index + 1).padStart(2, "۰")}
                      </span>

                      <span
                        className="
                          flex
                          size-10
                          shrink-0
                          items-center
                          justify-center

                          rounded-2xl
                          border
                          border-primary-deep-foreground/10

                          bg-primary-deep-foreground/8

                          text-primary-deep-foreground/75

                          shadow-sm
                          backdrop-blur-md

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:-translate-x-1
                          group-hover:-translate-y-1
                          group-hover:border-primary/20
                          group-hover:bg-primary
                          group-hover:text-primary-foreground

                          motion-reduce:transform-none
                        "
                      >
                        <ArrowUpLeftIcon
                          aria-hidden="true"
                          className="
                            size-5
                            ltr:rotate-90
                          "
                        />
                      </span>
                    </span>

                    <span
                      className="
                        mt-14
                        block
                        max-w-md

                        sm:mt-20
                      "
                    >
                      <span
                        className="
                          block

                          type-h3
                          text-primary-deep-foreground

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:text-primary
                        "
                      >
                        {item.title}
                      </span>

                      <span
                        className="
                          mt-2
                          block

                          type-body-sm
                          leading-relaxed
                          text-primary-deep-foreground/65
                        "
                      >
                        {item.description}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        mt-5
                        block
                        h-px
                        w-full

                        bg-linear-to-r
                        from-transparent
                        via-primary-deep-foreground/15
                        to-transparent

                        transition-all
                        duration-200
                        ease-in-out

                        group-hover:via-primary/50
                      "
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
