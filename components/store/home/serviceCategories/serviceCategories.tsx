import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { Button } from "@/components/ui/button/button";

import { homeServicesCopy } from "@/config/home.config/home.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export function ServiceCategories() {
  return (
    <section
      id="service-categories"
      aria-labelledby="service-categories-heading"
      className="
        relative
        isolate
        scroll-mt-[calc(5.75rem+env(safe-area-inset-top))]
        overflow-hidden
        bg-background-subtle
      "
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-40
          -top-48
          -z-10

          size-128

          rounded-full

          bg-primary/6
          blur-[120px]

          sm:size-160
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-56
          -inset-e-40
          -z-10

          size-136

          rounded-full

          bg-secondary/5
          blur-[130px]

          sm:size-168
        "
      />

      {/* subtle top separator */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px

          bg-linear-to-r
          from-transparent
          via-border
          to-transparent
        "
      />

      <div className="container-app py-section">
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
            titleId="service-categories-heading"
            title={homeServicesCopy.title}
            description={homeServicesCopy.description}
            action={
              <Button
                asChild
                variant="outline"
                size="sm"
                className="
                  group
                  w-full

                  border-border-subtle
                  bg-surface/80

                  shadow-xs
                  backdrop-blur-md

                  hover:border-primary/25
                  hover:bg-primary-subtle
                  hover:text-primary

                  sm:w-auto

                  transition-all
                  duration-200
                  ease-in-out
                "
              >
                <Link href={storePaths.faq}>
                  {homeServicesCopy.faqLabel}

                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-(--duration-normal)
                      ease-(--ease-standard)

                      group-hover:-translate-x-0.5

                      motion-reduce:transform-none
                    "
                  />
                </Link>
              </Button>
            }
          />

          <div
            className="
              relative

              rounded-4xl

              before:pointer-events-none
              before:absolute
              before:inset-x-10
              before:-top-px
              before:h-px
              before:bg-linear-to-r
              before:from-transparent
              before:via-primary/20
              before:to-transparent
            "
          >
            <ServiceCategoryGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
