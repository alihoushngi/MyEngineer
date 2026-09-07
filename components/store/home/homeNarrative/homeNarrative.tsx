import { ArrowLeftIcon } from "lucide-react";

import { aboutCopy } from "@/config/about.config/about.config";
import { homeNarrativeCopy } from "@/config/home.config/home.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

export function HomeNarrative() {
  return (
    <section
      aria-labelledby="home-narrative-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-primary-deep
        text-primary-deep-foreground
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-40
          -top-40
          -z-10

          size-128
          rounded-full

          bg-primary/15
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-56
          -inset-e-40
          -z-10

          size-144
          rounded-full

          bg-secondary/10
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-px

          bg-linear-to-r
          from-transparent
          via-primary-deep-foreground/15
          to-transparent
        "
      />

      <div
        className="
          container-app

          grid
          gap-10

          py-section

          lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.65fr)]
          lg:items-start
          lg:gap-16

          xl:gap-20
        "
      >
        <div
          className="
            max-w-xl
            space-y-4

            lg:sticky
            lg:top-28
          "
        >
          <p
            className="
              inline-flex
              w-fit
              items-center

              rounded-full
              border
              border-primary-deep-foreground/10

              bg-primary-foreground

              px-3
              py-1

              type-caption
              font-semibold
              text-accent

              backdrop-blur-md
            "
          >
            از نیاز تا انتخاب
          </p>

          <h2
            id="home-narrative-heading"
            className="
              type-h1
              text-primary-deep-foreground
            "
          >
            {homeNarrativeCopy.title}
          </h2>

          <p
            className="
              max-w-lg

              type-body-lg
              leading-relaxed
              text-primary-deep-foreground/70
            "
          >
            {homeNarrativeCopy.description}
          </p>
        </div>

        <ol
          className="
            relative

            grid
            gap-3

            sm:grid-cols-3
            sm:gap-4
          "
        >
          {aboutCopy.howSteps.map((step, index) => (
            <li
              key={step.title}
              className="
                group
                relative

                flex
                min-h-56
                flex-col

                overflow-hidden

                rounded-3xl
                border
                border-primary-deep-foreground/10

                bg-primary-deep-foreground/5

                p-5

                shadow-sm
                backdrop-blur-md

                transition-all
                duration-200
                ease-in-out

                hover:-translate-y-1
                hover:border-primary/30
                hover:bg-primary-deep-foreground/8
                hover:shadow-lg

                motion-reduce:transform-none

                sm:min-h-64
                sm:p-6
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -inset-e-14
                  -top-14

                  size-28
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

              <div
                className="
                  relative
                  z-10

                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    inline-flex
                    size-11
                    shrink-0
                    items-center
                    justify-center

                    rounded-2xl
                    border
                    border-primary-deep-foreground/10

                    bg-primary-deep-foreground/7

                    type-body-sm
                    font-semibold
                    tabular-nums
                    text-primary

                    shadow-sm

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:border-primary/20
                    group-hover:bg-primary/15
                  "
                >
                  {formatFaNumber(index + 1).padStart(2, "۰")}
                </span>

                <ArrowLeftIcon
                  aria-hidden="true"
                  className="
                    size-4
                    shrink-0

                    text-primary-deep-foreground/30

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:-translate-x-1
                    group-hover:text-primary

                    ltr:rotate-180

                    motion-reduce:transform-none
                  "
                />
              </div>

              <div
                className="
                  relative
                  z-10

                  mt-auto
                  space-y-2
                  pt-8
                "
              >
                <h3
                  className="
                    type-h4
                    text-primary-deep-foreground

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:text-primary
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    type-body-sm
                    leading-relaxed
                    text-primary-deep-foreground/60
                  "
                >
                  {step.description}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-x-5
                  bottom-0

                  h-px

                  bg-linear-to-r
                  from-transparent
                  via-primary/0
                  to-transparent

                  transition-all
                  duration-200
                  ease-in-out

                  group-hover:via-primary/50
                "
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
