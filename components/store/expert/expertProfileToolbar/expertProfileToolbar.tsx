"use client";

import { MessageSquareIcon } from "lucide-react";
import { ExpertSaveButton } from "@/components/store/expert/expertSaveButton/expertSaveButton";
import { ExpertShareButton } from "@/components/store/expert/expertShareButton/expertShareButton";
import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";
import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { toExpertSharePath } from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type ExpertProfileToolbarProps = {
  expert: ExpertProfile;
  expertOption: RequestExpertOption;
  cities: readonly City[];
  isUserAuthenticated?: boolean;
  isSaved?: boolean;
};

export function ExpertProfileToolbar({
  expert,
  expertOption,
  cities,
  isUserAuthenticated = false,
  isSaved = false,
}: ExpertProfileToolbarProps) {
  const nextPath = toExpertSharePath(expert.id);

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-primary-deep-foreground/10 bg-primary-deep-foreground/5 p-2 backdrop-blur-md sm:flex-row sm:flex-wrap lg:w-64 lg:flex-col">
      <RequestCreateDialog
        experts={[expertOption]}
        cities={cities}
        isUserAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        lockedExpertId={expert.id}
        triggerClassName="w-full sm:w-auto lg:w-full"
      />

      <StartConversationButton
        expertId={expert.id}
        isUserAuthenticated={isUserAuthenticated}
        className="w-full sm:w-auto lg:w-full"
        icon={<MessageSquareIcon aria-hidden="true" />}
      />

      <ExpertSaveButton
        expertId={expert.id}
        isSaved={isSaved}
        isUserAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        className="w-full sm:w-auto lg:w-full"
      />

      <ExpertShareButton
        title={`${expert.name} | ${expert.profession}`}
        path={nextPath}
        className="w-full sm:w-auto lg:w-full"
      />
    </div>
  );
}
