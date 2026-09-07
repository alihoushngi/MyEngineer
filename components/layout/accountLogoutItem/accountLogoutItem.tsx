"use client";

import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdownMenu/dropdownMenu";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { useUserLogout } from "@/hooks/use-user-logout/use-user-logout";

export function AccountLogoutItem() {
  const { logout, error, isPending } = useUserLogout();

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
        {userAccountCopy.logoutLabel}
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
