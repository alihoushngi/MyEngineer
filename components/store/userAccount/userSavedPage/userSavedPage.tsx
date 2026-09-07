import { BookmarkIcon } from "lucide-react";
import Link from "next/link";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserSavedList } from "@/components/store/userAccount/userSavedList/userSavedList";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type ExpertCardData } from "@/types/store/expert.types";
import { type UserConversation } from "@/types/store/user-account.types";

type UserSavedPageProps = {
  experts: readonly ExpertCardData[];
  conversations: readonly UserConversation[];
};

export function UserSavedPage({ experts, conversations }: UserSavedPageProps) {
  const conversationIdByExpertId = Object.fromEntries(
    conversations.flatMap((conversation) =>
      conversation.expertId
        ? [[conversation.expertId, conversation.id] as const]
        : [],
    ),
  );

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.saved}
        description={userAccountCopy.savedDescription}
      />

      {experts.length === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<BookmarkIcon aria-hidden="true" />}
            title={userAccountCopy.emptySaved}
            description={userAccountCopy.emptySavedHint}
            action={
              <Button asChild>
                <Link href={siteConfig.homeHref}>
                  {userAccountCopy.findExpert}
                </Link>
              </Button>
            }
          />
        </div>
      ) : (
        <UserSavedList
          experts={experts}
          conversationIdByExpertId={conversationIdByExpertId}
        />
      )}
    </div>
  );
}
