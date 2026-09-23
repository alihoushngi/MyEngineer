import { EngineerSettingsPage } from "@/components/store/engineer/engineerSettingsPage/engineerSettingsPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";
import { listAuthSessionsAction } from "@/services/session-service/session-actions";

export const metadata = engineerPageMetadata(engineerPageTitles.settings);

export default async function EngineerSettingsRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const sessions = await listAuthSessionsAction();

  return <EngineerSettingsPage workspace={workspace} sessions={sessions} />;
}
