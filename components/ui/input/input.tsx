"use client";

import { type ChangeEvent, type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";
import { toLatinDigits } from "@/lib/utils/to-latin-digits/to-latin-digits";

type InputProps = ComponentProps<"input">;

function latinValue(
  value: InputProps["value"] | InputProps["defaultValue"],
): InputProps["value"] {
  if (typeof value === "string") {
    return toLatinDigits(value);
  }

  return value;
}

export function Input({
  className,
  type,
  onChange,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const isPhone = type === "tel";
  const isControlled = value !== undefined;

  const resolvedValue = isPhone ? latinValue(value) : value;

  const resolvedDefaultValue = isPhone
    ? latinValue(defaultValue)
    : defaultValue;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (isPhone) {
      event.currentTarget.value = toLatinDigits(event.currentTarget.value);
    }

    onChange?.(event);
  }

  return (
    <input
      {...props}
      type={type}
      data-slot="input"
      dir={isPhone ? "ltr" : props.dir}
      inputMode={isPhone ? "tel" : props.inputMode}
      value={isControlled ? resolvedValue : undefined}
      defaultValue={isControlled ? undefined : resolvedDefaultValue}
      className={cn(
        `
          h-12
          w-full
          min-w-0

          rounded-xl
          border
          border-input

          bg-input-background

          px-3.5

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

          file:me-3
          file:inline-flex
          file:h-8
          file:items-center

          file:border-0
          file:bg-transparent

          file:px-0

          file:type-body-sm
          file:font-medium
          file:text-foreground
        `,
        isPhone && "ltr-data",
        className,
      )}
      onChange={handleChange}
    />
  );
}
