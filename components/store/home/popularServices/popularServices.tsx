import Link from "next/link";

import { ServiceContentImage } from "@/components/store/home/serviceContentImage/serviceContentImage";
import { homePopularCopy } from "@/config/home.config/home.config";
import { type HomePopularService } from "@/types/store/home.types";

type PopularServicesProps = {
  items: readonly HomePopularService[];
};

export function PopularServices({ items }: PopularServicesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-services-heading"
      className="bg-background py-4 sm:py-6"
    >
      <div className="container-wide">
        <h2
          id="popular-services-heading"
          className="mb-3 text-end type-h3 text-foreground"
        >
          {homePopularCopy.title}
        </h2>

        <ul
          aria-labelledby="popular-services-heading"
          className="
            -mx-4
            flex
            snap-x
            snap-mandatory
            gap-2
            overflow-x-auto
            px-4
            pb-2

            scrollbar-none
            [&::-webkit-scrollbar]:hidden

            sm:mx-0
            sm:px-0
          "
        >
          {items.map((item) => (
            <li key={item.id} className="min-w-0 shrink-0 snap-start">
              <Link
                href={item.href}
                className="
                  block
                  rounded-lg
                  text-center
                  text-foreground-muted
                  outline-none

                  transition-colors
                  duration-200
                  ease-in-out

                  hover:text-primary

                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                <ServiceContentImage
                  key={`${item.id}-${item.imageSrc ?? "missing"}`}
                  src={item.imageSrc}
                  alt={item.title}
                />
                <span className="mt-1 block max-w-[218px] type-body-sm">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
