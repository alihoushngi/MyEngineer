import Link from "next/link";
import {
  CalendarDaysIcon,
  InfoIcon,
  MapPinIcon,
  MessageSquareIcon,
  UserRoundIcon,
  WrenchIcon,
} from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { requestStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";

type EngineerRequestDetailPageProps = {
  request: EngineerRequest;
};

export function EngineerRequestDetailPage({
  request,
}: EngineerRequestDetailPageProps) {
  const status = requestStatusBadge(request.status);

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={request.title}
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          {
            label: engineerPageTitles.requests,
            href: engineerPanelPaths.requests,
          },
          { label: engineerPageTitles.requestDetail },
        ]}
      />

      <article className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="flex flex-wrap gap-2">
          {request.isNew ? <Badge variant="info">جدید</Badge> : null}
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoItem
            icon={<WrenchIcon aria-hidden="true" />}
            label="خدمت"
            value={request.serviceLabel}
          />

          {request.city ? (
            <InfoItem
              icon={<MapPinIcon aria-hidden="true" />}
              label="شهر"
              value={request.city}
            />
          ) : null}

          <InfoItem
            icon={<CalendarDaysIcon aria-hidden="true" />}
            label="تاریخ"
            value={request.createdAtLabel}
          />

          {request.customerDisplayName ? (
            <InfoItem
              icon={<UserRoundIcon aria-hidden="true" />}
              label="متقاضی"
              value={request.customerDisplayName}
            />
          ) : null}
        </dl>

        <div className="mt-5 rounded-2xl bg-surface-subtle p-4">
          <p className="type-body leading-loose text-foreground-muted">
            {request.description ?? request.summary}
          </p>
        </div>

        {request.conversationId ? (
          <Button asChild className="mt-5">
            <Link
              href={`${engineerPanelPaths.messages}/${request.conversationId}`}
              className="gap-2"
            >
              <MessageSquareIcon aria-hidden="true" className="size-4" />
              {engineerPanelCopy.startConversationCta}
            </Link>
          </Button>
        ) : null}
      </article>

      <Alert variant="info" className="rounded-2xl">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>اقدامات درخواست</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.requestActionsUnavailable}
        </AlertDescription>
      </Alert>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary [&_svg]:size-4">
        {icon}
      </span>
      <div>
        <dt className="type-caption text-foreground-subtle">{label}</dt>
        <dd className="mt-0.5 type-body text-foreground">{value}</dd>
      </div>
    </div>
  );
}
