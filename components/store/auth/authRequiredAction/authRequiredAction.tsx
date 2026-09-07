"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button/button";

import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";

type AuthRequiredActionProps = {
  isAuthenticated: boolean;
  nextPath: string;
  label: string;
  variant?: "outline" | "ghost" | "primary";
  size?: "sm" | "md";
  icon?: ReactNode;
  className?: string;
  pressed?: boolean;
  loading?: boolean;
  onAuthenticatedClick: () => void;
};

export function AuthRequiredAction({
  isAuthenticated,
  nextPath,
  label,
  variant = "outline",
  size = "md",
  icon,
  className,
  pressed,
  loading = false,
  onAuthenticatedClick,
}: AuthRequiredActionProps) {
  const loginHref = userLoginHref(nextPath);

  if (!isAuthenticated) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link href={loginHref} className="gap-2">
          {icon}
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      loading={loading}
      icon={icon}
      aria-pressed={pressed}
      onClick={onAuthenticatedClick}
    >
      {label}
    </Button>
  );
}
