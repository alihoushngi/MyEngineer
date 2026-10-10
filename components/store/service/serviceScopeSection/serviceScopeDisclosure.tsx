"use client";

import { type ReactNode, useId, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn/cn";

/** A single content tree: collapsible on mobile, always visible on desktop. */
export function ServiceScopeDisclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const contentId = useId();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <h2 className="lg:hidden">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((current) => !current)}
          className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary-subtle px-4 py-3 text-start type-body-sm font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="min-w-0">{title}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-primary transition-transform motion-reduce:transition-none",
              expanded && "rotate-180",
            )}
          />
        </button>
      </h2>
      <div
        id={contentId}
        className={cn("pt-5 lg:pt-0", !expanded && "hidden lg:block")}
      >
        {children}
      </div>
    </>
  );
}
