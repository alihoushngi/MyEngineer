import { type ReactNode } from "react";

import { SkipLink } from "@/components/layout/skipLink/skipLink";
import { StoreFooter } from "@/components/layout/storeFooter/storeFooter";
import { StoreHeader } from "@/components/layout/storeHeader/storeHeader";

type StoreShellProps = {
  children: ReactNode;
};

export function StoreShell({ children }: StoreShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SkipLink />
      <StoreHeader />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>

      <StoreFooter />
    </div>
  );
}
