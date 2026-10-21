import { type ReactNode } from "react";

import { StoreFooter } from "@/components/layout/storeFooter/storeFooter";

type StoreShellProps = {
  children: ReactNode;
};

export function StoreShell({ children }: StoreShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>

      <StoreFooter />
    </div>
  );
}
