"use client";

import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdownMenu/dropdownMenu";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useEngineerLogout } from "@/hooks/use-engineer-logout/use-engineer-logout";

export function EngineerLogoutItem() {
  const { logout, error, isPending } = useEngineerLogout();

  return (
    <div className="px-1">
      <DropdownMenuItem
        variant="danger"
        disabled={isPending}
        className="gap-2.5 transition-all duration-200 ease-in-out"
        onSelect={(event) => {
          event.preventDefault();
          void logout();
        }}
      >
        <LogOutIcon aria-hidden="true" className="size-4" />
        {engineerPanelCopy.logoutLabel}
      </DropdownMenuItem>

      {error ? (
        <p
          className="mt-1 rounded-lg bg-danger/10 px-2.5 py-2 type-caption leading-relaxed text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerActionError";
