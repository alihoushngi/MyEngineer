import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
          field-sizing-content

          min-h-28
          w-full
          min-w-0

          resize-y

          rounded-xl
          border
          border-input

          bg-input-background

          px-3.5
          py-3

          type-body
          text-foreground

          shadow-xs

          outline-none

          transition-[background-color,border-color,box-shadow]
          duration-(--duration-fast)
          ease-(--ease-standard)

          placeholder:text-foreground-subtle

          hover:border-border-interactive

          focus-visible:border-ring
          focus-visible:bg-surface
          focus-visible:ring-2
          focus-visible:ring-ring/15

          aria-invalid:border-danger
          aria-invalid:ring-2
          aria-invalid:ring-danger/15

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:bg-surface-muted
          disabled:text-foreground-muted
          disabled:opacity-60

          read-only:bg-surface-subtle
          read-only:text-foreground-muted
        `,
        className,
      )}
      {...props}
    />
  );
}
