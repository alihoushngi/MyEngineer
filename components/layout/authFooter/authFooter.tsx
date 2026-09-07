import Link from "next/link";
import { legalNavigation } from "@/config/navigation.config/navigation.config";
import { cn } from "@/lib/utils/cn/cn";

type AuthFooterProps = {
  compact?: boolean;
};

export function AuthFooter({ compact = false }: AuthFooterProps) {
  return (
    <footer className="shrink-0 border-t border-border-subtle bg-surface/80 backdrop-blur-md">
      <nav
        aria-label="پیوندهای قانونی"
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-page",
          compact ? "py-1" : "py-4",
        )}
      >
        {legalNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center rounded-lg type-body-sm text-foreground-muted outline-none transition-all duration-200 ease-in-out hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
              compact ? "min-h-9" : "min-h-10",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
