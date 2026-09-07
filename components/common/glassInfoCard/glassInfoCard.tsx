import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type GlassInfoCardProps = ComponentProps<"div">;

export function GlassInfoCard({ className, ...props }: GlassInfoCardProps) {
  return (
    <div
      data-slot="glass-info-card"
      className={cn(
        `
          relative
          flex
          h-full
          flex-col
          overflow-hidden

          rounded-3xl
          border
          border-border-subtle

          glass-card

          p-5

          text-foreground

          shadow-xs

          transition-all
          duration-200
          ease-in-out

          before:pointer-events-none
          before:absolute
          before:inset-x-8
          before:top-0
          before:h-px
          before:bg-linear-to-r
          before:from-transparent
          before:via-primary/20
          before:to-transparent

          hover:border-primary/15
          hover:shadow-md

          sm:p-6
        `,
        className,
      )}
      {...props}
    />
  );
}
