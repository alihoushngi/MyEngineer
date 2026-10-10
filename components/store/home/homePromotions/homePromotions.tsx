"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { HomeSlideImage } from "@/components/store/home/homeSlideImage/homeSlideImage";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { homeHeroSlides } from "@/lib/home/hero-slides/hero-slides";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type HomeHeroSlide } from "@/types/store/home.types";

/** Mobile reference places the promotional artwork after service categories. */
export function HomePromotions({
  slides,
}: {
  slides: readonly HomeHeroSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex % slides.length];
  if (!slide) return null;

  function move(delta: number) {
    setActiveIndex((index) => (index + delta + slides.length) % slides.length);
  }

  const fallback = homeHeroSlides[activeIndex % homeHeroSlides.length];
  return (
    <section
      aria-label={homeHeroCopy.sliderLabel}
      aria-roledescription="نمایش اسلاید"
      className="container-app pb-5 md:hidden"
    >
      <div className="relative aspect-[3.2/1] overflow-hidden rounded-xl border border-border-subtle bg-surface-muted">
        <HomeSlideImage
          key={slide.id}
          src={slide.imageSrc}
          fallbackSrc={fallback?.imageSrc ?? slide.imageSrc}
          fallbackAlt={fallback?.imageAlt}
          alt={slide.imageAlt || slide.headline}
          fill
          sizes="(min-width: 768px) 1px, calc(100vw - 32px)"
          className="object-cover"
        />
        {slides.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-1 inset-y-0 flex items-center justify-between">
            <button
              type="button"
              aria-label="بنر قبلی"
              onClick={() => move(-1)}
              className="focus-ring pointer-events-auto flex size-11 items-center justify-center rounded-xl bg-surface/90 text-foreground hover:bg-surface"
            >
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="بنر بعدی"
              onClick={() => move(1)}
              className="focus-ring pointer-events-auto flex size-11 items-center justify-center rounded-xl bg-surface/90 text-foreground hover:bg-surface"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
      {slides.length > 1 ? (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`نمایش بنر ${formatFaNumber(index + 1)}`}
              aria-pressed={index === activeIndex % slides.length}
              onClick={() => setActiveIndex(index)}
              className="focus-ring flex size-11 items-center justify-center rounded-xl hover:bg-surface-muted"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full ${index === activeIndex % slides.length ? "w-6 bg-primary" : "w-1.5 bg-foreground-subtle"}`}
              />
            </button>
          ))}
        </div>
      ) : null}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {slide.headline}
      </p>
    </section>
  );
}
