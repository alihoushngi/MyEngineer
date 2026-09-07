import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { ConversationAvatar } from "@/components/store/messaging/conversationAvatar/conversationAvatar";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type EngineerConversation } from "@/types/store/engineer.types";

type EngineerConversationRowProps = {
  conversation: EngineerConversation;
  active?: boolean;
};

export function EngineerConversationRow({
  conversation,
  active = false,
}: EngineerConversationRowProps) {
  return (
    <Link
      href={`${engineerPanelPaths.messages}/${conversation.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex min-h-20 items-start gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
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
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "truncate type-body font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary",
              active && "text-primary",
            )}
          >
            {conversation.participantName}
          </p>

          {conversation.unreadCount > 0 ? (
            <span className="inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 type-caption font-semibold text-primary-foreground">
              {formatFaNumber(conversation.unreadCount)}
              <span className="sr-only"> خوانده‌نشده</span>
            </span>
          ) : (
            <ChevronLeftIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-0.5 group-hover:text-primary motion-reduce:transform-none"
            />
          )}
        </div>

        <p className="mt-1 truncate type-body-sm text-foreground-muted">
          {conversation.lastMessagePreview}
        </p>

        <p className="mt-1.5 truncate type-caption text-foreground-subtle">
          {[conversation.relatedServiceLabel, conversation.lastMessageAtLabel]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </Link>
  );
}
