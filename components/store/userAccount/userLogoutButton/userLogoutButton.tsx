"use client";

import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";

import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { useUserLogout } from "@/hooks/use-user-logout/use-user-logout";

export function UserLogoutButton() {
  const { logout, error, isPending } = useUserLogout();

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        loading={isPending}
        disabled={isPending}
        icon={<LogOutIcon aria-hidden="true" />}
        onClick={() => {
          void logout();
        }}
      >
        {userAuthCopy.logoutLabel}
      </Button>

      {error ? (
        <p
          className="rounded-xl bg-danger/5 px-3 py-2 type-caption text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
