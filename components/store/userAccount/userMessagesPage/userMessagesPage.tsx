import { InfoIcon, MessagesSquareIcon } from "lucide-react";

import { Pagination } from "@/components/common/pagination/pagination";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserConversationRow } from "@/components/store/userAccount/userConversationRow/userConversationRow";
import { Empty } from "@/components/ui/empty/empty";

import { messagingCopy } from "@/config/messaging.config/messaging.config";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import { type UserConversation } from "@/types/store/user-account.types";

type UserMessagesPageProps = {
  conversations: readonly UserConversation[];
  pagination: PaginatedItems<UserConversation>;
  pathname: string;
};

export function UserMessagesPage({
  conversations,
  pagination,
  pathname,
}: UserMessagesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.messages}
        description={userAccountCopy.messagesDescription}
      />

      <div className="flex items-start gap-2 rounded-xl bg-info/10 px-3 py-2.5">
        <InfoIcon
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-info"
        />
        <p className="type-caption leading-relaxed text-foreground-muted">
          {messagingCopy.noRealtimeNote}
        </p>
      </div>

      {pagination.total === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<MessagesSquareIcon aria-hidden="true" />}
            title={userAccountCopy.emptyMessages}
          />
        </div>
      ) : (
        <>
          <ul className="rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <UserConversationRow conversation={conversation} />
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
