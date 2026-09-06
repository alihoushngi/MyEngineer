import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

const alertVariants = cva(
  `
    relative
    grid
    w-full
    grid-cols-[auto_minmax(0,1fr)]
    items-start
    gap-x-3
    gap-y-1

    overflow-hidden
    rounded-2xl
    border
    px-4
    py-3.5

    type-body-sm
    text-foreground

    shadow-xs

    transition-[background-color,border-color,box-shadow]
    duration-(--duration-normal)
    ease-[var(--ease-standard)]

    before:absolute
    before:inset-y-3
    before:start-0
    before:w-1
    before:rounded-full

    [&>svg]:relative
    [&>svg]:mt-0.5
    [&>svg]:size-5
    [&>svg]:shrink-0

    sm:gap-x-4
    sm:px-5
    sm:py-4
  `,
  {
    variants: {
      variant: {
        info: `
          border-info/20
          bg-info/8

          before:bg-info

          [&>svg]:text-info
        `,

        success: `
          border-success/20
          bg-success/8

          before:bg-success

          [&>svg]:text-success
        `,

        warning: `
          border-warning/25
          bg-warning/10

          before:bg-warning

          [&>svg]:text-warning
        `,

        danger: `
          border-danger/20
          bg-danger/8

          before:bg-danger

          [&>svg]:text-danger
        `,
      },
    },

    defaultVariants: {
      variant: "info",
    },
  },
);

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;

export function Alert({ className, variant = "info", ...props }: AlertProps) {
  const role =
    variant === "danger" || variant === "warning" ? "alert" : "status";

  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role={role}
      className={cn(
        alertVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        `
          col-start-2
          min-w-0

          font-semibold
          leading-6
          text-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        `
          col-start-2
          min-w-0

          type-body-sm
          leading-relaxed
          text-foreground-muted

          [&_a]:font-medium
          [&_a]:text-current
          [&_a]:underline
          [&_a]:underline-offset-4

          [&_p+p]:mt-2
        `,
        className,
      )}
      {...props}
    />
  );
}
