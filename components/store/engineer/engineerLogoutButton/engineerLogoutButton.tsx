"use client";

import { LogOutIcon } from "lucide-react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerActionError";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useEngineerLogout } from "@/hooks/use-engineer-logout/use-engineer-logout";

export function EngineerLogoutButton() {
  const { logout, error, isPending } = useEngineerLogout();

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        loading={isPending}
        icon={<LogOutIcon aria-hidden="true" />}
        className="border-danger/20 text-danger transition-all duration-200 ease-in-out hover:border-danger/30 hover:bg-danger/10 hover:text-danger"
        onClick={() => {
          void logout();
        }}
      >
        {engineerPanelCopy.logoutLabel}
      </Button>

      <EngineerActionError message={error} onRetry={() => void logout()} />
    </div>
  );
}
