"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogInIcon, UserRoundIcon } from "lucide-react";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { MobileNavLink } from "@/components/layout/mobileNavigation/mobileNavLink/mobileNavLink";
import { type MobileNavigationProps } from "@/components/layout/mobileNavigation/type/mobileNavigation.types";
import { HeaderCityButton } from "@/components/layout/storeHeader/headerCityButton/headerCityButton";
import { HeaderSearchButton } from "@/components/layout/storeHeader/headerSearchButton/headerSearchButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { Button } from "@/components/ui/button/button";
import { Separator } from "@/components/ui/separator/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import { isPageEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { siteConfig } from "@/config/site.config/site.config";
import {
  buildServicesNavigation,
  engineerLoginNavigation,
  engineerPanelNavigation,
  isActivePath,
  isServicesPath,
  mobileUtilityNavigation,
  primaryNavigation,
} from "@/config/navigation.config/navigation.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import { listPublicServiceCategoriesAction } from "@/services/lookup-service/lookup-actions";
import { useQuery } from "@tanstack/react-query";

export function MobileNavigation({
  open,
  onOpenChange,
  authChrome,
  showUtilityTools = true,
  selectedCityLabel,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const showServicesMenu = isPageEnabled("services");
  const homeLink = primaryNavigation.find((item) => item.href === "/");
  const restLinks = primaryNavigation.filter((item) => item.href !== "/");
  const categoriesQuery = useQuery({
    queryKey: ["lookup", "service-categories"],
    queryFn: listPublicServiceCategoriesAction,
    enabled: open,
  });
  const servicesNavigation = buildServicesNavigation(
    categoriesQuery.data ?? [],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-navigation"
        side="start"
        className="!inset-y-0 !inset-s-0 !h-dvh !w-[70%] !max-w-none !rounded-none !border-0 bg-client-surface-soft p-0 sm:!inset-y-0 sm:!inset-s-0 sm:!h-dvh min-[600px]:!w-1/2 min-[900px]:!w-[35%]"
      >
        <SheetHeader className="border-b border-client-border bg-client-surface-soft px-4 py-3 pe-16">
          <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
          <SheetDescription className="sr-only">
            پیوندهای فروشگاه مهندس من
          </SheetDescription>
          <Link
            href={siteConfig.homeHref}
            className="min-h-11 rounded-sm text-start text-client-16 font-semibold text-client-secondary outline-none focus-visible:ring-2 focus-visible:ring-client-focus focus-visible:ring-offset-2 focus-visible:ring-offset-client-surface-soft"
          >
            {siteConfig.name}
          </Link>
        </SheetHeader>

        <nav
          aria-label="ناوبری موبایل"
          className="flex flex-1 flex-col overflow-y-auto px-0 py-0"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
              onOpenChange(false);
            }
          }}
        >
          <ul className="flex flex-col gap-0">
            {homeLink ? (
              <li>
                <MobileNavLink
                  href={homeLink.href}
                  label={homeLink.label}
                  isActive={isActivePath(pathname, homeLink.href)}
                />
              </li>
            ) : null}

            {showServicesMenu ? (
              <li>
                <Accordion
                  key={pathname}
                  type="single"
                  collapsible
                  defaultValue={
                    isServicesPath(pathname) ? "services" : undefined
                  }
                >
                  <AccordionItem
                    value="services"
                    className="overflow-hidden rounded-none border-0 border-b border-client-border bg-transparent shadow-none"
                  >
                    <AccordionTrigger className="min-h-[3.75rem] rounded-none border-0 bg-transparent px-[10px] py-[18px] text-client-14 font-semibold text-client-secondary shadow-none transition-colors hover:bg-client-surface-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-client-focus data-[state=open]:bg-transparent data-[state=open]:text-client-secondary">
                      {servicesNavigation.label}
                    </AccordionTrigger>

                    <AccordionContent className="border-0 pb-0 pt-0">
                      <ul className="flex flex-col gap-0 ps-0">
                        {servicesNavigation.items.map((item) => (
                          <li key={item.href}>
                            <MobileNavLink
                              href={item.href}
                              label={item.label}
                              isActive={isActivePath(pathname, item.href)}
                              nested
                            />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            ) : null}

            {restLinks.map((item) => (
              <li key={item.href}>
                <MobileNavLink
                  href={item.href}
                  label={item.label}
                  isActive={isActivePath(pathname, item.href)}
                />
              </li>
            ))}
          </ul>

          {mobileUtilityNavigation.length > 0 ? (
            <>
              <Separator className="my-1 bg-client-border" />

              <ul className="flex flex-col gap-0">
                {mobileUtilityNavigation.map((item) => (
                  <li key={item.href}>
                    <MobileNavLink
                      href={item.href}
                      label={item.label}
                      isActive={isActivePath(pathname, item.href)}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </nav>

        <div className="border-t border-client-border bg-client-surface-soft p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {showUtilityTools ? (
            <div className="mb-3 flex items-center justify-center gap-2 border-b border-client-border pb-3">
              <HeaderSearchButton
                surface
                onDialogClose={() => onOpenChange(false)}
              />
              <HeaderCityButton
                selectedCityLabel={selectedCityLabel}
                surface
                onSelectionComplete={() => onOpenChange(false)}
              />
            </div>
          ) : null}
          <MobileAuthActions chrome={authChrome} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileAuthActions({
  chrome,
}: {
  chrome: MobileNavigationProps["authChrome"];
}) {
  if (chrome.status === "user") {
    if (!isPageEnabled("userAccount")) {
      return null;
    }

    return (
      <Button asChild className="w-full">
        <Link href={userAuthPaths.account} className="gap-2">
          <UserRoundIcon aria-hidden="true" />
          {userAuthCopy.accountCta}
        </Link>
      </Button>
    );
  }

  if (chrome.status === "engineer") {
    if (!isPageEnabled("engineerPanel")) {
      return null;
    }

    return (
      <Button asChild className="w-full">
        <Link href={engineerPanelNavigation.href}>
          {engineerPanelNavigation.label}
        </Link>
      </Button>
    );
  }

  return (
    <div className="grid gap-2">
      {isPageEnabled("userLogin") ? (
        <Button asChild className="w-full">
          <Link href={userAuthPaths.login} className="gap-2">
            <LogInIcon aria-hidden="true" />
            {userAuthCopy.loginCta}
          </Link>
        </Button>
      ) : null}

      {isPageEnabled("engineerLogin") ? (
        <Button asChild variant="ghost" className="w-full">
          <Link href={engineerLoginNavigation.href}>
            {engineerLoginNavigation.label}
          </Link>
        </Button>
      ) : null}

      <JoinLink variant="outline" className="w-full" />
    </div>
  );
}
