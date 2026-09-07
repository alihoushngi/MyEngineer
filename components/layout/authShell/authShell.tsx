import { type ReactNode } from "react";
import { AuthFooter } from "@/components/layout/authFooter/authFooter";
import { AuthHeader } from "@/components/layout/authHeader/authHeader";
import { SkipLink } from "@/components/layout/skipLink/skipLink";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-background-subtle">
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
        className="flex flex-1 items-start justify-center py-section outline-none"
      >
        <div className="container-app w-full">{children}</div>
      </main>

      <AuthFooter />
    </div>
  );
}
