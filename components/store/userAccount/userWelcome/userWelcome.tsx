import { MapPinIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";

import { userAccountCopy } from "@/config/user-account.config/user-account.config";

import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";

import { type UserWorkspace } from "@/types/store/user-account.types";

type UserWelcomeProps = {
  workspace: UserWorkspace;
};

export function UserWelcome({ workspace }: UserWelcomeProps) {
  const { account } = workspace;
  const initials = getDisplayInitials(account.displayName);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-primary-deep p-5 text-primary-deep-foreground shadow-lg sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-24 -top-24 -z-10 size-64 rounded-full bg-primary/20 blur-[100px]"
      />

      <div className="flex items-center gap-4">
        <Avatar className="size-16 shrink-0 rounded-2xl border border-primary-deep-foreground/10">
          {account.avatarSrc ? (
            <AvatarImage src={account.avatarSrc} alt="" />
          ) : null}
          <AvatarFallback className="rounded-2xl bg-primary-deep-foreground/10 type-h4 text-primary-deep-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="type-caption text-primary-deep-foreground/60">
            {userAccountCopy.welcomeGreeting}
          </p>
          <h2 className="mt-1 truncate type-h2 text-primary-deep-foreground">
            {account.displayName}
          </h2>

          {account.city ? (
            <p className="mt-2 flex items-center gap-1.5 type-body-sm text-primary-deep-foreground/70">
              <MapPinIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              {account.city}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
