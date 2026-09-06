"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { homeHeroSlides } from "@/config/home.config/home.config";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";

import {
  getHomeHeroBackgroundSliderBehavior,
  shouldEnableHeroAutoplay,
} from "@/lib/home/hero-autoplay/hero-autoplay";

function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function HomeHeroCarousel() {
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );

  const prefersReducedMotion = usePrefersReducedMotion();

  const canAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    homeHeroSlides.length,
  );

  if (!isClient || !canAutoplay) {
    return null;
  }

  const behavior = getHomeHeroBackgroundSliderBehavior(
    prefersReducedMotion,
    homeHeroSlides.length,
  );

  return (
    <div
      aria-hidden="true"
      className="
        absolute inset-0
        h-full w-full
        overflow-hidden
      "
    >
      <Swiper
        dir="rtl"
        className="
          home-hero-swiper
          absolute inset-0
          h-full w-full
        "
        modules={[EffectFade, Autoplay]}
        {...behavior}
        a11y={{ enabled: false }}
        keyboard={{ enabled: false }}
        pagination={false}
      >
        {homeHeroSlides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="
              relative
              h-full
              overflow-hidden
            "
          >
            <Image
              src={slide.imageSrc}
              alt=""
              fill
              sizes="100vw"
              className="
                scale-[1.02]
                object-cover
                object-center
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
