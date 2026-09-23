import { UserSettingsPage } from "@/components/store/userAccount/userSettingsPage/userSettingsPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";
import { listAuthSessionsAction } from "@/services/session-service/session-actions";

export const metadata = userAccountMetadata(userAccountPageTitles.settings);

export default async function AccountSettingsRoute() {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const sessions = await listAuthSessionsAction();

  return (
    <UserSettingsPage account={workspace.account} sessions={sessions} />
  );
}
