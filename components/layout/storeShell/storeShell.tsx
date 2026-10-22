import { type ReactNode } from "react";

type StoreShellProps = {
  children: ReactNode;
};

export function StoreShell({ children }: StoreShellProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background text-foreground">
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
    </div>
  );
}
