import Link from "next/link";

import { MessagingConversationPane } from "@/components/store/messaging/messagingConversationPane/messagingConversationPane";
import { MessagingSplitLayout } from "@/components/store/messaging/messagingSplitLayout/messagingSplitLayout";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserConversationRow } from "@/components/store/userAccount/userConversationRow/userConversationRow";
import { Button } from "@/components/ui/button/button";

import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import {
  type UserConversation,
  type UserMessage,
} from "@/types/store/user-account.types";

type UserConversationPageProps = {
  conversation: UserConversation;
  messages: readonly UserMessage[];
  conversations: readonly UserConversation[];
};

export function UserConversationPage({
  conversation,
  messages,
  conversations,
}: UserConversationPageProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <AccountPageHeader
        title={conversation.participantName}
        description={userAccountCopy.conversationDescription}
      />

      <MessagingSplitLayout
        sidebar={conversations.map((item) => (
          <li key={item.id}>
            <UserConversationRow
              conversation={item}
              active={item.id === conversation.id}
            />
          </li>
        ))}
      >
        <MessagingConversationPane
          conversationId={conversation.id}
          title={conversation.participantName}
          meta={[
            conversation.relatedServiceLabel,
            conversation.lastMessageAtLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
          relatedLink={
            conversation.relatedRequestId ? (
              <Button asChild variant="outline" size="sm">
                <Link
                  href={`${userAccountPaths.requests}/${conversation.relatedRequestId}`}
                >
                  {userAccountPageTitles.requestDetail}
                </Link>
              </Button>
            ) : null
          }
          messages={messages}
          viewerRole="user"
        />
      </MessagingSplitLayout>
    </div>
  );
}
