"use client";

import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import { HomeSlideImage } from "@/components/store/home/homeSlideImage/homeSlideImage";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type HomeHeroSlide } from "@/types/store/home.types";

/** The client reference places promotional artwork after the service categories. */
export function HomePromotions({
  slides,
}: {
  slides: readonly HomeHeroSlide[];
}) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeSlide = slides[activeIndex] ?? slides[0];
  if (!activeSlide) return null;

  return (
    <section
      aria-label={homeHeroCopy.sliderLabel}
      aria-roledescription="نمایش اسلاید"
      className="mx-auto flow-root w-[calc(100%-24px)] max-w-[800px] !py-0 min-[576px]:w-full min-[576px]:max-w-[516px] min-[768px]:w-[calc(100%-72px)] min-[768px]:max-w-[696px] min-[992px]:w-[800px]"
    >
      <div className="relative mx-6 my-3">
        <Swiper
          dir="rtl"
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={slides.length > 1}
          speed={prefersReducedMotion ? 0 : 1000}
          autoplay={
            !prefersReducedMotion && slides.length > 1
              ? { delay: 4000, disableOnInteraction: false }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="aspect-[3.2/1] w-full overflow-hidden rounded-md bg-surface-muted shadow-sm"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <HomeSlideImage
                src={slide.imageSrc}
                alt={slide.imageAlt || slide.headline}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 992px) 752px, (min-width: 768px) calc(100vw - 120px), (min-width: 576px) calc(100vw - 108px), calc(100vw - 72px)"
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-10 flex justify-center">
            <div className="pointer-events-auto flex items-center">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`نمایش بنر ${formatFaNumber(index + 1)}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="focus-ring flex size-6 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={`h-[5px] rounded-full transition-all duration-300 min-[500px]:h-2 ${index === activeIndex ? "w-4 rounded-[3px] bg-black dark:bg-white" : "w-[5px] bg-[#adb5bd] min-[500px]:w-2"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {activeSlide.headline}
      </p>
    </section>
  );
}
