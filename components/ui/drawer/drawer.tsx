"use client";

import { XIcon } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Drawer({
  shouldScaleBackground = false,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

export function DrawerTrigger(
  props: ComponentProps<typeof DrawerPrimitive.Trigger>,
) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerClose(
  props: ComponentProps<typeof DrawerPrimitive.Close>,
) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerOverlay({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        `
          fixed
          inset-0
          z-50

          bg-overlay
          backdrop-blur-[2px]

          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0

          data-[state=open]:animate-in
          data-[state=open]:fade-in-0
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />

      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          `
            group/drawer-content
            fixed
            z-50

            flex
            h-auto
            max-h-[88dvh]
            flex-col

            overflow-hidden

            border-border-subtle
            bg-surface-elevated
            text-foreground

            shadow-xl

            outline-none

            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0

            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
          `,

          `
            data-[vaul-drawer-direction=top]:inset-x-2
            data-[vaul-drawer-direction=top]:top-2

            data-[vaul-drawer-direction=top]:rounded-b-3xl
            data-[vaul-drawer-direction=top]:rounded-t-2xl

            data-[vaul-drawer-direction=top]:border
          `,

          `
            data-[vaul-drawer-direction=bottom]:inset-x-2
            data-[vaul-drawer-direction=bottom]:bottom-2

            data-[vaul-drawer-direction=bottom]:rounded-t-3xl
            data-[vaul-drawer-direction=bottom]:rounded-b-2xl

            data-[vaul-drawer-direction=bottom]:border

            sm:data-[vaul-drawer-direction=bottom]:inset-x-4
            sm:data-[vaul-drawer-direction=bottom]:bottom-4
          `,

          `
            data-[vaul-drawer-direction=right]:inset-y-2
            data-[vaul-drawer-direction=right]:right-2

            data-[vaul-drawer-direction=right]:w-[calc(100%-1rem)]
            data-[vaul-drawer-direction=right]:max-w-md

            data-[vaul-drawer-direction=right]:rounded-3xl
            data-[vaul-drawer-direction=right]:border

            sm:data-[vaul-drawer-direction=right]:inset-y-4
            sm:data-[vaul-drawer-direction=right]:right-4
            sm:data-[vaul-drawer-direction=right]:w-full
          `,

          `
            data-[vaul-drawer-direction=left]:inset-y-2
            data-[vaul-drawer-direction=left]:left-2

            data-[vaul-drawer-direction=left]:w-[calc(100%-1rem)]
            data-[vaul-drawer-direction=left]:max-w-md

            data-[vaul-drawer-direction=left]:rounded-3xl
            data-[vaul-drawer-direction=left]:border

            sm:data-[vaul-drawer-direction=left]:inset-y-4
            sm:data-[vaul-drawer-direction=left]:left-4
            sm:data-[vaul-drawer-direction=left]:w-full
          `,

          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="
            mx-auto
            mt-3
            hidden
            h-1.5
            w-14
            shrink-0

            rounded-full
            bg-border-strong/70

            group-data-[vaul-drawer-direction=bottom]/drawer-content:block
          "
        />

        {children}

        <DrawerPrimitive.Close
          className="
            absolute
            inset-e-3
            top-3

            flex
            size-11
            items-center
            justify-center

            rounded-xl

            text-foreground-muted

            outline-none

            transition-[background-color,color,transform]
            duration-(--duration-fast)
            ease-(--ease-standard)

            hover:bg-surface-muted
            hover:text-foreground

            active:scale-95

            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            focus-visible:ring-offset-surface-elevated

            disabled:pointer-events-none
            disabled:opacity-50

            motion-reduce:transform-none
          "
        >
          <XIcon aria-hidden="true" className="size-4.5" />

          <span className="sr-only">بستن</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        `
          flex
          min-w-0
          flex-col
          gap-2

          px-5
          pb-4
          pt-5
          pe-14

          text-start

          sm:px-6
          sm:pb-5
          sm:pt-6
          sm:pe-16
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        `
          mt-auto
          flex
          flex-col
          gap-3

          border-t
          border-border-subtle

          bg-surface-elevated/95

          px-5
          pt-4
          pb-[max(1.25rem,env(safe-area-inset-bottom))]

          sm:px-6
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        `
          min-w-0

          type-h3
          font-semibold
          text-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        `
          min-w-0

          type-body-sm
          leading-relaxed
          text-foreground-muted
        `,
        className,
      )}
      {...props}
    />
  );
}
