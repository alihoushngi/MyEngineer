import Link from "next/link";

import { Button } from "@/components/ui/button/button";

import { joinNavigation } from "@/config/navigation.config/navigation.config";

import { cn } from "@/lib/utils/cn/cn";

type JoinLinkProps = {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function JoinLink({
  className,
  variant = "primary",
  size = "md",
}: JoinLinkProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(
        `
          rounded-xl
          transition-all
          duration-200

          active:scale-[0.98]
        `,
        className,
      )}
    >
      <Link href={joinNavigation.href}>{joinNavigation.label}</Link>
    </Button>
  );
}
