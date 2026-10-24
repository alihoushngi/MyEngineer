"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, LightbulbIcon } from "lucide-react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

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

  const hasNavigation = tips.length > 1;
  const enableAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    tips.length,
  );

  return (
    <section
      aria-labelledby="home-knowledge-heading"
      className="bg-[#fcfcfc] py-4 sm:py-6"
    >
      <div className="container-wide">
        <h2
          id="home-knowledge-heading"
          className="text-end type-h3 text-foreground"
        >
          {homeKnowledgeCopy.title}
        </h2>

        <div className="mx-auto mt-3 max-w-[600px]">
          <Swiper
            dir="rtl"
            modules={[A11y, Keyboard, Autoplay, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={12}
            loop={hasNavigation}
            speed={prefersReducedMotion ? 0 : 250}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={
              enableAutoplay
                ? {
                    delay: HOME_HERO_AUTOPLAY_MS,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }
                : false
            }
            pagination={hasNavigation ? { clickable: true } : false}
            a11y={{
              enabled: true,
              containerMessage: homeKnowledgeCopy.sliderLabel,
              paginationBulletMessage: "نمایش نکته {{index}}",
            }}
            className="
              home-knowledge-swiper
              w-full
              pb-8

              [&_.swiper-pagination]:bottom-0
              [&_.swiper-pagination-bullet]:bg-border-strong
              [&_.swiper-pagination-bullet-active]:bg-secondary
            "
          >
            {tips.map((tip) => (
              <SwiperSlide key={tip.id} className="h-auto">
                <Link
                  href={tip.href}
                  className="
                    block
                    rounded-xl
                    border
                    border-border-subtle
                    bg-surface
                    p-3

                    outline-none

                    transition-colors
                    duration-200
                    ease-in-out

                    hover:border-secondary/40

                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#fcfcfc]
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 type-caption font-semibold text-accent">
                      <LightbulbIcon aria-hidden="true" className="size-3.5" />
                      {homeKnowledgeCopy.didYouKnow}
                    </span>
                    <span className="rounded-full bg-surface-subtle px-2.5 py-1 type-caption text-foreground-muted">
                      {tip.categoryTitle}
                    </span>
                  </div>

                  <p className="mt-2 type-body-sm leading-relaxed text-foreground">
                    {tip.body}
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1 type-caption font-medium text-secondary">
                    بیشتر بدانید
                    <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {hasNavigation ? (
            <div className="mt-2 flex justify-center gap-2">
              <button
                type="button"
                aria-label="نکته قبلی"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex size-8 items-center justify-center rounded-md border border-border-subtle bg-surface text-foreground-muted outline-none hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowRightIcon aria-hidden="true" className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="نکته بعدی"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex size-8 items-center justify-center rounded-md border border-border-subtle bg-surface text-foreground-muted outline-none hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
