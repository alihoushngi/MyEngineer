import { type ReactNode } from "react";

type MessagingSplitLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function MessagingSplitLayout({
  sidebar,
  children,
}: MessagingSplitLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-stretch">
      <aside className="hidden min-h-0 overflow-y-auto rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs lg:block">
        <ul className="grid gap-1">{sidebar}</ul>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
