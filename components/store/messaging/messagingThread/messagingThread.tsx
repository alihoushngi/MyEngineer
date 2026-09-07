"use client";

import { MessageSquareIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button/button";

import {
  messagingCopy,
  MESSAGING_VISIBLE_PAGE,
} from "@/config/messaging.config/messaging.config";

import { cn } from "@/lib/utils/cn/cn";

import { type ParticipantRole } from "@/types/store/messaging.types";

type ThreadMessage = {
  id: string;
  body: string;
  sentAtLabel: string;
  senderRole: ParticipantRole;
};

type MessagingThreadProps = {
  messages: readonly ThreadMessage[];
  viewerRole: ParticipantRole;
};

export function MessagingThread({
  messages,
  viewerRole,
}: MessagingThreadProps) {
  const [visible, setVisible] = useState(MESSAGING_VISIBLE_PAGE);

  const hidden = Math.max(0, messages.length - visible);
  const shown = messages.slice(hidden);

  if (messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center p-6">
        <div className="flex max-w-sm flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-subtle text-primary">
            <MessageSquareIcon aria-hidden="true" className="size-5" />
          </span>

          <p className="mt-4 type-body text-foreground-muted">
            {messagingCopy.emptyThread}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background-subtle/50">
      {hidden > 0 ? (
        <div className="shrink-0 border-b border-border-subtle bg-surface/80 p-3 backdrop-blur-sm">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setVisible((count) => count + MESSAGING_VISIBLE_PAGE);
            }}
          >
            {messagingCopy.loadOlder}
          </Button>
        </div>
      ) : null}

      <ol className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-5 sm:px-5">
        {shown.map((message) => {
          const own = message.senderRole === viewerRole;

          return (
            <li
              key={message.id}
              className={cn(
                "max-w-[88%] sm:max-w-[75%]",
                own ? "self-start" : "self-end",
              )}
            >
              <article
                className={cn(
                  "rounded-2xl px-3.5 py-2.5 shadow-xs sm:px-4",
                  own
                    ? "bg-primary text-primary-foreground"
                    : "border border-border-subtle bg-surface text-foreground",
                )}
              >
                <p className="sr-only">
                  {own ? messagingCopy.ownMessage : messagingCopy.peerMessage}
                </p>

                <p className="whitespace-pre-wrap wrap-break-word type-body leading-relaxed">
                  {message.body}
                </p>

                <p
                  className={cn(
                    "mt-1.5 type-caption",
                    own
                      ? "text-primary-foreground/70"
                      : "text-foreground-subtle",
                  )}
                >
                  {message.sentAtLabel}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
