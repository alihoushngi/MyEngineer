"use client";

import Link from "next/link";
import {
  BellIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { AccountLogoutItem } from "@/components/layout/accountLogoutItem/accountLogoutItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu/dropdownMenu";
import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type UserShellData } from "@/types/store/user-account.types";

type AccountTopbarProps = {
  shell: UserShellData;
};

export function AccountTopbar({ shell }: AccountTopbarProps) {
  const initials = getDisplayInitials(shell.displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-primary-deep-foreground/10 bg-primary-deep/95 pt-[env(safe-area-inset-top)] text-primary-deep-foreground shadow-sm backdrop-blur-xl">
      <div className="flex min-h-16 min-w-0 items-center gap-2 px-4 py-2 lg:px-6">
        <BrandLogo className="min-w-0 text-primary-deep-foreground focus-visible:ring-offset-primary-deep lg:hidden" />

        <div className="hidden min-w-0 flex-1 lg:block">
          <p className="type-caption text-primary-deep-foreground/45">
            پنل کاربری
          </p>
          <p className="truncate type-body-sm font-medium text-primary-deep-foreground/85">
            {userAccountCopy.workspaceName}
          </p>
        </div>

        <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden min-h-10 rounded-xl text-primary-deep-foreground/70 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep md:inline-flex"
          >
            <Link href={siteConfig.homeHref} className="gap-2">
              {userAccountCopy.storefrontLabel}
              <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-xl text-primary-deep-foreground/75 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep"
          >
            <Link
              href={userAccountPaths.notifications}
              aria-label={userAccountPageTitles.notifications}
            >
              <BellIcon aria-hidden="true" className="size-5" />

              {shell.unreadNotificationCount > 0 ? (
                <span className="absolute inset-e-2 top-2 size-2 rounded-full bg-accent ring-2 ring-primary-deep">
                  <span className="sr-only">
                    {formatFaNumber(shell.unreadNotificationCount)}{" "}
                    {userAccountCopy.unreadNotifications}
                  </span>
                </span>
              ) : null}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={userAccountCopy.accountMenuLabel}
              className="group flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-primary-deep-foreground/10 bg-primary-deep-foreground/5 px-1.5 pe-2 text-start outline-none transition-all duration-200 ease-in-out hover:border-primary-deep-foreground/15 hover:bg-primary-deep-foreground/8 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar size="sm" className="border-primary-deep-foreground/10">
                {shell.avatarSrc ? (
                  <AvatarImage src={shell.avatarSrc} alt="" />
                ) : null}

                <AvatarFallback className="bg-primary/15 text-primary type-caption">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <span className="hidden max-w-36 truncate type-caption font-medium text-primary-deep-foreground sm:inline">
                {shell.displayName}
              </span>

              <ChevronDownIcon
                aria-hidden="true"
                className="hidden size-4 text-primary-deep-foreground/45 transition-all duration-200 ease-in-out group-data-[state=open]:rotate-180 sm:block motion-reduce:transform-none"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.dashboard}>
                  <UserRoundIcon aria-hidden="true" />
                  {userAccountCopy.dashboardLabel}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.profile}>
                  <UserRoundIcon aria-hidden="true" />
                  {userAccountPageTitles.profile}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={userAccountPaths.settings}>
                  <SettingsIcon aria-hidden="true" />
                  {userAccountCopy.settingsLabel}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AccountLogoutItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
