import Link from "next/link";
import { CheckIcon, ChevronLeftIcon, CircleIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress/progress";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type ProfileCompletion } from "@/types/store/engineer.types";

type EngineerProfileCompletionProps = {
  completion: ProfileCompletion;
};

export function EngineerProfileCompletion({
  completion,
}: EngineerProfileCompletionProps) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.completionTitle}
          </h2>
          <p className="mt-1 type-caption text-foreground-muted">
            {engineerPanelCopy.completionHint}
          </p>
        </div>

        <p className="type-h2 tabular-nums text-primary">
          {formatFaNumber(completion.percent)}٪
        </p>
      </div>

      <Progress
        value={completion.percent}
        aria-label={engineerPanelCopy.completionTitle}
      />

      <ul className="mt-5 grid gap-1">
        {completion.items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "group flex min-h-11 items-center gap-3 rounded-xl px-2.5 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
                item.complete && "text-foreground-muted",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg",
                  item.complete
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning",
                )}
              >
                {item.complete ? (
                  <CheckIcon aria-hidden="true" className="size-4" />
                ) : (
                  <CircleIcon aria-hidden="true" className="size-3" />
                )}
              </span>

              <span className="min-w-0 flex-1 truncate type-body-sm">
                {item.label}
              </span>

              <span className="type-caption text-foreground-subtle">
                {item.complete ? "انجام شده" : "ناتمام"}
              </span>

              <ChevronLeftIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-0.5 group-hover:text-primary motion-reduce:transform-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
