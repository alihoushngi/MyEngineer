"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Select(props: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export function SelectGroup(
  props: ComponentProps<typeof SelectPrimitive.Group>,
) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectValue(
  props: ComponentProps<typeof SelectPrimitive.Value>,
) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export function SelectTrigger({
  className,
  size = "md",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "md";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        `
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-2.5

          rounded-xl
          border
          border-input

          bg-input-background

          px-3.5

          type-body
          text-foreground

          shadow-xs

          outline-none

          transition-[background-color,border-color,box-shadow]
          duration-(--duration-fast)
          ease-(--ease-standard)

          hover:border-border-interactive

          focus-visible:border-ring
          focus-visible:bg-surface
          focus-visible:ring-2
          focus-visible:ring-ring/15

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:bg-surface-muted
          disabled:text-foreground-muted
          disabled:opacity-60

          aria-invalid:border-danger
          aria-invalid:ring-2
          aria-invalid:ring-danger/15

          data-placeholder:text-foreground-subtle

          data-[size=md]:h-12
          data-[size=sm]:h-10

          [&_svg]:pointer-events-none
          [&_svg]:size-4
          [&_svg]:shrink-0
          [&_svg]:text-foreground-muted
        `,
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-start">{children}</span>

      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          aria-hidden="true"
          className="
            transition-transform
            duration-(--duration-normal)
            ease-(--ease-standard)

            [[data-state=open]>&]:rotate-180
          "
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 8,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          `
            relative
            z-50

            max-h-(--radix-select-content-available-height)
            min-w-40
            max-w-[min(22rem,calc(100vw-2rem))]

            overflow-hidden

            rounded-2xl
            border
            border-border-subtle

            bg-popover

            text-popover-foreground

            shadow-lg

            outline-none

            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95

            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:zoom-in-95

            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
          `,
          position === "popper" &&
            `
              data-[side=bottom]:translate-y-1
              data-[side=top]:-translate-y-1
            `,
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            `
              p-1.5
            `,
            position === "popper" &&
              `
                w-full
                min-w-(--radix-select-trigger-width)
              `,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        `
          relative

          flex
          min-h-11
          w-full
          min-w-0
          cursor-default
          select-none
          items-center
          gap-2

          rounded-xl

          py-2
          pe-9
          ps-3

          type-body-sm
          text-foreground

          outline-none

          transition-[background-color,color]
          duration-(--duration-fast)
          ease-(--ease-standard)

          focus:bg-surface-muted
          focus:text-foreground

          data-highlighted:bg-surface-muted
          data-highlighted:text-foreground

          data-[state=checked]:bg-primary-subtle/60
          data-[state=checked]:text-primary

          data-disabled:pointer-events-none
          data-disabled:opacity-45
        `,
        className,
      )}
      {...props}
    >
      <span
        className="
          absolute
          inset-e-2.5

          flex
          size-5
          items-center
          justify-center

          rounded-md

          text-primary
        "
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" strokeWidth={2.5} />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        `
          -mx-1.5
          my-1.5
          h-px
          bg-border-subtle
        `,
        className,
      )}
      {...props}
    />
  );
}
