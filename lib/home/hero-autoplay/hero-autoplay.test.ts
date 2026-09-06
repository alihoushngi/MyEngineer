import assert from "node:assert/strict";
import test from "node:test";
import {
  HOME_HERO_AUTOPLAY_MS,
  HOME_HERO_FADE_MS,
  getHomeHeroBackgroundSliderBehavior,
  shouldEnableHeroAutoplay,
} from "./hero-autoplay.ts";

test("shouldEnableHeroAutoplay stays off when reduced motion is preferred", () => {
  assert.equal(shouldEnableHeroAutoplay(true, 3), false);
});

test("shouldEnableHeroAutoplay stays off for a single slide", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 1), false);
});

test("shouldEnableHeroAutoplay enables restrained autoplay for multiple slides", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 3), true);
});

test("background slider is non-interactive and uses cross-fade", () => {
  const behavior = getHomeHeroBackgroundSliderBehavior(false, 3);

  assert.equal(behavior.allowTouchMove, false);
  assert.equal(behavior.simulateTouch, false);
  assert.equal(behavior.effect, "fade");
  assert.deepEqual(behavior.fadeEffect, { crossFade: true });
  assert.equal(behavior.speed, HOME_HERO_FADE_MS);
  assert.equal(behavior.loop, true);
  assert.deepEqual(behavior.autoplay, {
    delay: HOME_HERO_AUTOPLAY_MS,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  });
});

test("background slider disables motion when reduced motion is preferred", () => {
  const behavior = getHomeHeroBackgroundSliderBehavior(true, 3);

  assert.equal(behavior.speed, 0);
  assert.equal(behavior.loop, false);
  assert.equal(behavior.autoplay, false);
});

test("background slider disables autoplay for a single slide", () => {
  const behavior = getHomeHeroBackgroundSliderBehavior(false, 1);

  assert.equal(behavior.loop, false);
  assert.equal(behavior.autoplay, false);
});
