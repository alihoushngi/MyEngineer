"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { EngineerNavIcon } from "@/components/layout/engineerNavIcon/engineerNavIcon";

import {
  isEngineerNavActive,
  type EngineerNavItem,
} from "@/config/engineer-panel.config/engineer-panel.config";

import { cn } from "@/lib/utils/cn/cn";

type EngineerNavLinkProps = {
  item: EngineerNavItem;
  onNavigate?: () => void;
};

export function EngineerNavLink({ item, onNavigate }: EngineerNavLinkProps) {
  const pathname = usePathname();
  const isActive = isEngineerNavActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative flex min-h-12 items-center gap-3 rounded-xl px-3 type-body-sm font-medium outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        isActive
          ? "bg-primary-subtle text-primary shadow-xs hover:bg-primary-subtle"
          : "text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground-muted transition-all duration-200 ease-in-out group-hover:bg-primary-subtle group-hover:text-primary",
          isActive && "bg-primary/10 text-primary",
        )}
      >
        <EngineerNavIcon name={item.icon} />
      </span>

      <span className="min-w-0 truncate">{item.label}</span>

      {isActive ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-3 inset-s-0 w-0.5 rounded-full bg-primary"
        />
      ) : null}
    </Link>
  );
}
