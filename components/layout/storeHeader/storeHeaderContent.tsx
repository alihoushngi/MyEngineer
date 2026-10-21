"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPlusIcon } from "lucide-react";
import { HeaderMenuButton } from "@/components/layout/storeHeader/headerMenuButton/headerMenuButton";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { isPageEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { joinNavigation } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type StoreHeaderContentProps = {
  authChrome: StoreAuthChrome;
  selectedCityLabel?: string;
};

function HeaderJoinAction() {
  if (!isPageEnabled("expertRegistration")) {
    return null;
  }

  return (
    <Link
      href={joinNavigation.href}
      className="ms-auto inline-flex min-h-11 shrink-0 items-center gap-1.5 px-1 text-client-white outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-client-focus focus-visible:ring-offset-2 focus-visible:ring-offset-client-secondary sm:gap-2 sm:px-2"
    >
      <UserPlusIcon aria-hidden="true" className="size-4 shrink-0" />
      <span className="grid text-client-12 leading-client-utility">
        <span>عضویت</span>
        <span>متخصصان</span>
      </span>
    </Link>
  );
}

function isWorkspacePath(pathname: string) {
  return (
    pathname === "/account" ||
    pathname.startsWith("/account/") ||
    pathname === engineerPanelPaths.dashboard ||
    (pathname.startsWith("/engineer/") &&
      pathname !== engineerPanelPaths.login &&
      !pathname.startsWith(`${engineerPanelPaths.login}/`))
  );
}

function isAuthPath(pathname: string) {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/expert-registration") ||
    pathname === engineerPanelPaths.login ||
    pathname.startsWith(`${engineerPanelPaths.login}/`)
  );
}

export function StoreHeaderContent({
  authChrome,
  selectedCityLabel,
}: StoreHeaderContentProps) {
  const pathname = usePathname();
  const workspace = isWorkspacePath(pathname);
  const authPage = isAuthPath(pathname);
  const registrationPage = pathname.startsWith(joinNavigation.href);

  return (
    <header className="relative z-40 bg-client-secondary pt-[env(safe-area-inset-top)] text-client-white">
      <div className="flex min-h-14 w-full items-center gap-4 px-3 py-2">
        {!workspace ? (
          <HeaderMenuButton
            authChrome={authChrome}
            showUtilityTools={!authPage}
            selectedCityLabel={selectedCityLabel}
          />
        ) : null}

        <Link
          href={siteConfig.homeHref}
          className="min-w-0 max-w-36 truncate whitespace-nowrap rounded-sm text-client-16 text-client-white outline-none focus-visible:ring-2 focus-visible:ring-client-focus focus-visible:ring-offset-2 focus-visible:ring-offset-client-secondary sm:max-w-none"
        >
          {siteConfig.name}
        </Link>

        {!workspace && !registrationPage ? <HeaderJoinAction /> : null}
      </div>
    </header>
  );
}
