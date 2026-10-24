import Link from "next/link";
import {
  Building2Icon,
  CableIcon,
  DraftingCompassIcon,
  WindIcon,
} from "lucide-react";

import { ServiceContentImage } from "@/components/store/home/serviceContentImage/serviceContentImage";
import { homeDrawingCopy } from "@/config/home.config/home.config";
import { type HomeDrawingService } from "@/types/store/home.types";

type DrawingConsultationProps = {
  items: readonly HomeDrawingService[];
};

const disciplines = [
  {
    title: "ترسیم نقشه معماری",
    matches: ["معماری"],
    Icon: DraftingCompassIcon,
  },
  {
    title: "ترسیم نقشه سازه",
    matches: ["سازه"],
    Icon: Building2Icon,
  },
  {
    title: "ترسیم نقشه برق",
    matches: ["برق", "الکت"],
    Icon: CableIcon,
  },
  {
    title: "ترسیم نقشه مکانیک",
    matches: ["مکانیک"],
    Icon: WindIcon,
  },
] as const;

export function DrawingConsultation({ items }: DrawingConsultationProps) {
  return (
    <section
      aria-labelledby="drawing-consultation-heading"
      className="bg-background py-4 sm:py-6"
    >
      <div className="container-wide">
        <h2
          id="drawing-consultation-heading"
          className="mb-3 text-end type-h3 text-foreground"
        >
          {homeDrawingCopy.title}
        </h2>

        <ul
          aria-labelledby="drawing-consultation-heading"
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
          {disciplines.map(({ title, matches, Icon }) => {
            const item = items.find((candidate) =>
              matches.some((match) => candidate.title.includes(match)),
            );
            const label = item?.title ?? title;
            const cardClass = `
              block
              w-[142px]
              shrink-0
              snap-start
              rounded-lg
              text-center
              text-foreground-muted

              sm:w-[164px]
              lg:w-[218px]
            `;

            return (
              <li key={title} className="min-w-0">
                {item ? (
                  <Link href={item.href} className={cardClass}>
                    <ServiceContentImage
                      key={`${item.id}-${item.imageSrc ?? "missing"}`}
                      src={item.imageSrc}
                      alt={label}
                    />
                    <span className="mt-1 block type-body-sm">{label}</span>
                  </Link>
                ) : (
                  <div className={cardClass} aria-disabled="true">
                    <span
                      role="img"
                      aria-label={`${label}؛ تصویر و اطلاعات خدمت در دسترس نیست`}
                      className="
                        flex
                        h-20
                        w-full
                        items-center
                        justify-center

                        rounded-lg
                        border
                        border-border-subtle

                        bg-surface-subtle
                        text-foreground-subtle

                        sm:h-[92px]
                        lg:h-[122px]
                      "
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="mt-1 block type-body-sm">{label}</span>
                    <span className="mt-1 block type-caption text-foreground-subtle">
                      اطلاعات خدمت دریافت نشد
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
