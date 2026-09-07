"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AuthFooter } from "@/components/layout/authFooter/authFooter";
import { AuthHeader } from "@/components/layout/authHeader/authHeader";
import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { cn } from "@/lib/utils/cn/cn";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  const pathname = usePathname();
  const isRegistrationRoute = pathname.startsWith("/expert-registration");

  return (
    <div
      className={cn(
        "relative isolate flex min-h-dvh flex-col overflow-hidden bg-background-subtle",
        isRegistrationRoute && "h-dvh min-h-0",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-24 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -inset-e-48 -z-10 size-128 rounded-full bg-secondary/5 blur-[150px]"
      />

      <SkipLink />
      <AuthHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "flex flex-1 justify-center outline-none",
          isRegistrationRoute
            ? "min-h-0 items-stretch py-2 sm:py-3 lg:py-4"
            : "items-start py-section",
        )}
      >
        <div
          className={cn(
            "container-app w-full",
            isRegistrationRoute && "flex min-h-0 items-center justify-center",
          )}
        >
          {children}
        </div>
      </main>

      <AuthFooter compact={isRegistrationRoute} />
    </div>
  );
}
