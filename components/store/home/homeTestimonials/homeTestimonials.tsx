"use client";

import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { AuthRequiredAction } from "@/components/store/auth/authRequiredAction/authRequiredAction";
import { TestimonialSubmitDialog } from "@/components/store/home/homeTestimonials/testimonialSubmitDialog/testimonialSubmitDialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { homeTestimonialCopy } from "@/config/home.config/home.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";
import { isKnownDuplicateContentImage } from "@/lib/home/known-duplicate-content-image/known-duplicate-content-image";

type HomeTestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  photoSrc?: string;
};

type HomeTestimonialsProps = {
  items?: readonly HomeTestimonialItem[];
  isAuthenticated?: boolean;
  userName?: string;
};

export function HomeTestimonials({
  items = [],
  isAuthenticated = false,
  userName,
}: HomeTestimonialsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dialogOpen, setDialogOpen] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-testimonials-heading"
      className="bg-surface-subtle py-5 sm:py-8"
    >
      <div className="container-narrow">
        <div className="text-center">
          <p className="type-caption font-semibold text-secondary">
            {homeTestimonialCopy.eyebrow}
          </p>
          <h2
            id="home-testimonials-heading"
            className="mt-1 type-h3 text-foreground"
          >
            {homeTestimonialCopy.title}
          </h2>
        </div>

        <div className="mt-4 rounded-lg border border-border-subtle bg-surface px-4 py-5 sm:px-8 sm:py-7">
          <Swiper
            dir="rtl"
            modules={[A11y, Keyboard, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={12}
            loop={items.length > 1}
            speed={prefersReducedMotion ? 0 : 250}
            keyboard={{ enabled: true, onlyInViewport: true }}
            pagination={
              items.length > 1
                ? {
                    clickable: true,
                  }
                : false
            }
            a11y={{
              enabled: true,
              containerMessage: "نظر کاربران",
              paginationBulletMessage: "نمایش نظر {{index}}",
            }}
            className="
              home-testimonials-swiper
              w-full
              pb-8
              text-center

              [&_.swiper-pagination]:bottom-0
              [&_.swiper-pagination-bullet]:bg-border-strong
              [&_.swiper-pagination-bullet-active]:bg-secondary
            "
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <article className="flex min-h-52 flex-col items-center justify-center text-center">
                  <Avatar size="lg" className="rounded-full">
                    {item.photoSrc &&
                    !isKnownDuplicateContentImage(item.photoSrc) ? (
                      <AvatarImage src={item.photoSrc} alt="" />
                    ) : null}
                    <AvatarFallback>{item.author.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <cite className="mt-2 not-italic type-body font-semibold text-foreground">
                    {item.author}
                  </cite>
                  {item.role ? (
                    <p className="mt-0.5 type-caption text-foreground-muted">
                      {item.role}
                    </p>
                  ) : null}
                  <blockquote className="mx-auto mt-3 max-w-3xl type-body-sm leading-relaxed text-foreground">
                    «{item.quote}»
                  </blockquote>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {items.length > 1 ? (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="نظر قبلی"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex size-9 items-center justify-center rounded-lg border border-border-subtle text-foreground-muted outline-none hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="نظر بعدی"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex size-9 items-center justify-center rounded-lg border border-border-subtle text-foreground-muted outline-none hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex flex-col items-center gap-2 text-center">
          <p className="type-caption text-foreground-muted">
            {homeTestimonialCopy.submitNote}
          </p>
          <AuthRequiredAction
            isAuthenticated={isAuthenticated}
            nextPath="/"
            label={homeTestimonialCopy.submitCta}
            variant="outline"
            onAuthenticatedClick={() => setDialogOpen(true)}
          />
        </div>

        <TestimonialSubmitDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          defaultName={userName}
        />
      </div>
    </section>
  );
}
