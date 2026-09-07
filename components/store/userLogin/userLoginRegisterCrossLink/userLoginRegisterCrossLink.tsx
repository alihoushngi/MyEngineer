import { ArrowLeftIcon, HardHatIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

import { storePaths } from "@/config/navigation.config/navigation.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { userRegisterHref } from "@/lib/auth/safe-user-next/safe-user-next";

type UserLoginRegisterCrossLinkProps = {
  nextPath?: string;
};

export function UserLoginRegisterCrossLink({
  nextPath,
}: UserLoginRegisterCrossLinkProps) {
  return (
    <div className="grid gap-2">
      <Link
        href={userRegisterHref(nextPath)}
        className="group flex min-h-12 items-center gap-3 rounded-xl border border-border-subtle bg-surface-subtle px-3.5 outline-none transition-all duration-200 ease-in-out hover:border-primary/20 hover:bg-primary-subtle focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <UserPlusIcon aria-hidden="true" className="size-4" />
        </span>

        <span className="min-w-0 flex-1 text-start">
          <span className="block type-caption text-foreground-muted">
            {userAuthCopy.registerPrefix}
          </span>
          <span className="mt-0.5 block type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
            {userAuthCopy.registerAction}
          </span>
        </span>

        <ArrowLeftIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none ltr:rotate-180"
        />
      </Link>

      <Link
        href={storePaths.engineerLogin}
        className="group flex min-h-12 items-center gap-3 rounded-xl px-3.5 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
          <HardHatIcon aria-hidden="true" className="size-4" />
        </span>

        <span className="min-w-0 flex-1 text-start">
          <span className="block type-caption text-foreground-muted">
            {userAuthCopy.engineerEntryPrefix}
          </span>
          <span className="mt-0.5 block type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
            {userAuthCopy.engineerLoginAction}
          </span>
        </span>

        <ArrowLeftIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none ltr:rotate-180"
        />
      </Link>
    </div>
  );
}
