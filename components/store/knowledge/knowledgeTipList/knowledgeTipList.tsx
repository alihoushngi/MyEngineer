import { BookOpenIcon, LightbulbIcon } from "lucide-react";

import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";

import { type KnowledgeTip } from "@/types/store/knowledge.types";

type KnowledgeTipListProps = {
  tips: readonly KnowledgeTip[];
};

export function KnowledgeTipList({ tips }: KnowledgeTipListProps) {
  if (tips.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="knowledge-tips-heading">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary-subtle text-primary">
          <BookOpenIcon aria-hidden="true" className="size-5" />
        </span>

        <h2 id="knowledge-tips-heading" className="type-h3 text-foreground">
          {knowledgeCopy.tipsHeading}
        </h2>
      </div>

      <ul className="grid gap-3">
        {tips.map((tip, index) => (
          <li key={tip.id} className="min-w-0">
            <article className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm sm:p-6">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-e-12 -top-12 size-28 rounded-full bg-primary/0 blur-3xl transition-all duration-200 ease-in-out group-hover:bg-primary/8"
              />

              <div className="relative flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground">
                  <LightbulbIcon aria-hidden="true" className="size-4.5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="wrap-break-word type-h4 font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                      {tip.title}
                    </h3>

                    <span className="shrink-0 type-caption font-semibold tabular-nums text-foreground-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {tip.body ? (
                    <p className="mt-3 type-body leading-loose text-foreground-muted">
                      {tip.body}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
