"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu/dropdownMenu";
import {
  isActivePath,
  isServicesPath,
  primaryNavigation,
  servicesNavigation,
} from "@/config/navigation.config/navigation.config";
import { cn } from "@/lib/utils/cn/cn";

function navLinkClassName(isActive: boolean) {
  return cn(
    "relative inline-flex min-h-10 items-center rounded-xl px-3 type-body-sm font-medium text-primary-deep-foreground/65 outline-none transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-primary after:transition-all after:duration-200 after:ease-in-out",
    isActive &&
      "bg-primary-deep-foreground/8 font-semibold text-primary-deep-foreground after:scale-x-100",
  );
}

export function HeaderNavigation() {
  const pathname = usePathname();
  const servicesActive = isServicesPath(pathname);
  const homeLink = primaryNavigation[0];
  const restLinks = primaryNavigation.slice(1);

  return (
    <nav aria-label="ناوبری اصلی" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {homeLink ? (
          <li>
            <Link
              href={homeLink.href}
              className={navLinkClassName(
                isActivePath(pathname, homeLink.href),
              )}
              aria-current={
                isActivePath(pathname, homeLink.href) ? "page" : undefined
              }
            >
              {homeLink.label}
            </Link>
          </li>
        ) : null}

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "group min-h-10 rounded-xl px-3 type-body-sm font-medium text-primary-deep-foreground/65 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep",
                  servicesActive &&
                    "bg-primary-deep-foreground/8 font-semibold text-primary-deep-foreground",
                )}
                aria-current={servicesActive ? "true" : undefined}
              >
                {servicesNavigation.label}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-4 transition-all duration-200 ease-in-out group-data-[state=open]:rotate-180 motion-reduce:transform-none"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-56">
              {servicesNavigation.items.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "transition-all duration-200 ease-in-out",
                        isActive &&
                          "bg-primary-subtle font-semibold text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        {restLinks.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={navLinkClassName(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
