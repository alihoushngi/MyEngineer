"use client";

import { OTPInput, type SlotProps } from "input-otp";
import { useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

import {
  LOCAL_DIGIT_PATTERN,
  toLatinDigits,
} from "@/lib/utils/to-latin-digits/to-latin-digits";

type OtpInputProps = Omit<
  ComponentProps<typeof OTPInput>,
  "maxLength" | "children" | "render" | "textAlign"
> & {
  length: number;
  invalid?: boolean;
};

function OtpSlot({
  char,
  isActive,
  hasFakeCaret,
  invalid,
}: SlotProps & {
  invalid: boolean;
}) {
  return (
    <div
      data-slot="otp-input-slot"
      data-active={isActive || undefined}
      data-filled={Boolean(char) || undefined}
      data-invalid={invalid || undefined}
      className="
        relative
        flex
        h-14
        min-w-0
        flex-1
        items-center
        justify-center

        overflow-hidden

        rounded-xl
        border
        border-input

        bg-input-background

        type-h3
        font-semibold
        tabular-nums
        text-foreground

        shadow-xs

        transition-[background-color,border-color,box-shadow,transform]
        duration-(--duration-fast)
        ease-(--ease-standard)

        data-[filled=true]:border-border-interactive
        data-[filled=true]:bg-surface

        data-[active=true]:z-10
        data-[active=true]:border-ring
        data-[active=true]:bg-surface
        data-[active=true]:ring-2
        data-[active=true]:ring-ring/15
        data-[active=true]:shadow-sm

        data-[invalid=true]:border-danger

        data-[invalid=true]:data-[active=true]:border-danger
        data-[invalid=true]:data-[active=true]:ring-danger/15

        sm:h-16
        sm:rounded-2xl
      "
    >
      {char}

      {hasFakeCaret ? (
        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-s-1/2
            top-1/2

            h-6
            w-px

            -translate-x-1/2
            -translate-y-1/2

            animate-pulse

            rounded-full
            bg-primary

            motion-reduce:animate-none
          "
        />
      ) : null}
    </div>
  );
}

export function OtpInput({
  length,
  invalid = false,
  className,
  containerClassName,
  disabled,
  value,
  defaultValue,
  onChange,
  pasteTransformer,
  ...props
}: OtpInputProps) {
  const isControlled = value !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    toLatinDigits(String(defaultValue ?? "")),
  );

  const currentValue = isControlled
    ? toLatinDigits(String(value ?? ""))
    : uncontrolledValue;

  function handleChange(nextValue: string) {
    const latinValue = toLatinDigits(nextValue);

    if (!isControlled) {
      setUncontrolledValue(latinValue);
    }

    onChange?.(latinValue);
  }

  return (
    <OTPInput
      data-slot="otp-input"
      maxLength={length}
      textAlign="left"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern={LOCAL_DIGIT_PATTERN}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      pushPasswordManagerStrategy="none"
      value={currentValue}
      dir="ltr"
      containerClassName={cn(
        `
          w-full
          max-w-sm

          transition-opacity
          duration-(--duration-fast)

          has-disabled:cursor-not-allowed
          has-disabled:opacity-55
        `,
        containerClassName,
      )}
      className={cn(
        `
          disabled:cursor-not-allowed
        `,
        className,
      )}
      {...props}
      onChange={handleChange}
      pasteTransformer={(pastedValue) =>
        toLatinDigits(
          pasteTransformer ? pasteTransformer(pastedValue) : pastedValue,
        )
      }
      render={({ slots }) => (
        <div
          dir="ltr"
          data-slot="otp-input-group"
          className="
            flex
            w-full
            flex-row
            justify-center
            gap-2

            sm:gap-3
          "
        >
          {slots.map((slot, index) => (
            <OtpSlot key={index} {...slot} invalid={invalid} />
          ))}
        </div>
      )}
    />
  );
}

export type { OtpInputProps };
