"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { isKnownDuplicateContentImage } from "@/lib/home/known-duplicate-content-image/known-duplicate-content-image";

type ServiceContentImageProps = {
  src?: string;
  alt: string;
};

export function ServiceContentImage({ src, alt }: ServiceContentImageProps) {
  const [failed, setFailed] = useState(false);
  const knownDuplicateImage = isKnownDuplicateContentImage(src);

  if (!src || failed || knownDuplicateImage) {
    return (
      <span
        role="img"
        aria-label={`${alt}؛ تصویر در دسترس نیست`}
        className="
          flex
          h-20
          w-[142px]
          shrink-0
          items-center
          justify-center

          rounded-lg
          border
          border-border-subtle

          bg-surface-subtle
          text-foreground-subtle

          sm:h-[92px]
          sm:w-[164px]

          lg:h-[122px]
          lg:w-[218px]
        "
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
      sizes="(min-width: 1024px) 218px, (min-width: 640px) 164px, 142px"
      onError={() => setFailed(true)}
      className="
        h-20
        w-[142px]
        shrink-0
        rounded-lg
        border
        border-border-subtle
        object-cover

        sm:h-[92px]
        sm:w-[164px]

        lg:h-[122px]
        lg:w-[218px]
      "
    />
  );
}
