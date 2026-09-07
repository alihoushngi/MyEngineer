"use client";

import Link from "next/link";

import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { ExpertSaveButton } from "@/components/store/expert/expertSaveButton/expertSaveButton";
import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { Button } from "@/components/ui/button/button";

import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";

import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedExpertCardProps = {
  expert: ExpertCardData;
  conversationId?: string;
};

export function UserSavedExpertCard({
  expert,
  conversationId,
}: UserSavedExpertCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
      <div className="min-h-0 flex-1">
        <ExpertCard expert={expert} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <ExpertSaveButton
          expertId={expert.id}
          isSaved
          isUserAuthenticated
          nextPath={userAccountPaths.saved}
          savedLabel={marketplaceCopy.removeSavedLabel}
          unsavedLabel={marketplaceCopy.removeSavedLabel}
          className="w-full"
        />

        {conversationId ? (
          <Button asChild variant="outline" className="w-full">
            <Link href={`${userAccountPaths.messages}/${conversationId}`}>
              {marketplaceCopy.messageEngineerLabel}
            </Link>
          </Button>
        ) : (
          <StartConversationButton
            expertId={expert.id}
            isUserAuthenticated
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}
