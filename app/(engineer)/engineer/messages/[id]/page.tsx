import { notFound } from "next/navigation";
import { EngineerConversationPage } from "@/components/store/engineer/engineerConversationPage/engineerConversationPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import {
  getEngineerConversation,
  getEngineerMessages,
  getEngineerWorkspace,
} from "@/services/engineer-service/engineer-access-service";

type EngineerConversationRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = engineerPageMetadata(engineerPageTitles.conversation);
export const dynamic = "force-dynamic";

export default async function EngineerConversationRoute({
  params,
}: EngineerConversationRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const conversation = await getEngineerConversation(id);

  if (!conversation) {
    notFound();
  }

  const messages = await getEngineerMessages(id);

  return (
    <EngineerConversationPage
      conversation={conversation}
      messages={messages}
      conversations={workspace.conversations}
    />
  );
}
