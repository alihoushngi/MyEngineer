import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

const badgeVariants = cva(
  `
    inline-flex
    w-fit
    min-w-0
    items-center
    justify-center
    gap-1.5

    rounded-full
    border
    border-transparent

    px-2.5
    py-1

    type-caption
    font-medium
    leading-none

    whitespace-normal
    text-start

    transition-[background-color,border-color,color,box-shadow]
    duration-(--duration-fast)
    ease-[var(--ease-standard)]

    [&>svg]:pointer-events-none
    [&>svg]:size-3.5
    [&>svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary-subtle
          text-primary

          border-primary/10
        `,

        secondary: `
          bg-secondary-subtle
          text-foreground

          border-secondary/10
        `,

        outline: `
          border-border
          bg-surface
          text-foreground
        `,

        success: `
          border-success/15
          bg-success/10
          text-success
        `,

        warning: `
          border-warning/20
          bg-warning/10
          text-warning
        `,

        danger: `
          border-danger/15
          bg-danger/10
          text-danger
        `,

        info: `
          border-info/15
          bg-info/10
          text-info
        `,
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

export function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        badgeVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { badgeVariants };

export type { BadgeProps };
