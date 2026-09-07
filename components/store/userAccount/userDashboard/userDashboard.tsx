import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserNotificationSummary } from "@/components/store/userAccount/userNotificationSummary/userNotificationSummary";
import { UserQuickActions } from "@/components/store/userAccount/userQuickActions/userQuickActions";
import { UserRecentMessages } from "@/components/store/userAccount/userRecentMessages/userRecentMessages";
import { UserRecentRequests } from "@/components/store/userAccount/userRecentRequests/userRecentRequests";
import { UserSavedPreview } from "@/components/store/userAccount/userSavedPreview/userSavedPreview";
import { UserWelcome } from "@/components/store/userAccount/userWelcome/userWelcome";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { activeRequests } from "@/lib/user-account/workspace-selectors/workspace-selectors";

import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";
import { type UserWorkspace } from "@/types/store/user-account.types";

type UserDashboardProps = {
  workspace: UserWorkspace;
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
};

export function UserDashboard({
  workspace,
  experts,
  cities,
}: UserDashboardProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.dashboard}
        description={userAccountCopy.dashboardDescription}
      />

      <UserWelcome workspace={workspace} />

      <UserQuickActions
        experts={experts}
        cities={cities}
        defaultCityId={workspace.account.cityId}
      />

      <div className="grid auto-rows-fr gap-5 lg:grid-cols-2">
        <UserRecentRequests requests={activeRequests(workspace.requests)} />
        <UserRecentMessages conversations={workspace.conversations} />
        <UserSavedPreview experts={workspace.savedExperts} />
        <UserNotificationSummary notifications={workspace.notifications} />
      </div>
    </div>
  );
}
