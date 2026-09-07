import {
  BadgeCheckIcon,
  MessageCircleMoreIcon,
  ShapesIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { homeWhyCopy } from "@/config/home.config/home.config";

const icons = [
  ShapesIcon,
  MessageCircleMoreIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
] as const;

export function WhyMohandesMan() {
  return (
    <section
      aria-labelledby="why-mohandes-man-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-background
        py-section
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-48
          -top-44
          -z-10

          size-136
          rounded-full

          bg-primary/5
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -inset-e-48
          -z-10

          size-144
          rounded-full

          bg-secondary/5
          blur-[140px]
        "
      />

      <div className="container-app">
        <div
          className="
            max-w-3xl
            space-y-4
          "
        >
          <p
            className="
              inline-flex
              w-fit
              items-center
              gap-2

              rounded-full
              border
              border-primary/10

              bg-primary-subtle

              px-3
              py-1

              type-caption
              font-semibold
              text-primary
            "
          >
            <span
              aria-hidden="true"
              className="
                size-1.5
                shrink-0
                rounded-full
                bg-primary
              "
            />
            انتخاب روشن‌تر، همکاری مستقیم‌تر
          </p>

          <h2
            id="why-mohandes-man-heading"
            className="
              type-h1
              text-foreground
            "
          >
            {homeWhyCopy.title}
          </h2>

          <p
            className="
              max-w-2xl

              type-body-lg
              leading-relaxed
              text-foreground-muted
            "
          >
            {homeWhyCopy.intro}
          </p>
        </div>

        <ul
          className="
            mt-8

            grid
            gap-3

            sm:grid-cols-2
            sm:gap-4

            lg:mt-10
            lg:grid-cols-4
          "
        >
          {homeWhyCopy.items.map((item, index) => {
            const Icon = icons[index] ?? ShapesIcon;

            return (
              <li
                key={item.title}
                className="
                  group
                  relative

                  flex
                  min-h-56
                  flex-col

                  overflow-hidden

                  rounded-3xl
                  border
                  border-border-subtle

                  bg-surface

                  p-5

                  shadow-xs

                  transition-all
                  duration-200
                  ease-in-out

                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-md

                  motion-reduce:transform-none

                  sm:min-h-60
                  sm:p-6
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-e-14
                    -top-14

                    size-32
                    rounded-full

                    bg-primary/0
                    blur-3xl

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:scale-125
                    group-hover:bg-primary/10
                  "
                />

                <div
                  className="
                    relative
                    z-10

                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      flex
                      size-12
                      shrink-0
                      items-center
                      justify-center

                      rounded-2xl
                      border
                      border-primary/10

                      bg-primary-subtle

                      text-primary

                      shadow-xs

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:border-primary/20
                      group-hover:bg-primary
                      group-hover:text-primary-foreground
                      group-hover:shadow-sm
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="
                        size-6
                        stroke-[1.6]
                      "
                    />
                  </span>

                  <span
                    className="
                      type-caption
                      font-semibold
                      tabular-nums
                      text-foreground-subtle

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:text-primary
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className="
                    relative
                    z-10

                    mt-auto

                    pt-8
                  "
                >
                  <h3
                    className="
                      type-h4
                      text-foreground

                      transition-all
                      duration-200
                      ease-in-out

                      group-hover:text-primary
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2

                      type-body-sm
                      leading-relaxed
                      text-foreground-muted
                    "
                  >
                    {item.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-5
                    bottom-0

                    h-px

                    bg-linear-to-r
                    from-transparent
                    via-primary/0
                    to-transparent

                    transition-all
                    duration-200
                    ease-in-out

                    group-hover:via-primary/35
                  "
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
