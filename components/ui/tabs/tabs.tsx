"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        `
          flex
          min-w-0
          flex-col
          gap-4
        `,
        className,
      )}
      {...props}
    />
  );
}

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        `
          inline-flex
          min-h-12
          w-fit
          max-w-full
          items-center

          gap-1

          overflow-x-auto

          rounded-2xl
          border
          border-border-subtle

          bg-surface-muted

          p-1

          text-foreground-muted

          shadow-inner

          scrollbar-none
          [&::-webkit-scrollbar]:hidden
        `,
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `
          relative

          inline-flex
          min-h-10
          shrink-0
          items-center
          justify-center
          gap-1.5

          rounded-xl

          px-3.5

          type-body-sm
          font-medium
          whitespace-nowrap

          text-foreground-muted

          outline-none

          transition-[background-color,color,box-shadow,transform]
          duration-(--duration-fast)
          ease-(--ease-standard)

          hover:bg-surface
          hover:text-foreground

          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-1
          focus-visible:ring-offset-surface-muted

          active:scale-[0.98]

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-45

          data-[state=active]:bg-surface-elevated
          data-[state=active]:text-primary
          data-[state=active]:shadow-sm

          motion-reduce:transform-none

          [&_svg]:pointer-events-none
          [&_svg]:size-4
          [&_svg]:shrink-0
        `,
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        `
          min-w-0

          outline-none

          focus-visible:ring-2
          focus-visible:ring-ring/20
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
        `,
        className,
      )}
      {...props}
    />
  );
}
