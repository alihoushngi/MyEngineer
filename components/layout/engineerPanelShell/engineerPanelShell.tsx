import { type ReactNode } from "react";

import { EngineerMobileNavigation } from "@/components/layout/engineerMobileNavigation/engineerMobileNavigation";
import { EngineerSidebar } from "@/components/layout/engineerSidebar/engineerSidebar";
import { EngineerStatusBanner } from "@/components/layout/engineerStatusBanner/engineerStatusBanner";
import { EngineerTopbar } from "@/components/layout/engineerTopbar/engineerTopbar";
import { PanelWorkspaceFrame } from "@/components/layout/panelWorkspaceFrame/panelWorkspaceFrame";
import { SkipLink } from "@/components/layout/skipLink/skipLink";

import { type EngineerShellData } from "@/types/store/engineer.types";

type EngineerPanelShellProps = {
  shell: EngineerShellData;
  children: ReactNode;
};

export function EngineerPanelShell({
  shell,
  children,
}: EngineerPanelShellProps) {
  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden bg-background-subtle">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -inset-s-56 top-20 -z-10 size-128 rounded-full bg-primary/4 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -inset-e-56 bottom-10 -z-10 size-128 rounded-full bg-secondary/4 blur-[150px]"
      />

      <SkipLink />

      <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:grid-rows-[minmax(100dvh,auto)] lg:items-stretch">
        <EngineerSidebar />

        <div className="flex min-h-0 min-w-0 flex-col lg:min-h-full">
          <EngineerTopbar shell={shell} />

          <PanelWorkspaceFrame
            panel="engineer"
            maxWidthClass="max-w-6xl"
            banner={<EngineerStatusBanner shell={shell} />}
            navigation={<EngineerMobileNavigation />}
          >
            {children}
          </PanelWorkspaceFrame>
        </div>
      </div>
    </div>
  );
}
