import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

const cardVariants = cva(
  `
    flex
    flex-col
    gap-4

    rounded-2xl
    border

    p-(--space-card)

    text-card-foreground

    transition-[background-color,border-color,box-shadow,transform]
    duration-(--duration-normal)
    ease-[var(--ease-standard)]
  `,
  {
    variants: {
      variant: {
        default: `
          border-border-subtle
          bg-card
          shadow-xs
        `,

        elevated: `
          border-border-subtle
          bg-surface-elevated
          shadow-md
        `,

        muted: `
          border-border-subtle
          bg-surface-muted
          shadow-none
        `,

        outline: `
          border-border
          bg-transparent
          shadow-none
        `,

        glass: `
          glass-card
          border-[var(--glass-card-border)]
        `,
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        cardVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `
          flex
          min-w-0
          flex-col
          gap-1.5
        `,
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        `
          min-w-0

          type-h4
          font-semibold
          text-card-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
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

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        `
          flex
          min-w-0
          flex-1
          flex-col
        `,
        className,
      )}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        `
          flex
          min-w-0
          items-center
          gap-2
        `,
        className,
      )}
      {...props}
    />
  );
}

export { cardVariants };

export type { CardProps };
