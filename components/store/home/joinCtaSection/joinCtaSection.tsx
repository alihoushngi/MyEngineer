import { ImageIcon } from "lucide-react";

import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { homeJoinCopy } from "@/config/home.config/home.config";

export function JoinCtaSection() {
  return (
    <section
      aria-labelledby="join-cta-heading"
      className="bg-background py-4 sm:py-6"
    >
      <div className="container-narrow">
        <div className="rounded-lg border border-border-subtle bg-surface p-3 sm:p-4">
          <h2
            id="join-cta-heading"
            className="text-end type-h3 text-foreground"
          >
            {homeJoinCopy.title}
          </h2>

          <div
            role="img"
            aria-label="تصویر دعوت به همکاری متخصصان در API موجود نیست"
            className="
              mx-auto
              mt-3
              flex
              h-36
              w-full
              max-w-[500px]
              flex-col
              items-center
              justify-center
              gap-2

              rounded-lg
              border
              border-border-subtle

              bg-surface-subtle
              text-foreground-subtle

              sm:h-48
            "
          >
            <ImageIcon aria-hidden="true" className="size-7" />
            <span className="type-caption">
              تصویر معرفی متخصصان در API موجود نیست
            </span>
          </div>

          <p className="mt-3 type-body-sm leading-relaxed text-foreground-muted">
            {homeJoinCopy.description}
          </p>

          <JoinLink
            size="md"
            className="
              mt-3
              rounded-lg
              bg-primary
              text-primary-foreground

              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              focus-visible:ring-offset-surface
            "
          />
        </div>
      </div>
    </section>
  );
}
