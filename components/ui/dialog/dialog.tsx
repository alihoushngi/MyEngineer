"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Dialog(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(
  props: ComponentProps<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(
  props: ComponentProps<typeof DialogPrimitive.Close>,
) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
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

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />

      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          `
            fixed
            inset-x-3
            bottom-3
            z-50

            grid
            max-h-[calc(100dvh-1.5rem)]
            gap-5
            overflow-x-hidden
            overflow-y-auto

            rounded-3xl
            border
            border-border-subtle
            bg-surface-elevated

            p-card

            text-foreground

            shadow-xl

            outline-none

            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:slide-out-to-bottom-4
            data-[state=closed]:zoom-out-95

            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:slide-in-from-bottom-4
            data-[state=open]:zoom-in-95

            sm:inset-x-auto
            sm:bottom-auto
            sm:left-1/2
            sm:top-1/2

            sm:w-full
            sm:max-w-lg
            sm:max-h-[min(90dvh,42rem)]

            sm:-translate-x-1/2
            sm:-translate-y-1/2

            sm:gap-6

            sm:data-[state=closed]:slide-out-to-bottom-0
            sm:data-[state=open]:slide-in-from-bottom-0
          `,
          className,
        )}
        {...props}
      >
        {children}

        <DialogPrimitive.Close
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
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        `
          flex
          min-w-0
          flex-col
          gap-2

          pe-12
          text-start
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        `
          flex
          flex-col-reverse
          gap-2

          pt-1

          sm:flex-row
          sm:flex-wrap
          sm:items-center
          sm:justify-start
          sm:gap-3
        `,
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
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

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
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
