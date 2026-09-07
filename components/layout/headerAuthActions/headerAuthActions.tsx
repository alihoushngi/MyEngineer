import Link from "next/link";
import { BellIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  engineerLoginNavigation,
  engineerPanelNavigation,
} from "@/config/navigation.config/navigation.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import {
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";
import { cn } from "@/lib/utils/cn/cn";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type HeaderAuthActionsProps = {
  chrome: StoreAuthChrome;
  className?: string;
};

export function HeaderAuthActions({
  chrome,
  className,
}: HeaderAuthActionsProps) {
  if (chrome.status === "user") {
    return (
      <div className={cn("hidden items-center gap-1.5 lg:flex", className)}>
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
            <BellIcon aria-hidden="true" />
            {chrome.unreadNotificationCount > 0 ? (
              <span className="absolute inset-e-2 top-2 size-2 rounded-full bg-accent ring-2 ring-primary-deep">
                <span className="sr-only">
                  {userAccountPageTitles.notifications}
                </span>
              </span>
            ) : null}
          </Link>
        </Button>

        <Button
          asChild
          variant="secondary"
          className="min-h-10 rounded-xl px-2.5 pe-4 shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transform-none"
        >
          <Link href={userAuthPaths.account} className="gap-2">
            <Avatar size="sm" className="size-7 border-primary/15">
              <AvatarFallback className="bg-primary text-primary-foreground type-caption">
                {getDisplayInitials(chrome.displayName)}
              </AvatarFallback>
            </Avatar>
            {userAuthCopy.accountCta}
          </Link>
        </Button>
      </div>
    );
  }

  if (chrome.status === "engineer") {
    return (
      <Button
        asChild
        variant="secondary"
        className={cn(
          "hidden min-h-10 rounded-xl shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-sm lg:inline-flex motion-reduce:transform-none",
          className,
        )}
      >
        <Link href={engineerPanelNavigation.href}>
          {engineerPanelNavigation.label}
        </Link>
      </Button>
    );
  }

  return (
    <div className={cn("hidden items-center gap-1.5 lg:flex", className)}>
      <Button
        asChild
        variant="ghost"
        className="min-h-10 rounded-xl px-4 text-primary-deep-foreground/70 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep"
      >
        <Link href={engineerLoginNavigation.href}>
          {engineerLoginNavigation.label}
        </Link>
      </Button>

      <Button
        asChild
        variant="secondary"
        className="min-h-10 rounded-xl shadow-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transform-none"
      >
        <Link href={userAuthPaths.login}>{userAuthCopy.loginCta}</Link>
      </Button>
    </div>
  );
}
