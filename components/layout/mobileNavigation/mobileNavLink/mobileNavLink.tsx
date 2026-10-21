"use client";

import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet/sheet";
import { cn } from "@/lib/utils/cn/cn";

type MobileNavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  nested?: boolean;
};

export function MobileNavLink({
  href,
  label,
  isActive,
  nested = false,
}: MobileNavLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-h-[3.75rem] items-center border-b border-client-border px-[10px] py-[18px] text-start text-client-14 font-semibold text-client-secondary outline-none transition-colors hover:bg-client-surface-secondary focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-client-focus",
          nested && "min-h-0 bg-[#f0f0f0] px-5 py-3 text-client-12",
          isActive &&
            "font-bold text-client-primary hover:text-client-primary",
        )}
      >
        <span>{label}</span>
      </Link>
    </SheetClose>
  );
}
