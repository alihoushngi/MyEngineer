import { EngineerMessagesPage } from "@/components/store/engineer/engineerMessagesPage/engineerMessagesPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.messages);
export const dynamic = "force-dynamic";

type EngineerMessagesRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function EngineerMessagesRoute({
  searchParams,
}: EngineerMessagesRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.conversations,
    parsePageParam((await searchParams).page),
  );

  return (
    <EngineerMessagesPage
      conversations={pagination.items}
      pagination={pagination}
      pathname={engineerPanelPaths.messages}
    />
  );
}
