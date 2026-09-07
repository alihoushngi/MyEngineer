"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

import {
  isAccountConversationThreadPath,
  isEngineerConversationThreadPath,
} from "@/lib/messaging/conversation-paths/conversation-paths";
import { cn } from "@/lib/utils/cn/cn";

type PanelWorkspaceFrameProps = {
  panel: "account" | "engineer";
  maxWidthClass: string;
  banner?: ReactNode;
  navigation: ReactNode;
  children: ReactNode;
};

export function PanelWorkspaceFrame({
  panel,
  maxWidthClass,
  banner,
  navigation,
  children,
}: PanelWorkspaceFrameProps) {
  const pathname = usePathname();

  const isThread =
    panel === "account"
      ? isAccountConversationThreadPath(pathname)
      : isEngineerConversationThreadPath(pathname);

  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "relative flex-1 px-4 outline-none sm:px-6 lg:px-8 lg:pb-8",
          isThread
            ? "flex min-h-0 flex-col py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            : "py-6 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:py-8",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-6",
            maxWidthClass,
            isThread && "min-h-0 flex-1 gap-4",
          )}
        >
          {banner}
          {children}
        </div>
      </main>

      {isThread ? null : navigation}
    </>
  );
}
