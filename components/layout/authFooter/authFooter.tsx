import Link from "next/link";
import { legalNavigation } from "@/config/navigation.config/navigation.config";

export function AuthFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface/80 backdrop-blur-md">
      <nav
        aria-label="پیوندهای قانونی"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-page py-4"
      >
        {legalNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-10 items-center rounded-lg type-body-sm text-foreground-muted outline-none transition-all duration-200 ease-in-out hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
