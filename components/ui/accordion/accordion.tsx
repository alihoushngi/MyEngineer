"use client";

import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        `
          overflow-hidden
          rounded-2xl
          border
          border-border-subtle
          bg-surface
          shadow-xs

          transition-[background-color,border-color,box-shadow]
          duration-(--duration-normal)
          ease-(--ease-standard)

          data-[state=open]:border-border
          data-[state=open]:bg-surface-elevated
          data-[state=open]:shadow-sm
        `,
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          `
            group/accordion-trigger

            flex
            min-h-14
            min-w-0
            flex-1
            items-center
            justify-between
            gap-4

            px-4
            py-4

            text-start
            type-body
            font-semibold
            text-foreground

            outline-none

            transition-[background-color,color]
            duration-(--duration-fast)
            ease-(--ease-standard)

            hover:bg-surface-muted/60
            hover:text-primary

            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-ring

            disabled:pointer-events-none
            disabled:opacity-50

            data-[state=open]:bg-primary-subtle/45
            data-[state=open]:text-primary

            sm:min-h-16
            sm:px-5
            sm:py-5
          `,
          className,
        )}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>

        <span
          aria-hidden="true"
          className="
            flex
            size-8
            shrink-0
            items-center
            justify-center
            rounded-lg

            bg-surface-muted
            text-muted-foreground

            transition-[background-color,color,transform]
            duration-(--duration-normal)
            ease-(--ease-standard)

            group-hover/accordion-trigger:bg-primary-subtle
            group-hover/accordion-trigger:text-primary

            group-data-[state=open]/accordion-trigger:bg-primary/10
            group-data-[state=open]/accordion-trigger:text-primary
          "
        >
          <ChevronDownIcon
            className="
              size-4

              transition-transform
              duration-(--duration-normal)
              ease-(--ease-standard)

              group-data-[state=open]/accordion-trigger:rotate-180
            "
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="
        overflow-hidden

        data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down
      "
      {...props}
    >
      <div
        className={cn(
          `
            border-t
            border-border-subtle

            px-4
            pb-5
            pt-4

            type-body-sm
            leading-loose
            text-foreground-muted

            sm:px-5
            sm:pb-6
            sm:pt-5
          `,
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
