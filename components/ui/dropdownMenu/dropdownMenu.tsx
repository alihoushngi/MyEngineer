"use client";

import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function DropdownMenu(
  props: ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export function DropdownMenuTrigger(
  props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          `
            z-50

            min-w-44
            max-w-[min(20rem,calc(100vw-2rem))]

            overflow-hidden

            rounded-2xl
            border
            border-border-subtle

            bg-popover
            p-1.5

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
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuGroup(
  props: ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

export function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "danger";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        `
          relative

          flex
          min-h-11
          min-w-0
          cursor-default
          select-none
          items-center
          gap-2.5

          rounded-xl

          px-3
          py-2

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

          data-disabled:pointer-events-none
          data-disabled:opacity-45

          data-inset:ps-9

          data-[variant=danger]:text-danger

          data-[variant=danger]:focus:bg-danger/10
          data-[variant=danger]:focus:text-danger

          data-[variant=danger]:data-highlighted:bg-danger/10
          data-[variant=danger]:data-highlighted:text-danger

          [&_svg]:pointer-events-none
          [&_svg]:shrink-0
          [&_svg]:text-foreground-muted

          data-[variant=danger]:[&_svg]:text-danger

          [&_svg:not([class*='size-'])]:size-4
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      checked={checked}
      className={cn(
        `
          relative

          flex
          min-h-11
          min-w-0
          cursor-default
          select-none
          items-center
          gap-2.5

          rounded-xl

          py-2
          pe-3
          ps-9

          type-body-sm
          text-foreground

          outline-none

          transition-[background-color,color]
          duration-(--duration-fast)
          ease-(--ease-standard)

          focus:bg-surface-muted

          data-highlighted:bg-surface-muted

          data-disabled:pointer-events-none
          data-disabled:opacity-45

          data-[state=checked]:text-primary
        `,
        className,
      )}
      {...props}
    >
      <span
        className="
          pointer-events-none
          absolute
          inset-s-2.5

          flex
          size-5
          items-center
          justify-center

          rounded-md

          text-primary
        "
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" strokeWidth={2.5} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        `
          px-3
          pb-1.5
          pt-2.5

          type-caption
          font-semibold
          text-foreground-muted

          data-inset:ps-9
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
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

export function DropdownMenuSub(
  props: ComponentProps<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        `
          flex
          min-h-11
          min-w-0
          cursor-default
          select-none
          items-center
          gap-2.5

          rounded-xl

          px-3
          py-2

          type-body-sm
          text-foreground

          outline-none

          transition-[background-color,color]
          duration-(--duration-fast)
          ease-(--ease-standard)

          focus:bg-surface-muted

          data-highlighted:bg-surface-muted
          data-[state=open]:bg-surface-muted
          data-[state=open]:text-primary

          data-inset:ps-9

          [&_svg]:shrink-0
          [&_svg]:text-foreground-muted

          data-[state=open]:[&_svg]:text-primary
        `,
        className,
      )}
      {...props}
    >
      {children}

      <ChevronLeftIcon
        aria-hidden="true"
        className="
          ms-auto
          size-4
          ltr:hidden
        "
      />

      <ChevronRightIcon
        aria-hidden="true"
        className="
          ms-auto
          size-4
          rtl:hidden
        "
      />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      sideOffset={sideOffset}
      className={cn(
        `
          z-50

          min-w-44
          max-w-[min(20rem,calc(100vw-2rem))]

          overflow-hidden

          rounded-2xl
          border
          border-border-subtle

          bg-popover
          p-1.5

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
        className,
      )}
      {...props}
    />
  );
}
