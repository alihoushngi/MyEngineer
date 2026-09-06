"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

export function Progress({ className, value, ...props }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value ?? 0));

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={safeValue}
      className={cn(
        `
          relative
          h-2.5
          w-full

          overflow-hidden

          rounded-full

          bg-primary/10

          shadow-inner
        `,
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="
          absolute
          inset-y-0
          inset-s-0

          h-full

          rounded-full

          bg-primary

          shadow-sm

          transition-[width]
          duration-(--duration-slow)
          ease-(--ease-standard)

          motion-reduce:transition-none
        "
        style={{
          width: `${safeValue}%`,
        }}
      >
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0

            h-px

            bg-primary-foreground/25
          "
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}
