"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type HomeSlideImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc: string;
  fallbackAlt?: string;
};

/** An unavailable CMS banner falls back to the existing client artwork. */
export function HomeSlideImage({
  src,
  fallbackSrc,
  fallbackAlt,
  alt,
  ...props
}: HomeSlideImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  return (
    <Image
      {...props}
      src={failedSrc === src ? fallbackSrc : src}
      alt={failedSrc === src ? (fallbackAlt ?? alt) : alt}
      onError={() => {
        if (src !== fallbackSrc) setFailedSrc(src);
      }}
    />
  );
}
