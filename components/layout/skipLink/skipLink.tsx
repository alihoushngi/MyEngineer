import { cn } from "@/lib/utils/cn/cn";

type SkipLinkProps = {
  targetId?: string;
  className?: string;
};

export function SkipLink({
  targetId = "main-content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60",
        "focus:rounded-md focus:bg-primary focus:px-4 focus:py-2",
        "focus:type-body-sm focus:font-medium focus:text-primary-foreground focus:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      پرش به محتوای اصلی
    </a>
  );
}
