"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function TooltipProvider({
  delayDuration = 300,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export function TooltipTrigger(
  props: ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          `
            z-50

            w-fit
            max-w-xs

            rounded-xl
            border
            border-white/10

            bg-inverse-surface
            px-3
            py-2

            type-caption
            leading-relaxed
            text-inverse-foreground

            shadow-lg

            outline-none

            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95

            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:zoom-in-95

            data-[side=bottom]:slide-in-from-top-1
            data-[side=left]:slide-in-from-right-1
            data-[side=right]:slide-in-from-left-1
            data-[side=top]:slide-in-from-bottom-1
          `,
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
