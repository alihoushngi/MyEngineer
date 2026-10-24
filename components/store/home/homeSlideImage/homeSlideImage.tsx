"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Image, { type ImageProps } from "next/image";

type HomeSlideImageProps = Omit<ImageProps, "onError" | "src"> & {
  src?: string;
};

/** Keep API banner geometry stable when the backend omits or cannot serve its image. */
export function HomeSlideImage({
  src,
  alt,
  ...props
}: HomeSlideImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        role="img"
        aria-label={`${alt || "تصویر بنر"}؛ تصویر در دسترس نیست`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-muted px-3 text-center type-caption text-foreground-subtle"
      >
        <ImageIcon aria-hidden="true" className="size-6" />
        <span aria-hidden="true">تصویر بنر در دسترس نیست</span>
      </span>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
