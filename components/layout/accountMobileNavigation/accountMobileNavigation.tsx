"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { AccountNavIcon } from "@/components/layout/accountNavIcon/accountNavIcon";
import { AccountNavLink } from "@/components/layout/accountNavLink/accountNavLink";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer/drawer";
import {
  isUserAccountNavActive,
  userAccountCopy,
  userAccountPrimaryNav,
  userAccountSecondaryNav,
} from "@/config/user-account.config/user-account.config";
import { cn } from "@/lib/utils/cn/cn";

export function AccountMobileNavigation() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const moreActive = userAccountSecondaryNav.some((item) =>
    isUserAccountNavActive(pathname, item.href),
  );

  return (
    <nav
      aria-label="ناوبری اصلی حساب کاربری"
      className="fixed inset-x-2 bottom-2 z-30 overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-5 p-1.5">
        {userAccountPrimaryNav.map((item) => {
          const isActive = isUserAccountNavActive(pathname, item.href);

          return (
            <li key={item.id} className="min-w-0">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 type-caption outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary-subtle font-semibold text-primary"
                    : "text-foreground-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg transition-all duration-200 ease-in-out group-hover:text-primary",
                    isActive && "bg-primary/10 text-primary",
                  )}
                >
                  <AccountNavIcon name={item.icon} />
                </span>
                <span className="max-w-full truncate">{item.label}</span>
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}

        <li className="min-w-0">
          <button
            type="button"
            aria-expanded={moreOpen}
            aria-controls="account-more-menu"
            onClick={() => setMoreOpen(true)}
            className={cn(
              "group relative flex min-h-14 w-full min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 type-caption outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
              moreActive
                ? "bg-primary-subtle font-semibold text-primary"
                : "text-foreground-muted",
            )}
          >
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-lg transition-all duration-200 ease-in-out group-hover:text-primary",
                moreActive && "bg-primary/10 text-primary",
              )}
            >
              <MenuIcon aria-hidden="true" className="size-4" />
            </span>
            <span className="max-w-full truncate">
              {userAccountCopy.moreLabel}
            </span>
            {moreActive ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary"
              />
            ) : null}
          </button>
        </li>
      </ul>

      <Drawer open={moreOpen} onOpenChange={setMoreOpen} handleOnly>
        <DrawerContent id="account-more-menu">
          <DrawerHeader>
            <DrawerTitle>{userAccountCopy.moreTitle}</DrawerTitle>
            <DrawerDescription className="sr-only">
              بخش‌های دیگر حساب کاربری
            </DrawerDescription>
          </DrawerHeader>

          <nav className="overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <ul className="flex flex-col gap-1.5">
              {userAccountSecondaryNav.map((item) => (
                <li key={item.id}>
                  <AccountNavLink
                    item={item}
                    onNavigate={() => setMoreOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
