import { UserMessagesPage } from "@/components/store/userAccount/userMessagesPage/userMessagesPage";
import {
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.messages);
export const dynamic = "force-dynamic";

type AccountMessagesRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function AccountMessagesRoute({
  searchParams,
}: AccountMessagesRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.conversations,
    parsePageParam((await searchParams).page),
  );

  return (
    <UserMessagesPage
      conversations={pagination.items}
      pagination={pagination}
      pathname={userAccountPaths.messages}
    />
  );
}
