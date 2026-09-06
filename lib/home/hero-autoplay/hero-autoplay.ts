export const HOME_HERO_AUTOPLAY_MS = 6500;
export const HOME_HERO_FADE_MS = 900;

export function shouldEnableHeroAutoplay(
  prefersReducedMotion: boolean,
  slideCount: number,
): boolean {
  return !prefersReducedMotion && slideCount > 1;
}

export type HomeHeroBackgroundSliderBehavior = {
  allowTouchMove: false;
  simulateTouch: false;
  effect: "fade";
  fadeEffect: { crossFade: true };
  speed: number;
  loop: boolean;
  autoplay:
    | false
    | {
        delay: number;
        disableOnInteraction: false;
        pauseOnMouseEnter: false;
      };
};

export function getHomeHeroBackgroundSliderBehavior(
  prefersReducedMotion: boolean,
  slideCount: number,
): HomeHeroBackgroundSliderBehavior {
  const enableAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    slideCount,
  );

  return {
    allowTouchMove: false,
    simulateTouch: false,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: prefersReducedMotion ? 0 : HOME_HERO_FADE_MS,
    loop: enableAutoplay,
    autoplay: enableAutoplay
      ? {
          delay: HOME_HERO_AUTOPLAY_MS,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }
      : false,
  };
}
