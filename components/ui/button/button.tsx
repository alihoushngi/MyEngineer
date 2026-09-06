import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner/spinner";
import { cn } from "@/lib/utils/cn/cn";

const buttonVariants = cva(
  `
    inline-flex
    shrink-0
    select-none
    items-center
    justify-center
    gap-2
    whitespace-nowrap

    rounded-xl
    border
    border-transparent

    type-button

    outline-none

    transition-[background-color,border-color,color,box-shadow,transform,opacity]
    duration-(--duration-fast)
    ease-[var(--ease-standard)]

    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2
    focus-visible:ring-offset-background

    active:scale-[0.98]

    disabled:pointer-events-none
    disabled:cursor-not-allowed
    disabled:opacity-50

    aria-disabled:pointer-events-none
    aria-disabled:cursor-not-allowed
    aria-disabled:opacity-50

    motion-reduce:transform-none

    [&_svg]:pointer-events-none
    [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-primary
          text-primary-foreground
          shadow-sm

          hover:bg-primary-hover
          hover:shadow-md

          active:bg-primary-active
          active:shadow-sm
        `,

        secondary: `
          bg-secondary
          text-secondary-foreground
          shadow-xs

          hover:bg-secondary-hover
          hover:shadow-sm

          active:bg-secondary-hover
          active:shadow-xs
        `,

        outline: `
          border-border-strong
          bg-surface
          text-foreground
          shadow-xs

          hover:border-primary/30
          hover:bg-primary-subtle
          hover:text-primary

          active:bg-primary-subtle
        `,

        ghost: `
          bg-transparent
          text-foreground

          hover:bg-surface-muted
          hover:text-foreground

          active:bg-muted
        `,

        danger: `
          bg-danger
          text-danger-foreground
          shadow-sm

          hover:bg-danger/90
          hover:shadow-md

          active:bg-danger/85
          active:shadow-sm
        `,

        link: `
          rounded-md
          border-transparent
          bg-transparent
          p-0
          text-primary
          shadow-none

          underline-offset-4

          hover:text-primary-hover
          hover:underline

          active:scale-100
        `,
      },

      size: {
        sm: `
          min-h-11
          px-4
        `,

        md: `
          min-h-12
          px-5
        `,

        lg: `
          min-h-13
          px-6
        `,

        icon: `
          size-11
          p-0
        `,

        "icon-sm": `
          size-10
          p-0
        `,

        "icon-lg": `
          size-12
          p-0
        `,
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    icon?: ReactNode;
  };

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  icon,
  disabled,
  children,
  type = "button",
  tabIndex,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const isDisabled = Boolean(disabled || loading);

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "" : undefined}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      tabIndex={tabIndex}
      {...props}
    >
      {loading ? <Spinner className="size-4" aria-hidden="true" /> : icon}

      {children}
    </button>
  );
}

export { buttonVariants };

export type { ButtonProps };
