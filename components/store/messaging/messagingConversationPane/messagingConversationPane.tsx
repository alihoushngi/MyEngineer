import { MessageSquareTextIcon } from "lucide-react";
import { type ReactNode } from "react";

import { MessagingComposer } from "@/components/store/messaging/messagingComposer/messagingComposer";
import { MessagingMarkRead } from "@/components/store/messaging/messagingMarkRead/messagingMarkRead";
import { MessagingThread } from "@/components/store/messaging/messagingThread/messagingThread";

import { messagingCopy } from "@/config/messaging.config/messaging.config";

import { type ParticipantRole } from "@/types/store/messaging.types";

type ThreadMessage = {
  id: string;
  body: string;
  sentAtLabel: string;
  senderRole: ParticipantRole;
};

type MessagingConversationPaneProps = {
  conversationId: string;
  title: string;
  meta?: string;
  relatedLink?: ReactNode;
  messages: readonly ThreadMessage[];
  viewerRole: ParticipantRole;
};

export function MessagingConversationPane({
  conversationId,
  title,
  meta,
  relatedLink,
  messages,
  viewerRole,
}: MessagingConversationPaneProps) {
  return (
    <section className="-mx-4 flex min-h-[min(72dvh,44rem)] flex-1 flex-col overflow-hidden border-y border-border-subtle bg-surface shadow-xs sm:mx-0 sm:rounded-3xl sm:border lg:min-h-0">
      <header className="shrink-0 border-b border-border-subtle bg-surface-elevated px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <MessageSquareTextIcon aria-hidden="true" className="size-5" />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="truncate type-h4 text-foreground">{title}</h2>

            {meta ? (
              <p className="mt-1 truncate type-caption text-foreground-muted">
                {meta}
              </p>
            ) : null}
          </div>

          {relatedLink ? <div className="shrink-0">{relatedLink}</div> : null}
        </div>

        <p className="mt-3 rounded-xl bg-surface-subtle px-3 py-2 type-caption leading-relaxed text-foreground-subtle">
          {messagingCopy.noRealtimeNote}
        </p>
      </header>

      <MessagingMarkRead conversationId={conversationId} />
      <MessagingThread messages={messages} viewerRole={viewerRole} />
      <MessagingComposer conversationId={conversationId} />
    </section>
  );
}
