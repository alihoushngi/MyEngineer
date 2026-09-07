import Link from "next/link";
import { ArrowLeftIcon, MessageSquareIcon } from "lucide-react";
import { EngineerConversationRow } from "@/components/store/engineer/engineerConversationRow/engineerConversationRow";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerConversation } from "@/types/store/engineer.types";

type EngineerRecentMessagesProps = {
  conversations: readonly EngineerConversation[];
};

export function EngineerRecentMessages({
  conversations,
}: EngineerRecentMessagesProps) {
  const unread = conversations.filter((item) => item.unreadCount > 0);
  const items = (unread.length > 0 ? unread : conversations).slice(0, 3);

  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <MessageSquareIcon aria-hidden="true" className="size-4.5" />
          </span>

          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.unreadMessages}
          </h2>
        </div>

        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.messages} className="gap-1.5">
            {engineerPanelCopy.viewAll}
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyMessages} className="py-8" />
      ) : (
        <ul className="grid gap-1">
          {items.map((conversation) => (
            <li key={conversation.id}>
              <EngineerConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
