"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet/sheet";
import { cn } from "@/lib/utils/cn/cn";

type MobileNavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export function MobileNavLink({ href, label, isActive }: MobileNavLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group flex min-h-12 items-center justify-between gap-3 rounded-2xl px-3 type-body text-foreground outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
          isActive &&
            "bg-primary-subtle font-semibold text-primary hover:bg-primary-subtle",
        )}
      >
        <span>{label}</span>
        <ArrowLeftIcon
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none",
            isActive && "text-primary",
          )}
        />
      </Link>
    </SheetClose>
  );
}
