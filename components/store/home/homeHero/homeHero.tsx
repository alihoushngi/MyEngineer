import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, CheckCircle2Icon } from "lucide-react";

import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { HomeHeroCarousel } from "@/components/store/home/homeHero/homeHeroSlider/homeHeroCarousel/homeHeroCarousel";
import { JoinLink } from "@/components/layout/joinLink/joinLink";

import { homeHeroCopy, homeHeroSlides } from "@/config/home.config/home.config";

import { joinNavigation } from "@/config/navigation.config/navigation.config";

const heroBenefits = [
  "پروفایل حرفه‌ای",
  "تخصص و شهر",
  "ارتباط مستقیم",
] as const;

export function HomeHero() {
  const firstSlide = homeHeroSlides[0];

  return (
    <section
      className="
        relative isolate
        min-h-[calc(100svh-4rem)]
        overflow-hidden
        bg-neutral-950
        text-primary-foreground

        sm:min-h-170
        lg:min-h-180
      "
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          select-none
        "
      >
        {firstSlide ? (
          <Image
            src={firstSlide.imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              scale-[1.02]
              object-cover
              object-center
            "
          />
        ) : null}

        <HomeHeroCarousel />
      </div>

      {/* Main dark overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-1
          bg-black/55
        "
      />

      {/* Directional overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-2

          bg-linear-to-b
          from-black/45
          via-black/35
          to-black/75

          sm:from-black/35
          sm:via-black/30
          sm:to-black/70
        "
      />

      {/* Soft center light */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-3

          bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.10),transparent_38%)]
        "
      />

      {/* Primary ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -top-40 inset-s-1/2 z-3
          size-136
          -translate-x-1/2
          rounded-full
          bg-primary/15
          blur-[120px]

          sm:size-176
          lg:size-208
        "
      />

      {/* Content */}
      <div
        className="
          container-wide
          relative z-10
          flex
          min-h-[calc(100svh-4rem)]
          items-center
          justify-center
          py-10

          sm:min-h-170
          sm:py-14

          lg:min-h-180
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            flex w-full
            max-w-5xl
            flex-col
            items-center
            text-center
          "
        >
          {/* Hero copy */}
          <div
            className="
              mx-auto
              max-w-3xl
              space-y-3

              sm:space-y-4
            "
          >
            <h1
              className="
                type-display
                text-balance
                text-primary-foreground
                drop-shadow-[0_2px_20px_rgba(0,0,0,0.20)]
              "
            >
              {homeHeroCopy.title}
            </h1>

            <p
              className="
                mx-auto
                max-w-2xl
                type-body-lg
                text-pretty
                leading-relaxed
                text-primary-foreground/90
              "
            >
              {homeHeroCopy.description}
            </p>

            <p
              className="
                mx-auto
                hidden
                max-w-xl
                type-body
                leading-relaxed
                text-primary-foreground/70

                sm:block
              "
            >
              {homeHeroCopy.supporting}
            </p>
          </div>

          {/* Search glass surface */}
          <div
            className="
              relative
              mt-7
              w-full
              max-w-4xl
              overflow-hidden
              rounded-3xl
              border border-white/15
              bg-white/10
              p-2
              text-start
              shadow-[0_24px_70px_rgba(0,0,0,0.24)]
              backdrop-blur-2xl

              before:pointer-events-none
              before:absolute before:inset-0
              before:rounded-[inherit]
              before:bg-linear-to-br
              before:from-white/12
              before:via-transparent
              before:to-transparent

              sm:mt-9
              sm:rounded-[28px]
              sm:p-2.5
            "
          >
            {/* subtle highlight */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-x-8 top-0
                h-px
                bg-linear-to-r
                from-transparent
                via-white/60
                to-transparent
              "
            />

            <div
              className="
                relative z-10
                flex flex-col
                gap-2

                sm:grid
                sm:grid-cols-[minmax(0,1fr)_auto]
                sm:items-stretch
              "
            >
              {/* Search */}
              <div
                className="
                  min-w-0
                  rounded-2xl
                  bg-background/96
                  text-foreground
                  shadow-sm
                "
              >
                <SearchInput id="home-search" initialQuery="" labelHidden />
              </div>

              {/* City */}
              <div
                className="
                  min-w-0
                  rounded-2xl
                  bg-background/92
                  text-foreground
                  shadow-sm

                  sm:min-w-44
                "
              >
                <HomeCityTrigger />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="
              mt-5
              flex w-full
              max-w-xl
              flex-col
              items-center
              justify-center
              gap-3

              sm:mt-6
              sm:w-auto
              sm:flex-row
              sm:gap-4
            "
          >
            <JoinLink
              size="md"
              className="
                w-full
                min-w-40
                shadow-[0_12px_30px_rgba(0,0,0,0.16)]

                sm:w-auto
              "
            />

            <Link
              href={joinNavigation.href}
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                rounded-xl
                px-4

                type-body-sm
                text-primary-foreground/80

                outline-none
                transition-colors

                hover:bg-white/6
                hover:text-primary-foreground

                focus-visible:ring-2
                focus-visible:ring-primary-foreground/70
                focus-visible:ring-offset-2
                focus-visible:ring-offset-transparent
              "
            >
              {homeHeroCopy.joinCta}
            </Link>
          </div>

          {/* Benefits */}
          <div
            className="
              mt-6
              flex
              w-full
              flex-wrap
              justify-center
              gap-2

              sm:mt-7
              sm:gap-3
            "
          >
            {heroBenefits.map((item) => (
              <span
                key={item}
                className="
                  inline-flex
                  min-h-9
                  items-center
                  gap-2
                  rounded-full
                  border border-white/10
                  bg-white/6
                  px-3
                  py-1.5

                  type-body-sm
                  text-primary-foreground/75

                  shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                  backdrop-blur-md

                  sm:px-4
                "
              >
                <CheckCircle2Icon
                  aria-hidden="true"
                  className="
                    size-4
                    shrink-0
                    text-accent
                  "
                />

                <span>{item}</span>
              </span>
            ))}
          </div>

          {/* Scroll to services */}
          <a
            href="#service-categories"
            className="
              group
              mt-7
              inline-flex
              min-h-11
              w-fit
              items-center
              justify-center
              gap-2
              rounded-full
              px-4

              type-button
              text-primary-foreground/65

              outline-none
              transition-all
              duration-300

              hover:bg-white/5
              hover:text-primary-foreground

              focus-visible:ring-2
              focus-visible:ring-primary-foreground/70

              sm:mt-8
            "
          >
            {homeHeroCopy.startCta}

            <span
              className="
                flex size-7
                items-center
                justify-center
                rounded-full
                border border-white/10
                bg-white/[0.07]
                transition-transform
                duration-300

                group-hover:translate-y-1
              "
            >
              <ArrowDownIcon aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0 z-4
          h-24
          bg-linear-to-t
          from-black/30
          to-transparent
        "
      />
    </section>
  );
}
