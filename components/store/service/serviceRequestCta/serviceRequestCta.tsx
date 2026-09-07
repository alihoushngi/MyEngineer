import { PlusIcon } from "lucide-react";

import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";

import { type ServiceSlug } from "@/config/services.config/services.config";

import { toRequestExpertOptions } from "@/lib/marketplace/to-request-expert-option/to-request-expert-option";

import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";

type ServiceRequestCtaProps = {
  slug: ServiceSlug;
  experts: readonly ExpertCardData[];
  cities: readonly City[];
  isUserAuthenticated: boolean;
};

export function ServiceRequestCta({
  slug,
  experts,
  cities,
  isUserAuthenticated,
}: ServiceRequestCtaProps) {
  if (experts.length === 0) {
    return null;
  }

  return (
    <RequestCreateDialog
      experts={toRequestExpertOptions(experts, cities)}
      cities={cities}
      isUserAuthenticated={isUserAuthenticated}
      nextPath={`/services/${slug}`}
      lockedServiceSlug={slug}
      triggerVariant="outline"
      triggerIcon={<PlusIcon aria-hidden="true" />}
    />
  );
}
