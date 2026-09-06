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
    <div className="relative h-full w-full">
      <div className="w-full h-full bg-black/80 opacity-5 absolute inset-0 z-50" />
      <Swiper
        dir="rtl"
        className="home-hero-swiper absolute inset-0 h-full w-full"
        modules={[EffectFade, Autoplay]}
        {...behavior}
        a11y={{ enabled: false }}
        keyboard={{ enabled: false }}
        pagination={false}
      >
        {homeHeroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            <Image
              src={slide.imageSrc}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
