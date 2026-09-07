"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  LightbulbIcon,
  SparklesIcon,
} from "lucide-react";
import { useRef } from "react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperInstance } from "swiper";

import "swiper/css";

import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";

import { homeKnowledgeCopy } from "@/config/home.config/home.config";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";

import {
  HOME_HERO_AUTOPLAY_MS,
  shouldEnableHeroAutoplay,
} from "@/lib/home/hero-autoplay/hero-autoplay";

import { type HomeKnowledgeTip } from "@/types/store/home.types";

type HomeKnowledgeTipsProps = {
  tips: readonly HomeKnowledgeTip[];
};

export function HomeKnowledgeTips({ tips }: HomeKnowledgeTipsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const swiperRef = useRef<SwiperInstance | null>(null);

  if (tips.length === 0) {
    return null;
  }

  const enableAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    tips.length,
  );

  const hasNavigation = tips.length > 1;

  return (
    <section
      aria-labelledby="home-knowledge-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-background-subtle

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

          bg-primary/6
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

          bg-accent/5
          blur-[140px]
        "
      />

      <div className="container-app">
        <div
          className="
            flex
            flex-col
            gap-7

            sm:gap-9
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between
              sm:gap-8
            "
          >
            <div className="max-w-2xl">
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
                <SparklesIcon aria-hidden="true" className="size-3.5" />
                دانستنی‌های کاربردی
              </p>

              <h2
                id="home-knowledge-heading"
                className="
                  mt-3

                  type-h2
                  text-foreground
                "
              >
                {homeKnowledgeCopy.title}
              </h2>
            </div>

            <div
              aria-hidden="true"
              className="
                hidden
                size-12
                shrink-0
                items-center
                justify-center

                rounded-2xl
                border
                border-border-subtle

                bg-surface
                text-primary

                shadow-xs

                sm:flex
              "
            >
              <BookOpenIcon
                className="
                  size-5
                  stroke-[1.6]
                "
              />
            </div>
          </div>

          <div
            className="
              relative

              px-5

              sm:px-7
              lg:px-8
            "
          >
            {hasNavigation ? (
              <>
                <button
                  type="button"
                  aria-label="اسلاید قبلی"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="
                    absolute
                    inset-s-0
                    top-1/2
                    z-20

                    flex
                    size-11
                    -translate-y-1/2
                    items-center
                    justify-center

                    rounded-2xl
                    border
                    border-border-subtle

                    bg-surface/95
                    text-foreground

                    shadow-md
                    backdrop-blur-md

                    outline-none

                    transition-all
                    duration-200
                    ease-in-out

                    hover:border-primary/20
                    hover:bg-primary
                    hover:text-primary-foreground
                    hover:shadow-lg

                    active:scale-95

                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-background-subtle

                    motion-reduce:transform-none
                  "
                >
                  <ArrowRightIcon aria-hidden="true" className="size-5" />
                </button>

                <button
                  type="button"
                  aria-label="اسلاید بعدی"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="
                    absolute
                    inset-e-0
                    top-1/2
                    z-20

                    flex
                    size-11
                    -translate-y-1/2
                    items-center
                    justify-center

                    rounded-2xl
                    border
                    border-border-subtle

                    bg-surface/95
                    text-foreground

                    shadow-md
                    backdrop-blur-md

                    outline-none

                    transition-all
                    duration-200
                    ease-in-out

                    hover:border-primary/20
                    hover:bg-primary
                    hover:text-primary-foreground
                    hover:shadow-lg

                    active:scale-95

                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-background-subtle

                    motion-reduce:transform-none
                  "
                >
                  <ArrowLeftIcon aria-hidden="true" className="size-5" />
                </button>
              </>
            ) : null}

            <Swiper
              dir="rtl"
              modules={[Keyboard, A11y, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={12}
              loop={hasNavigation}
              speed={prefersReducedMotion ? 0 : 200}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              autoplay={
                enableAutoplay
                  ? {
                      delay: HOME_HERO_AUTOPLAY_MS,
                      pauseOnMouseEnter: true,
                      disableOnInteraction: false,
                    }
                  : false
              }
              breakpoints={{
                640: {
                  slidesPerView: 1.25,
                  spaceBetween: 16,
                },

                768: {
                  slidesPerView: 1.6,
                  spaceBetween: 16,
                },

                1024: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
              }}
              a11y={{
                enabled: true,
                containerMessage: homeKnowledgeCopy.sliderLabel,
              }}
              className="
                home-knowledge-swiper
                w-full

                [&_.swiper-wrapper]:items-stretch
                [&_.swiper-slide]:h-auto
              "
            >
              {tips.map((tip, index) => (
                <SwiperSlide key={tip.id} className="h-auto">
                  <Link
                    href={tip.href}
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
                      focus-visible:ring-offset-background-subtle
                    "
                  >
                    <GlassInfoCard
                      className="
                        relative

                        flex
                        h-full
                        min-h-72
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
                          className="
                            inline-flex
                            min-h-8
                            items-center
                            gap-1.5

                            rounded-full
                            border
                            border-accent/10

                            bg-accent-subtle

                            px-3

                            type-caption
                            font-semibold
                            text-accent
                          "
                        >
                          <LightbulbIcon
                            aria-hidden="true"
                            className="size-3.5"
                          />

                          {homeKnowledgeCopy.didYouKnow}
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

                          mt-7
                        "
                      >
                        <span
                          className="
                            inline-flex

                            rounded-full

                            bg-primary-subtle

                            px-3
                            py-1

                            type-caption
                            font-medium
                            text-primary
                          "
                        >
                          {tip.categoryTitle}
                        </span>

                        <p
                          className="
                            mt-4

                            type-body
                            leading-loose
                            text-foreground
                          "
                        >
                          {tip.body}
                        </p>
                      </div>

                      <div
                        className="
                          relative
                          z-10

                          mt-auto

                          flex
                          items-center
                          justify-between
                          gap-4

                          pt-7
                        "
                      >
                        <span
                          className="
                            type-caption
                            font-medium
                            text-foreground-muted

                            transition-all
                            duration-200
                            ease-in-out

                            group-hover:text-primary
                          "
                        >
                          بیشتر بدانید
                        </span>

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
                    </GlassInfoCard>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
