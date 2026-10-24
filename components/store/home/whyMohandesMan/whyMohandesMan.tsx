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
      className="bg-background py-5 sm:py-8"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="why-mohandes-man-heading"
            className="type-h3 text-foreground"
          >
            {homeWhyCopy.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl type-body-sm text-foreground-muted">
            {homeWhyCopy.intro}
          </p>
        </div>

        <ul
          className="
            mt-5
            grid
            grid-cols-2
            gap-x-4
            gap-y-5

            sm:gap-x-6
            md:grid-cols-4
          "
        >
          {homeWhyCopy.items.map((item, index) => {
            const Icon = icons[index] ?? ShapesIcon;

            return (
              <li
                key={item.title}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <Icon
                  aria-hidden="true"
                  className="size-10 shrink-0 text-secondary sm:size-12"
                  strokeWidth={1.6}
                />
                <h3 className="mt-2 type-body-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 type-caption leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
