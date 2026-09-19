import Link from "next/link";
import {
  BriefcaseBusinessIcon,
  ExternalLinkIcon,
  FileTextIcon,
  MapPinIcon,
  UserRoundPenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  isEngineerFeatureEnabled,
  isPageEnabled,
} from "@/config/feature-flags.config/feature-flags.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerQuickActionsProps = {
  workspace: EngineerWorkspace;
};

export function EngineerQuickActions({ workspace }: EngineerQuickActionsProps) {
  const publicHref = workspace.account.publicExpertId
    ? `/experts/${workspace.account.publicExpertId}`
    : undefined;

  return (
    <section aria-label="دسترسی سریع" className="flex flex-wrap gap-2">
      {isEngineerFeatureEnabled("profile") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={engineerPanelPaths.profile} className="gap-2">
            <UserRoundPenIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.quickEditProfile}
          </Link>
        </Button>
      ) : null}

      {isEngineerFeatureEnabled("portfolio") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={engineerPanelPaths.portfolio} className="gap-2">
            <BriefcaseBusinessIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.quickAddPortfolio}
          </Link>
        </Button>
      ) : null}

      {isEngineerFeatureEnabled("serviceAreas") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={engineerPanelPaths.serviceAreas} className="gap-2">
            <MapPinIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.quickServiceAreas}
          </Link>
        </Button>
      ) : null}

      {isEngineerFeatureEnabled("requests") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={engineerPanelPaths.requests} className="gap-2">
            <FileTextIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.quickRequests}
          </Link>
        </Button>
      ) : null}

      {publicHref && isPageEnabled("experts") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={publicHref} className="gap-2">
            <ExternalLinkIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.publicProfileLabel}
          </Link>
        </Button>
      ) : null}
    </section>
  );
}
