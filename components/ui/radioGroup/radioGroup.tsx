"use client";

import { CircleIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;
type RadioGroupItemProps = ComponentProps<typeof RadioGroupPrimitive.Item>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(
        `
          grid
          gap-3
        `,
        className,
      )}
      {...props}
    />
  );
}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        `
          aspect-square
          size-5
          shrink-0

          rounded-full
          border
          border-input

          bg-input-background

          text-primary

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
          aria-invalid:ring-danger/15

          data-[state=checked]:border-primary
          data-[state=checked]:bg-primary-subtle
          data-[state=checked]:shadow-sm

          motion-reduce:transform-none
        `,
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="
          relative
          flex
          items-center
          justify-center

          text-primary

          transition-[opacity,transform]
          duration-(--duration-fast)
          ease-(--ease-standard)

          data-[state=unchecked]:scale-75
          data-[state=unchecked]:opacity-0

          data-[state=checked]:scale-100
          data-[state=checked]:opacity-100
        "
      >
        <CircleIcon
          aria-hidden="true"
          className="
            size-2.5
            fill-current
            text-current
          "
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
