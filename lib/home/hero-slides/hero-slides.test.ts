import assert from "node:assert/strict";
import test from "node:test";

import {
  getHomeHeroBackgroundSliderBehavior,
  shouldEnableHeroAutoplay,
} from "../hero-autoplay/hero-autoplay.ts";
import { homeHeroSlides } from "./hero-slides.ts";

test("hero autoplay stays off for a single slide", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 1), false);
});

test("hero autoplay enables for multiple slides when motion is allowed", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 3), true);
  const behavior = getHomeHeroBackgroundSliderBehavior(false, 3);
  assert.equal(behavior.effect, "fade");
});

test("hero slider uses the three static home images", () => {
  assert.deepEqual(
    homeHeroSlides.map((slide) => slide.imageSrc),
    [
      "/images/home/slide 1.png",
      "/images/home/slide 2.png",
      "/images/home/slide 3.png",
    ],
  );
});
