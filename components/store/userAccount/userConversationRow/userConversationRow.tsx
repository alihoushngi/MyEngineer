import Link from "next/link";

import { ConversationAvatar } from "@/components/store/messaging/conversationAvatar/conversationAvatar";

import { userAccountPaths } from "@/config/user-account.config/user-account.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

import { type UserConversation } from "@/types/store/user-account.types";

type UserConversationRowProps = {
  conversation: UserConversation;
  active?: boolean;
};

export function UserConversationRow({
  conversation,
  active = false,
}: UserConversationRowProps) {
  return (
    <Link
      href={`${userAccountPaths.messages}/${conversation.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex min-h-16 items-start gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-primary-subtle hover:bg-primary-subtle",
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-3 inset-s-0 w-0.5 rounded-full bg-primary"
        />
      ) : null}

      <ConversationAvatar
        name={conversation.participantName}
        src={conversation.participantAvatarSrc}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out",
            active && "text-primary",
          )}
        >
          {conversation.participantName}
        </p>

        <p className="mt-1 truncate type-body-sm text-foreground-muted">
          {conversation.lastMessagePreview}
        </p>

        <p className="mt-1 truncate type-caption text-foreground-subtle">
          {[conversation.relatedServiceLabel, conversation.lastMessageAtLabel]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      {conversation.unreadCount > 0 ? (
        <span className="mt-1 inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 type-caption font-semibold text-primary-foreground">
          {formatFaNumber(conversation.unreadCount)}
          <span className="sr-only"> خوانده‌نشده</span>
        </span>
      ) : null}
    </Link>
  );
}
