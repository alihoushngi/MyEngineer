import { MessageSquareIcon } from "lucide-react";
import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerConversationRow } from "@/components/store/engineer/engineerConversationRow/engineerConversationRow";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type EngineerConversation } from "@/types/store/engineer.types";

type EngineerMessagesPageProps = {
  conversations: readonly EngineerConversation[];
  pagination: PaginatedItems<EngineerConversation>;
  pathname: string;
};

export function EngineerMessagesPage({
  conversations,
  pagination,
  pathname,
}: EngineerMessagesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.messages}
        description="گفت‌وگوهای مرتبط با درخواست‌ها. ارسال لحظه‌ای و پیوست در این نسخه وجود ندارد."
      />

      {pagination.total === 0 ? (
        <Empty
          icon={<MessageSquareIcon aria-hidden="true" />}
          title={engineerPanelCopy.emptyMessages}
        />
      ) : (
        <>
          <ul className="grid gap-1 rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs sm:p-3">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <EngineerConversationRow conversation={conversation} />
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
