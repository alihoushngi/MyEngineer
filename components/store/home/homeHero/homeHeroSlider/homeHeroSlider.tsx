"use client";

import dynamic from "next/dynamic";
import { homeHeroSlides } from "@/config/home.config/home.config";

const HomeHeroCarousel = dynamic(
  () =>
    import("@/components/store/home/homeHero/homeHeroSlider/homeHeroCarousel/homeHeroCarousel").then(
      (module) => module.HomeHeroCarousel,
    ),
  { ssr: false },
);

export function HomeHeroSlider() {
  const firstSlide = homeHeroSlides[0];

  if (!firstSlide) {
    return null;
  }

  return <HomeHeroCarousel />;
}
