import Link from "next/link";
import {
  ArrowLeftIcon,
  Building2Icon,
  CableIcon,
  DraftingCompassIcon,
  WindIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";

import { homeDrawingCopy } from "@/config/home.config/home.config";

import { type HomeDrawingService } from "@/types/store/home.types";

type DrawingConsultationProps = {
  items: readonly HomeDrawingService[];
};

const icons = [
  DraftingCompassIcon,
  Building2Icon,
  CableIcon,
  WindIcon,
] as const;

export function DrawingConsultation({ items }: DrawingConsultationProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="drawing-consultation-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-secondary-subtle

        py-section
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-48
          -top-40
          -z-10

          size-136
          rounded-full

          bg-secondary/8
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

          bg-primary/6
          blur-[140px]
        "
      />

      <div className="container-app">
        <div
          className="
            flex
            flex-col
            gap-7

            sm:gap-9
            lg:gap-10
          "
        >
          <SectionHeader
            eyebrow="طراحی و مشاوره تخصصی"
            titleId="drawing-consultation-heading"
            title={homeDrawingCopy.title}
            description={homeDrawingCopy.description}
          />

          <ul
            className="
              grid
              gap-3

              sm:grid-cols-2
              sm:gap-4

              lg:grid-cols-4
            "
          >
            {items.map((item, index) => {
              const Icon = icons[index % icons.length] ?? DraftingCompassIcon;

              return (
                <li key={item.id} className="min-w-0">
                  <Link
                    href={item.href}
                    className="
                      group
                      relative

                      flex
                      h-full
                      min-h-52
                      flex-col

                      overflow-hidden

                      rounded-3xl
                      border
                      border-border-subtle

                      bg-surface/80

                      p-5

                      text-foreground

                      shadow-xs
                      backdrop-blur-md

                      outline-none

                      transition-all
                      duration-200
                      ease-in-out

                      hover:-translate-y-1
                      hover:border-secondary/25
                      hover:bg-surface
                      hover:shadow-md

                      focus-visible:ring-2
                      focus-visible:ring-ring
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-secondary-subtle

                      motion-reduce:transform-none

                      sm:min-h-56
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

                        bg-secondary/0
                        blur-3xl

                        transition-all
                        duration-200
                        ease-in-out

                        group-hover:scale-125
                        group-hover:bg-secondary/12
                      "
                    />

                    <span
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
                          border-secondary/10

                          bg-secondary-subtle

                          text-secondary

                          shadow-xs

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:border-secondary/20
                          group-hover:bg-secondary
                          group-hover:text-secondary-foreground
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

                          group-hover:text-secondary
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span
                      className="
                        relative
                        z-10

                        mt-7
                        block
                      "
                    >
                      <span
                        className="
                          block

                          type-h4
                          text-foreground

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:text-secondary
                        "
                      >
                        {item.title}
                      </span>

                      <span
                        className="
                          mt-2
                          block

                          type-body-sm
                          leading-relaxed
                          text-foreground-muted
                        "
                      >
                        {item.description}
                      </span>
                    </span>

                    <span
                      className="
                        relative
                        z-10

                        mt-auto
                        flex
                        items-center
                        justify-between
                        gap-3

                        pt-6
                      "
                    >
                      <span
                        className="
                          type-caption
                          font-medium
                          text-secondary
                        "
                      >
                        مشاهده جزئیات
                      </span>

                      <span
                        className="
                          flex
                          size-9
                          shrink-0
                          items-center
                          justify-center

                          rounded-xl

                          bg-secondary-subtle
                          text-secondary

                          transition-all
                          duration-200
                          ease-in-out

                          group-hover:-translate-x-1
                          group-hover:bg-secondary
                          group-hover:text-secondary-foreground

                          motion-reduce:transform-none
                        "
                      >
                        <ArrowLeftIcon
                          aria-hidden="true"
                          className="
                            size-4
                            ltr:rotate-180
                          "
                        />
                      </span>
                    </span>

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
                        via-secondary/0
                        to-transparent

                        transition-all
                        duration-200
                        ease-in-out

                        group-hover:via-secondary/35
                      "
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
