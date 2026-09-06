"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

const avatarVariants = cva(
  `
    relative
    flex
    shrink-0
    select-none
    items-center
    justify-center
    overflow-hidden

    rounded-full
    border
    border-border-subtle
    bg-surface-muted
    shadow-xs

    text-foreground

    [&_[data-slot=avatar-image]]:transition-[opacity,transform]
    [&_[data-slot=avatar-image]]:duration-(--duration-normal)
    [&_[data-slot=avatar-image]]:ease-[var(--ease-standard)]
  `,
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-16",
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

export function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        avatarVariants({
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        `
          aspect-square
          size-full

          object-cover
          object-center
        `,
        className,
      )}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        `
          flex
          size-full
          items-center
          justify-center

          rounded-full

          bg-primary-subtle
          text-primary

          type-body-sm
          font-semibold

          uppercase
        `,
        className,
      )}
      {...props}
    />
  );
}
