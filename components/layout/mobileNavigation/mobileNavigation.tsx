"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogInIcon, UserRoundIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { MobileNavLink } from "@/components/layout/mobileNavigation/mobileNavLink/mobileNavLink";
import { type MobileNavigationProps } from "@/components/layout/mobileNavigation/type/mobileNavigation.types";
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
import {
  engineerLoginNavigation,
  engineerPanelNavigation,
  isActivePath,
  isServicesPath,
  mobileUtilityNavigation,
  primaryNavigation,
  servicesNavigation,
} from "@/config/navigation.config/navigation.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";

export function MobileNavigation({
  open,
  onOpenChange,
  authChrome,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const homeLink = primaryNavigation[0];
  const restLinks = primaryNavigation.slice(1);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-navigation"
        side="start"
        className="w-full gap-0 overflow-hidden p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border-subtle bg-surface-elevated px-5 py-4 pe-16">
          <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
          <SheetDescription className="sr-only">
            پیوندهای فروشگاه مهندس من
          </SheetDescription>
          <BrandLogo />
        </SheetHeader>

        <nav
          aria-label="ناوبری موبایل"
          className="flex flex-1 flex-col overflow-y-auto px-4 py-4"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
              onOpenChange(false);
            }
          }}
        >
          <p className="mb-2 px-3 type-caption font-semibold text-foreground-subtle">
            منوی اصلی
          </p>

          <ul className="flex flex-col gap-1">
            {homeLink ? (
              <li>
                <MobileNavLink
                  href={homeLink.href}
                  label={homeLink.label}
                  isActive={isActivePath(pathname, homeLink.href)}
                />
              </li>
            ) : null}

            <li>
              <Accordion
                key={pathname}
                type="single"
                collapsible
                defaultValue={isServicesPath(pathname) ? "services" : undefined}
              >
                <AccordionItem
                  value="services"
                  className="overflow-hidden rounded-2xl border-0 bg-transparent shadow-none"
                >
                  <AccordionTrigger className="min-h-12 rounded-2xl border-0 bg-transparent px-3 type-body text-foreground shadow-none transition-all duration-200 ease-in-out hover:bg-surface-muted data-[state=open]:bg-primary-subtle data-[state=open]:text-primary">
                    {servicesNavigation.label}
                  </AccordionTrigger>

                  <AccordionContent className="border-0 pb-1 pt-1">
                    <ul className="flex flex-col gap-1 ps-3">
                      {servicesNavigation.items.map((item) => (
                        <li key={item.href}>
                          <MobileNavLink
                            href={item.href}
                            label={item.label}
                            isActive={isActivePath(pathname, item.href)}
                          />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>

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

          <Separator className="my-4" />

          <p className="mb-2 px-3 type-caption font-semibold text-foreground-subtle">
            دسترسی سریع
          </p>

          <ul className="flex flex-col gap-1">
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
        </nav>

        <div className="border-t border-border-subtle bg-surface-elevated/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
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
      <Button asChild className="w-full">
        <Link href={userAuthPaths.login} className="gap-2">
          <LogInIcon aria-hidden="true" />
          {userAuthCopy.loginCta}
        </Link>
      </Button>

      <Button asChild variant="ghost" className="w-full">
        <Link href={engineerLoginNavigation.href}>
          {engineerLoginNavigation.label}
        </Link>
      </Button>

      <JoinLink variant="outline" className="w-full" />
    </div>
  );
}
