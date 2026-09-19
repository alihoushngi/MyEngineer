import { notFound } from "next/navigation";
import { UserConversationPage } from "@/components/store/userAccount/userConversationPage/userConversationPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import {
  getUserConversation,
  getUserMessages,
  getUserWorkspace,
} from "@/services/user-account-service/user-account-service";

type AccountConversationRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = userAccountMetadata(userAccountPageTitles.conversation);
export const dynamic = "force-dynamic";

export default async function AccountConversationRoute({
  params,
}: AccountConversationRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const conversation = await getUserConversation(id);

  if (!conversation) {
    notFound();
  }

  const messages = await getUserMessages(id);

  return (
    <UserConversationPage
      conversation={conversation}
      messages={messages}
      conversations={workspace.conversations}
    />
  );
}
