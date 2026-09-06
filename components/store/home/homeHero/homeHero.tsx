import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, CheckCircle2Icon } from "lucide-react";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { HomeHeroCarousel } from "@/components/store/home/homeHero/homeHeroSlider/homeHeroCarousel/homeHeroCarousel";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeHeroCopy, homeHeroSlides } from "@/config/home.config/home.config";
import { joinNavigation } from "@/config/navigation.config/navigation.config";

export function HomeHero() {
  const firstSlide = homeHeroSlides[0];

  return (
    <section className="relative isolate min-h-136 overflow-hidden text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        {firstSlide ? (
          <Image
            src={firstSlide.imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : null}
        <HomeHeroCarousel />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 bg-black/80"
      />
      <div className="container-wide relative z-10 flex min-h-136 items-center justify-center py-10 sm:py-14 lg:py-16">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 text-center sm:gap-7">
          <div className="space-y-4">
            <h1 className="type-display text-primary-foreground">
              {homeHeroCopy.title}
            </h1>
            <p className="type-body-lg text-primary-foreground/90">
              {homeHeroCopy.description}
            </p>
            <p className="type-body text-primary-foreground/80">
              {homeHeroCopy.supporting}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-xl bg-surface p-3 text-start shadow-lg sm:flex-row-reverse sm:items-center">
            <div className="min-w-0 flex-1 text-foreground">
              <SearchInput id="home-search" initialQuery="" labelHidden />
            </div>
            <div className="shrink-0 border-t border-border pt-2 text-foreground sm:border-t-0 sm:border-e sm:pe-3 sm:pt-0">
              <HomeCityTrigger />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <JoinLink size="md" />
            <Link
              href={joinNavigation.href}
              className="type-body-sm text-primary-foreground/90 underline-offset-4 outline-none hover:text-primary-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              {homeHeroCopy.joinCta}
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 type-body-sm text-primary-foreground/80">
            {["پروفایل حرفه‌ای", "تخصص و شهر", "ارتباط مستقیم"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2Icon
                  aria-hidden="true"
                  className="size-4 text-accent"
                />
                {item}
              </span>
            ))}
          </div>
          <a
            href="#service-categories"
            className="inline-flex min-h-11 w-fit items-center gap-2 type-button text-primary-foreground/85 outline-none hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {homeHeroCopy.startCta}
            <ArrowDownIcon aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
