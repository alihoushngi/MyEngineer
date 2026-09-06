"use client";

import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `
          peer
          relative
          grid
          size-5
          shrink-0
          place-items-center

          rounded-md
          border
          border-input
          bg-input-background

          text-primary-foreground
          shadow-xs

          outline-none

          transition-[background-color,border-color,box-shadow,transform]
          duration-(--duration-fast)
          ease-(--ease-standard)

          hover:border-border-strong
          hover:bg-surface-muted

          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background

          active:scale-95

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-50

          aria-invalid:border-danger
          aria-invalid:ring-2
          aria-invalid:ring-danger/20

          data-[state=checked]:border-primary
          data-[state=checked]:bg-primary
          data-[state=checked]:shadow-sm

          data-[state=indeterminate]:border-primary
          data-[state=indeterminate]:bg-primary

          motion-reduce:transform-none
        `,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="
          grid
          place-content-center
          text-current

          transition-[opacity,transform]
          duration-(--duration-fast)
          ease-(--ease-standard)

          data-[state=unchecked]:scale-75
          data-[state=unchecked]:opacity-0

          data-[state=checked]:scale-100
          data-[state=checked]:opacity-100
        "
      >
        <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
