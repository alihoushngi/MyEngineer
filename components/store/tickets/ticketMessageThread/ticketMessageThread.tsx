"use client";

import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { formatFaDate } from "@/lib/tickets/ticket-labels/ticket-labels";
import { type TicketMessage } from "@/lib/tickets/parse-ticket-room/parse-ticket-room";

type TicketMessageThreadProps = {
  messages: readonly TicketMessage[];
  currentUserId?: number;
};

export function TicketMessageThread({
  messages,
  currentUserId,
}: TicketMessageThreadProps) {
  if (messages.length === 0) {
    return (
      <p className="type-body-sm text-foreground-muted">
        هنوز پیامی در این تیکت نیست.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((item) => {
        const own =
          currentUserId !== undefined && item.sender_id === currentUserId;
        const fileHref = resolveMediaUrl(item.file);

        return (
          <li
            key={item.id}
            className={
              own
                ? "ms-auto max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-primary-foreground"
                : "me-auto max-w-[85%] rounded-2xl bg-surface-subtle px-4 py-3 text-foreground"
            }
          >
            {item.message ? (
              <p className="type-body-sm whitespace-pre-wrap">{item.message}</p>
            ) : null}
            {fileHref ? (
              <a
                href={fileHref}
                target="_blank"
                rel="noreferrer"
                className={
                  own
                    ? "mt-2 inline-flex min-h-11 items-center underline"
                    : "mt-2 inline-flex min-h-11 items-center text-primary underline"
                }
              >
                مشاهده پیوست
              </a>
            ) : null}
            {item.created_at ? (
              <p
                className={
                  own
                    ? "mt-2 type-caption text-primary-foreground/70"
                    : "mt-2 type-caption text-foreground-muted"
                }
              >
                {formatFaDate(item.created_at)}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
