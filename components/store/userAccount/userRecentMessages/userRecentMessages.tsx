import { ArrowLeftIcon, MessagesSquareIcon } from "lucide-react";
import Link from "next/link";

import { UserConversationRow } from "@/components/store/userAccount/userConversationRow/userConversationRow";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import { type UserConversation } from "@/types/store/user-account.types";

type UserRecentMessagesProps = {
  conversations: readonly UserConversation[];
};

export function UserRecentMessages({ conversations }: UserRecentMessagesProps) {
  const unread = conversations.filter((item) => item.unreadCount > 0);
  const items = (unread.length > 0 ? unread : conversations).slice(0, 3);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <MessagesSquareIcon aria-hidden="true" className="size-4" />
          </span>

          <h2 className="type-h4 text-foreground">
            {userAccountCopy.recentMessages}
          </h2>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href={userAccountPaths.messages}>
            {userAccountCopy.viewAll}
            <ArrowLeftIcon
              aria-hidden="true"
              className="size-3.5 ltr:rotate-180"
            />
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty title={userAccountCopy.emptyMessages} className="my-auto py-8" />
      ) : (
        <ul className="grid gap-1">
          {items.map((conversation) => (
            <li key={conversation.id}>
              <UserConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
