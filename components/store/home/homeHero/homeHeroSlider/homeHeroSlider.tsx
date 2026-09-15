"use client";

import dynamic from "next/dynamic";
import { type HomeHeroSlide } from "@/types/store/home.types";

const HomeHeroCarousel = dynamic(
  () =>
    import("@/components/store/home/homeHero/homeHeroSlider/homeHeroCarousel/homeHeroCarousel").then(
      (module) => module.HomeHeroCarousel,
    ),
  { ssr: false },
);

type HomeHeroSliderProps = {
  slides: readonly HomeHeroSlide[];
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const firstSlide = slides[0];

  if (!firstSlide) {
    return null;
  }

  return <HomeHeroCarousel slides={slides} />;
}
