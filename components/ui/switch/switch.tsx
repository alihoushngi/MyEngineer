"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
          peer
          inline-flex
          h-7
          w-12
          shrink-0
          items-center

          rounded-full
          border
          border-border-subtle

          bg-surface-muted

          shadow-inner

          outline-none

          transition-[background-color,border-color,box-shadow]
          duration-(--duration-fast)
          ease-(--ease-standard)

          hover:border-border-interactive

          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-50

          aria-invalid:border-danger
          aria-invalid:ring-2
          aria-invalid:ring-danger/15

          data-[state=checked]:border-primary
          data-[state=checked]:bg-primary
          data-[state=checked]:shadow-sm
        `,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="
          pointer-events-none

          block
          size-5.5
          shrink-0

          rounded-full

          bg-background

          shadow-sm

          ring-0

          transition-[transform,background-color,box-shadow]
          duration-(--duration-fast)
          ease-(--ease-standard)

          data-[state=checked]:translate-x-5

          data-[state=unchecked]:translate-x-0

          rtl:data-[state=checked]:-translate-x-5
          rtl:data-[state=unchecked]:translate-x-0

          data-[state=checked]:shadow-md

          motion-reduce:transition-none
        "
      />
    </SwitchPrimitive.Root>
  );
}
