"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";

import { Input } from "@/components/ui/input/input";

import { authUiCopy } from "@/config/auth-ui.config/auth-ui.config";

import { cn } from "@/lib/utils/cn/cn";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
  autoComplete?: "current-password" | "new-password";
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { className, autoComplete = "current-password", ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          className={cn("pe-12", className)}
        />

        <button
          type="button"
          className="absolute inset-y-1 inset-e-1 flex aspect-square items-center justify-center rounded-lg text-foreground-muted outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={
            visible ? authUiCopy.hidePassword : authUiCopy.showPassword
          }
          aria-pressed={visible}
          onClick={() => {
            setVisible((current) => !current);
          }}
        >
          {visible ? (
            <EyeOffIcon aria-hidden="true" className="size-4" />
          ) : (
            <EyeIcon aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    );
  },
);
