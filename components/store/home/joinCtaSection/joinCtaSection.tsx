import { ArrowLeftIcon, BadgeCheckIcon, SparklesIcon } from "lucide-react";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeJoinCopy } from "@/config/home.config/home.config";

export function JoinCtaSection() {
  return (
    <section
      aria-labelledby="join-cta-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-background
        py-section
      "
    >
      <div className="container-app">
        <div
          className="
            group
            relative

            overflow-hidden

            rounded-4xl
            border
            border-primary-deep-foreground/10

            bg-primary-deep

            px-5
            py-8

            text-primary-deep-foreground

            shadow-xl

            sm:px-8
            sm:py-10

            lg:px-10
            lg:py-12
          "
        >
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-s-24
              -top-28

              size-72
              rounded-full

              bg-primary/20
              blur-[100px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -inset-e-20

              size-80
              rounded-full

              bg-secondary/15
              blur-[110px]
            "
          />

          {/* subtle glass highlight */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-8
              top-0

              h-px

              bg-linear-to-r
              from-transparent
              via-primary-deep-foreground/35
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-e-16
              -top-16

              size-44
              rounded-full
              border
              border-primary-deep-foreground/6
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-e-8
              -top-8

              size-28
              rounded-full
              border
              border-primary-deep-foreground/6
            "
          />

          <div
            className="
              relative
              z-10

              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-12
            "
          >
            <div
              className="
                max-w-2xl
              "
            >
              <div
                className="
                  mb-4

                  inline-flex
                  w-fit
                  items-center
                  gap-2

                  rounded-full
                  border
                  border-primary-deep-foreground/10

                  bg-primary-deep-foreground/7

                  px-3
                  py-1.5

                  type-caption
                  font-semibold
                  text-primary

                  backdrop-blur-md
                "
              >
                <SparklesIcon aria-hidden="true" className="size-3.5" />
                عضویت در مهندس من
              </div>

              <h2
                id="join-cta-heading"
                className="
                  type-h1
                  text-primary-deep-foreground
                "
              >
                {homeJoinCopy.title}
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl

                  type-body
                  leading-relaxed
                  text-primary-deep-foreground/70

                  sm:type-body-lg
                "
              >
                {homeJoinCopy.description}
              </p>

              <div
                className="
                  mt-5

                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2

                  type-caption
                  text-primary-deep-foreground/60
                "
              >
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheckIcon
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  ساخت پروفایل حرفه‌ای
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheckIcon
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  معرفی تخصص و سوابق
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheckIcon
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  ارتباط مستقیم با مشتری
                </span>
              </div>
            </div>

            <div
              className="
                flex
                w-full
                shrink-0
                flex-col
                gap-3

                sm:w-auto
              "
            >
              <JoinLink
                size="lg"
                variant="outline"
                className="
                  group/join
                  min-w-52
                  w-full

                  border-primary-deep-foreground/15
                  bg-primary-deep-foreground

                  text-primary-deep

                  shadow-lg

                  transition-all
                  duration-200
                  ease-in-out

                  hover:-translate-y-0.5
                  hover:border-primary
                  hover:bg-primary
                  hover:text-primary-foreground
                  hover:shadow-xl

                  sm:w-auto

                  motion-reduce:transform-none
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  type-caption
                  text-primary-deep-foreground/45
                "
              >
                <span>شروع سریع و ساده</span>

                <ArrowLeftIcon
                  aria-hidden="true"
                  className="
                    size-3.5

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:-translate-x-1

                    ltr:rotate-180

                    motion-reduce:transform-none
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
