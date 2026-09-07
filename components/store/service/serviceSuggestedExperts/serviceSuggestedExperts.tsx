import { BadgeCheckIcon } from "lucide-react";

import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";

import { type ExpertCardData } from "@/types/store/expert.types";

type ServiceSuggestedExpertsProps = {
  experts: readonly ExpertCardData[];
};

export function ServiceSuggestedExperts({
  experts,
}: ServiceSuggestedExpertsProps) {
  if (experts.length === 0) {
    return null;
  }

  return (
    <aside className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-success/10 text-success">
          <BadgeCheckIcon aria-hidden="true" className="size-4" />
        </span>

        <h3 className="type-h3 text-foreground">
          {serviceFilterCopy.suggestedTitle}
        </h3>
      </div>

      <ul className="grid auto-rows-fr gap-4 md:grid-cols-3">
        {experts.map((expert) => (
          <li key={expert.id} className="min-w-0">
            <ExpertCard expert={expert} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
