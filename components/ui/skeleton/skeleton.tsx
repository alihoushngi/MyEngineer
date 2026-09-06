import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        `
          relative
          overflow-hidden

          rounded-lg

          bg-surface-muted

          animate-pulse

          after:pointer-events-none
          after:absolute
          after:inset-0
          after:bg-linear-to-r
          after:from-transparent
          after:via-foreground/3
          after:to-transparent

          motion-reduce:animate-none
        `,
        className,
      )}
      {...props}
    />
  );
}
