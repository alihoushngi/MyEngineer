"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { isKnownDuplicateContentImage } from "@/lib/home/known-duplicate-content-image/known-duplicate-content-image";

type ServiceContentImageProps = {
  src?: string;
  alt: string;
  variant?: "default" | "drawing";
};

export function ServiceContentImage({
  src,
  alt,
  variant = "default",
}: ServiceContentImageProps) {
  const [failed, setFailed] = useState(false);
  const knownDuplicateImage = isKnownDuplicateContentImage(src);
  const imageSizeClass =
    variant === "drawing"
      ? `
          h-20
          w-[142px]
          shrink-0

          min-[500px]:h-[92px]
          min-[500px]:w-[164px]

          min-[800px]:h-[122px]
          min-[800px]:w-[218px]
        `
      : `
          h-20
          w-[142px]
          shrink-0

          sm:h-[92px]
          sm:w-[164px]

          lg:h-[122px]
          lg:w-[218px]
        `;

  if (!src || failed || knownDuplicateImage) {
    return (
      <span
        role="img"
        aria-label={`${alt}؛ تصویر در دسترس نیست`}
        className={`
          flex
          ${imageSizeClass}
          items-center
          justify-center

          rounded-lg
          border
          border-border-subtle

          bg-surface-subtle
          text-foreground-subtle
        `}
      >
        <ImageIcon aria-hidden="true" className="size-6" />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={400}
      height={250}
      sizes={
        variant === "drawing"
          ? "(min-width: 800px) 218px, (min-width: 500px) 164px, 142px"
          : "(min-width: 1024px) 218px, (min-width: 640px) 164px, 142px"
      }
      onError={() => setFailed(true)}
      className={`
        ${imageSizeClass}
        rounded-lg
        border
        border-border-subtle
        object-cover
      `}
    />
  );
}
