"use client";

import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type SheetSide = "start" | "end" | "top" | "bottom";

export function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export function SheetTrigger(
  props: ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(props: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export function SheetOverlay({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
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

export function SheetContent({
  className,
  children,
  side = "start",
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />

      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          `
            fixed
            z-50

            flex
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

            motion-reduce:transition-none
          `,

          side === "start" &&
            `
              inset-y-2
              inset-s-2

              h-[calc(100dvh-1rem)]
              w-[calc(100%-1rem)]
              max-w-md

              rounded-3xl
              border

              rtl:data-[state=closed]:slide-out-to-right
              rtl:data-[state=open]:slide-in-from-right

              ltr:data-[state=closed]:slide-out-to-left
              ltr:data-[state=open]:slide-in-from-left

              sm:inset-y-4
              sm:inset-s-4
              sm:h-[calc(100dvh-2rem)]
              sm:w-full
            `,

          side === "end" &&
            `
              inset-y-2
              inset-e-2

              h-[calc(100dvh-1rem)]
              w-[calc(100%-1rem)]
              max-w-md

              rounded-3xl
              border

              rtl:data-[state=closed]:slide-out-to-left
              rtl:data-[state=open]:slide-in-from-left

              ltr:data-[state=closed]:slide-out-to-right
              ltr:data-[state=open]:slide-in-from-right

              sm:inset-y-4
              sm:inset-e-4
              sm:h-[calc(100dvh-2rem)]
              sm:w-full
            `,

          side === "top" &&
            `
              inset-x-2
              top-2

              max-h-[88dvh]

              rounded-3xl
              border

              data-[state=closed]:slide-out-to-top
              data-[state=open]:slide-in-from-top

              sm:inset-x-4
              sm:top-4
            `,

          side === "bottom" &&
            `
              inset-x-2
              bottom-2

              max-h-[88dvh]

              rounded-3xl
              border

              data-[state=closed]:slide-out-to-bottom
              data-[state=open]:slide-in-from-bottom

              sm:inset-x-4
              sm:bottom-4
            `,

          className,
        )}
        {...props}
      >
        {children}

        <SheetPrimitive.Close
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
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        `
          flex
          min-w-0
          flex-col
          gap-2

          border-b
          border-border-subtle

          px-5
          pb-4
          pt-5
          pe-16

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

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
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

export function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
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

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
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
