"use client";

import { QuoteIcon, SparklesIcon } from "lucide-react";

import { A11y, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { homeTestimonialCopy } from "@/config/home.config/home.config";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";

export function HomeTestimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const testimonials = homeTestimonialCopy.items;

  return (
    <section
      aria-labelledby="home-testimonials-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-surface-subtle

        py-section
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-s-40
          -top-44
          -z-10

          size-120
          rounded-full

          bg-primary/6
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-48
          -inset-e-40
          -z-10

          size-128
          rounded-full

          bg-secondary/6
          blur-[140px]
        "
      />

      <div className="container-narrow">
        <div
          className="
            flex
            flex-col
            items-center

            text-center
          "
        >
          {/* Eyebrow */}
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
            <SparklesIcon aria-hidden="true" className="size-3.5" />

            {homeTestimonialCopy.eyebrow}
          </p>

          {/* Title */}
          <h2
            id="home-testimonials-heading"
            className="
              mt-4
              max-w-2xl

              type-h1
              text-foreground
            "
          >
            {homeTestimonialCopy.title}
          </h2>

          {/* Carousel */}
          <div
            className="
              mt-8
              w-full
            "
          >
            <Swiper
              dir="rtl"
              modules={[Autoplay, Pagination, A11y]}
              slidesPerView={1}
              spaceBetween={16}
              loop={testimonials.length > 1}
              speed={500}
              grabCursor
              autoplay={
                prefersReducedMotion || testimonials.length <= 1
                  ? false
                  : {
                      delay: 5500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
              }
              pagination={
                testimonials.length > 1
                  ? {
                      clickable: true,
                    }
                  : false
              }
              a11y={{
                enabled: true,
                paginationBulletMessage: "نمایش نظر {{index}}",
              }}
              className="
                home-testimonials-swiper
                w-full
                overflow-visible
              "
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide
                  key={testimonial.id}
                  className="
                      h-auto
                      pb-1
                    "
                >
                  <blockquote
                    className="
                        group
                        relative

                        flex
                        min-h-80
                        w-full
                        flex-col
                        items-center
                        justify-center

                        overflow-hidden

                        rounded-4xl
                        border
                        border-border-subtle

                        bg-surface

                        px-5
                        py-8

                        text-center

                        shadow-sm

                        transition-all
                        duration-200
                        ease-in-out

                        hover:border-primary/15
                        hover:shadow-md

                        sm:min-h-96
                        sm:px-8
                        sm:py-10

                        lg:px-12
                        lg:py-12
                      "
                  >
                    {/* Hover glow */}
                    <div
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          -inset-e-20
                          -top-20

                          size-44
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

                    {/* Bottom glow */}
                    <div
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          -bottom-32
                          -inset-s-24

                          size-64
                          rounded-full

                          bg-secondary/5
                          blur-[90px]
                        "
                    />

                    {/* Top highlight */}
                    <div
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          inset-x-10
                          top-0

                          h-px

                          bg-linear-to-r
                          from-transparent
                          via-primary/30
                          to-transparent
                        "
                    />

                    {/* Number */}
                    <span
                      aria-hidden="true"
                      className="
                          absolute
                          inset-s-5
                          top-5

                          type-caption
                          font-semibold
                          tabular-nums
                          text-foreground-subtle

                          sm:inset-s-7
                          sm:top-7
                        "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Quote icon */}
                    <span
                      aria-hidden="true"
                      className="
                          relative
                          z-10

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

                          group-hover:scale-105
                          group-hover:bg-primary
                          group-hover:text-primary-foreground

                          motion-reduce:transform-none
                        "
                    >
                      <QuoteIcon
                        className="
                            size-5
                            fill-current
                          "
                      />
                    </span>

                    {/* Quote */}
                    <p
                      className="
                          relative
                          z-10

                          mx-auto
                          mt-6
                          max-w-2xl

                          type-body-lg
                          leading-loose
                          text-foreground

                          sm:text-[1.2rem]
                        "
                    >
                      «{testimonial.quote}»
                    </p>

                    {/* Author */}
                    <footer
                      className="
                          relative
                          z-10

                          mt-7

                          flex
                          flex-col
                          items-center
                          gap-1
                        "
                    >
                      <cite
                        className="
                            not-italic

                            type-h4
                            font-semibold
                            text-foreground
                          "
                      >
                        {testimonial.author}
                      </cite>

                      <p
                        className="
                            type-body-sm
                            text-foreground-muted
                          "
                      >
                        {testimonial.role}
                      </p>
                    </footer>

                    <span
                      aria-hidden="true"
                      className="
                          pointer-events-none

                          mx-auto
                          mt-7
                          block

                          h-px
                          w-24

                          bg-linear-to-r
                          from-transparent
                          via-border-strong
                          to-transparent
                        "
                    />
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <p
            className="
              mt-5
              max-w-lg

              type-caption
              leading-relaxed
              text-foreground-muted
            "
          >
            {homeTestimonialCopy.submitNote}
          </p>
        </div>
      </div>
    </section>
  );
}
