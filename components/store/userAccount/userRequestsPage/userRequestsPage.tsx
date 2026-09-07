import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserRequestList } from "@/components/store/userAccount/userRequestList/userRequestList";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { type UserRequest } from "@/types/store/user-account.types";

type UserRequestsPageProps = {
  requests: readonly UserRequest[];
};

export function UserRequestsPage({ requests }: UserRequestsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.requests}
        description={userAccountCopy.requestsDescription}
      />
      <UserRequestList requests={requests} />
    </div>
  );
}
