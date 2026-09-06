import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

const visualMap: Record<ServiceSlug, { image: string; accent: string }> = {
  "land-surveying": {
    image: "/images/services/surveying.png",
    accent: "bg-category-teal",
  },
  "construction-workers": {
    image: "/images/services/contractor.png",
    accent: "bg-category-orange",
  },
  drawing: {
    image: "/images/services/engineeringservice.png",
    accent: "bg-category-blue",
  },
  "interior-design": {
    image: "/images/services/designer.png",
    accent: "bg-category-violet",
  },
  "building-permit": {
    image: "/images/services/licence.png",
    accent: "bg-category-green",
  },
  "administrative-services": {
    image: "/images/services/adminastrative.png",
    accent: "bg-category-rose",
  },
};

export function ServiceCategoryGrid({
  onServiceSelect,
  hideDescription = false,
}: ServiceCategoryGridProps) {
  return (
    <ul
      className="
      relative grid grid-cols-2 gap-2
      overflow-hidden rounded-[28px]
      border border-white/15
      bg-white/5
      p-2
      shadow-[0_20px_70px_rgba(0,0,0,0.08)]
      backdrop-blur-2xl
  
      before:pointer-events-none
      before:absolute before:-right-24 before:-top-24
      before:size-72 before:rounded-full
      before:bg-primary/10 before:blur-3xl
  
      after:pointer-events-none
      after:absolute after:-bottom-32 after:-left-24
      after:size-72 after:rounded-full
      after:bg-primary/5 after:blur-3xl
  
      sm:grid-cols-3
      sm:gap-3
      sm:p-3
    "
    >
      {serviceCategories.map((service, index) => {
        const visual = visualMap[service.slug];

        return (
          <li key={service.slug} className="relative z-10 min-w-0">
            <Link
              href={service.href}
              onClick={onServiceSelect}
              className="
              group block h-full rounded-[22px]
              outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
            "
            >
              <GlassInfoCard
                className="
                relative flex min-h-44 h-full flex-col
                overflow-hidden rounded-[22px]
                border border-white/10
                bg-white/[0.07]
                p-3
                shadow-none
                backdrop-blur-xl
                transition-all duration-500 ease-out
  
                before:pointer-events-none
                before:absolute before:inset-0
                before:bg-linear-to-br
                before:from-white/15
                before:via-transparent
                before:to-transparent
                before:opacity-80
  
                group-hover:-translate-y-1
                group-hover:border-white/25
                group-hover:bg-white/11
                group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]
  
                motion-reduce:transform-none
  
                sm:min-h-60
                sm:p-5
              "
              >
                {/* service number */}
                <span
                  aria-hidden="true"
                  className="
                  absolute left-4 top-3
                  text-[10px] font-medium tracking-[0.18em]
                  text-muted-foreground/40
                  transition-colors duration-300
                  group-hover:text-primary/60
                "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* soft glow behind image */}
                <span
                  aria-hidden="true"
                  className="
                  pointer-events-none
                  absolute right-6 top-10
                  size-24 rounded-full
                  bg-primary/10 blur-3xl
                  transition-all duration-500
                  group-hover:scale-150
                  group-hover:bg-primary/20
                "
                />

                {/* image area */}
                <span
                  className="
                  relative z-10
                  mx-auto mt-5
                  flex size-20 items-center justify-center
                  sm:size-28
                "
                >
                  <span
                    aria-hidden="true"
                    className="
                    absolute inset-1 rounded-full
                    border border-white/10
                    bg-white/6
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
                    backdrop-blur-md
                    transition-all duration-500
  
                    group-hover:scale-110
                    group-hover:border-primary/20
                    group-hover:bg-primary/6
                  "
                  />

                  <span
                    className="
                    relative size-[88%]
                    transition-transform duration-500 ease-out
                    group-hover:-translate-y-1
                    group-hover:scale-105
                    bg-transparent
                  "
                  >
                    <Image
                      src={visual.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-contain bg-transparent"
                    />
                  </span>
                </span>

                {/* content */}
                <span
                  className="
                  relative z-10
                  mt-auto flex items-end justify-between
                  gap-3 pt-5
                "
                >
                  <span className="min-w-0 flex-1">
                    <h4
                      className="
                      type-h4 text-foreground
                      transition-colors duration-300
                      group-hover:text-primary
                    "
                    >
                      {service.label}
                    </h4>

                    {!hideDescription ? (
                      <span
                        className="
                        mt-1.5 hidden
                        max-w-[92%]
                        type-caption
                        leading-relaxed
                        text-muted-foreground
                        sm:block
                      "
                      >
                        {service.description}
                      </span>
                    ) : null}
                  </span>

                  {/* arrow */}
                  <span
                    className="
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/6
                    text-primary
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                    backdrop-blur-md
                    transition-all duration-300
  
                    group-hover:-translate-x-1
                    group-hover:border-primary/20
                    group-hover:bg-primary/10
                    group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                  "
                  >
                    <ArrowLeftIcon aria-hidden="true" className="size-4" />
                  </span>
                </span>

                {/* bottom reflection */}
                <span
                  aria-hidden="true"
                  className="
                  pointer-events-none
                  absolute inset-x-5 bottom-0 h-px
                  bg-linear-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  opacity-50
                "
                />

                {/* hover corner glow */}
                <span
                  aria-hidden="true"
                  className="
                  pointer-events-none
                  absolute -bottom-16 -right-16
                  size-32 rounded-full
                  bg-primary/0 blur-3xl
                  transition-all duration-500
                  group-hover:bg-primary/15
                "
                />
              </GlassInfoCard>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
