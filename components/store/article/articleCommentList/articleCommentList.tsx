import { MessageSquareIcon } from "lucide-react";

import { type ArticleComment } from "@/types/store/article.types";

type ArticleCommentListProps = {
  comments: readonly ArticleComment[];
};

export function ArticleCommentList({ comments }: ArticleCommentListProps) {
  return (
    <ul className="grid gap-3">
      {comments.map((comment) => (
        <li key={comment.id}>
          <article className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs">
            <header className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                <MessageSquareIcon aria-hidden="true" className="size-4" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="type-body font-semibold text-foreground">
                    {comment.authorName}
                  </h3>

                  <p className="type-caption text-foreground-subtle">
                    {comment.createdAtLabel}
                  </p>
                </div>

                <p className="mt-3 type-body leading-loose text-foreground-muted">
                  {comment.body}
                </p>
              </div>
            </header>
          </article>
        </li>
      ))}
    </ul>
  );
}
