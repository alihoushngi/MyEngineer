import {
  CalendarDaysIcon,
  Clock3Icon,
  MapPinIcon,
  UserRoundIcon,
  WrenchIcon,
} from "lucide-react";
import Link from "next/link";

import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { ReviewSubmitDialog } from "@/components/store/reviews/reviewSubmitDialog/reviewSubmitDialog";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserRequestStatusBadge } from "@/components/store/userAccount/userRequestStatusBadge/userRequestStatusBadge";
import { Button } from "@/components/ui/button/button";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import { type UserRequest } from "@/types/store/user-account.types";

type UserRequestDetailPageProps = {
  request: UserRequest;
};

export function UserRequestDetailPage({ request }: UserRequestDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={request.title}
        description={userAccountCopy.requestDetailDescription}
      />

      <article className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-5">
          <UserRequestStatusBadge status={request.status} />
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <RequestMeta
            icon={<WrenchIcon aria-hidden="true" />}
            label="خدمت"
            value={request.serviceLabel}
          />

          <div className="flex items-start gap-3 rounded-2xl bg-surface-subtle p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
              <UserRoundIcon aria-hidden="true" className="size-4" />
            </span>

            <div className="min-w-0">
              <dt className="type-caption text-foreground-subtle">
                {userAccountCopy.relatedExpert}
              </dt>
              <dd className="mt-1 type-body-sm font-medium">
                <Link
                  href={request.expertHref}
                  className="text-primary outline-none transition-all duration-200 ease-in-out hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {request.expertName}
                </Link>
              </dd>
            </div>
          </div>

          {request.city ? (
            <RequestMeta
              icon={<MapPinIcon aria-hidden="true" />}
              label={userAccountCopy.cityLabel}
              value={request.city}
            />
          ) : null}

          <RequestMeta
            icon={<CalendarDaysIcon aria-hidden="true" />}
            label="تاریخ"
            value={request.createdAtLabel}
          />

          {request.latestActivityLabel ? (
            <RequestMeta
              icon={<Clock3Icon aria-hidden="true" />}
              label="آخرین فعالیت"
              value={request.latestActivityLabel}
            />
          ) : null}
        </dl>

        <div className="mt-5 rounded-2xl border border-border-subtle bg-background-subtle p-4">
          <p className="type-body leading-loose text-foreground">
            {request.description ?? request.summary}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={request.expertHref}>
              {userAccountCopy.openPublicProfile}
            </Link>
          </Button>

          {request.conversationId ? (
            <Button asChild>
              <Link
                href={`${userAccountPaths.messages}/${request.conversationId}`}
              >
                {userAccountCopy.openConversation}
              </Link>
            </Button>
          ) : null}

          {request.reviewId ? (
            <Button asChild variant="outline">
              <Link href={`${userAccountPaths.reviews}/${request.reviewId}`}>
                {reviewsCopy.viewReview}
              </Link>
            </Button>
          ) : null}
        </div>
      </article>

      {!request.conversationId ? (
        <StartConversationButton
          expertId={request.expertId}
          isUserAuthenticated
        />
      ) : null}

      {request.status === "closed" && !request.reviewId ? (
        <ReviewSubmitDialog requestId={request.id} triggerVariant="primary" />
      ) : null}
    </div>
  );
}

function RequestMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-surface-subtle p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary [&_svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="type-caption text-foreground-subtle">{label}</dt>
        <dd className="mt-1 type-body-sm font-medium text-foreground">
          {value}
        </dd>
      </div>
    </div>
  );
}
