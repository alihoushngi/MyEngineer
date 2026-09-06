import { type ComponentProps } from "react";

import { Label } from "@/components/ui/label/label";

import { cn } from "@/lib/utils/cn/cn";

type FieldProps = ComponentProps<"div"> & {
  disabled?: boolean;
  invalid?: boolean;
};

export function Field({ className, disabled, invalid, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={cn(
        `
          group/field
          flex
          w-full
          min-w-0
          flex-col
          gap-2

          data-[disabled=true]:pointer-events-none
          data-[disabled=true]:opacity-55
        `,
        className,
      )}
      {...props}
    />
  );
}

type FieldLabelProps = ComponentProps<typeof Label> & {
  required?: boolean;
};

export function FieldLabel({
  className,
  required,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        `
          inline-flex
          w-fit
          items-center
          gap-1

          type-label
          font-medium
          text-foreground

          transition-colors
          duration-(--duration-fast)

          group-data-[disabled=true]/field:text-foreground-muted
          group-data-[invalid=true]/field:text-danger
        `,
        className,
      )}
      {...props}
    >
      {children}

      {required ? (
        <>
          <span
            aria-hidden="true"
            className="
              text-danger
              select-none
            "
          >
            *
          </span>

          <span className="sr-only"> الزامی</span>
        </>
      ) : null}
    </Label>
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        `
          type-body-sm
          leading-relaxed
          text-foreground-muted

          transition-colors
          duration-(--duration-fast)

          group-data-[disabled=true]/field:text-foreground-subtle
        `,
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      role={children ? "alert" : undefined}
      data-slot="field-error"
      className={cn(
        `
          min-h-5

          type-caption
          leading-relaxed
          text-danger
        `,
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function FieldHint({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-hint"
      className={cn(
        `
          type-caption
          leading-relaxed
          text-foreground-muted

          transition-colors
          duration-(--duration-fast)

          group-data-[disabled=true]/field:text-foreground-subtle
        `,
        className,
      )}
      {...props}
    />
  );
}
