import { UserProfilePage } from "@/components/store/userAccount/userProfilePage/userProfilePage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getCurrentProfile, profileToUserAccount } from "@/services/profile-service/profile-service";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.profile);

export default async function AccountProfileRoute() {
  const [workspace, profile] = await Promise.all([
    getUserWorkspace(),
    getCurrentProfile().catch(() => null),
  ]);

  if (!workspace) {
    return null;
  }

  const account = profile
    ? profileToUserAccount(profile)
    : workspace.account;

  return <UserProfilePage account={account} profile={profile} />;
}
