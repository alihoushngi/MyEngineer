import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserProfileEditForm } from "@/components/store/userAccount/userProfileEditForm/userProfileEditForm";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { InfoIcon } from "lucide-react";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { type ProfileRecord } from "@/services/profile-service/profile-service";
import { type UserAccount } from "@/types/store/user-account.types";

type UserProfilePageProps = {
  account: UserAccount;
  profile: ProfileRecord | null;
};

export function UserProfilePage({ account, profile }: UserProfilePageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.profile}
        description={userAccountCopy.profileDescription}
      />

      {profile ? (
        <UserProfileEditForm profile={profile} />
      ) : (
        <Alert variant="info" className="rounded-2xl">
          <InfoIcon aria-hidden="true" />
          <AlertTitle>{account.displayName}</AlertTitle>
          <AlertDescription>
            {userAccountCopy.profileEditUnavailable}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
