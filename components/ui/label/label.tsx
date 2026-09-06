"use client";

import { Label as LabelPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `
          inline-flex
          w-fit
          items-center
          gap-1.5

          type-label
          font-medium
          leading-none
          text-foreground

          select-none

          transition-[color,opacity]
          duration-(--duration-fast)
          ease-(--ease-standard)

          group-data-[disabled=true]:pointer-events-none
          group-data-[disabled=true]:cursor-not-allowed
          group-data-[disabled=true]:text-foreground-muted
          group-data-[disabled=true]:opacity-60

          group-data-[invalid=true]:text-danger

          peer-disabled:pointer-events-none
          peer-disabled:cursor-not-allowed
          peer-disabled:text-foreground-muted
          peer-disabled:opacity-60
        `,
        className,
      )}
      {...props}
    />
  );
}
