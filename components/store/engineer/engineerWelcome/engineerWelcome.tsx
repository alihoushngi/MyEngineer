import Link from "next/link";
import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  ExternalLinkIcon,
} from "lucide-react";

import { verificationBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";

import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";

import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerWelcomeProps = {
  workspace: EngineerWorkspace;
};

export function EngineerWelcome({ workspace }: EngineerWelcomeProps) {
  const { account } = workspace;

  const publicHref = account.publicExpertId
    ? `/experts/${account.publicExpertId}`
    : undefined;

  const badge = verificationBadge(account.verificationStatus);
  const initials = getDisplayInitials(account.displayName);

  return (
    <section className="relative isolate overflow-hidden rounded-4xl border border-primary-deep-foreground/10 bg-primary-deep p-5 text-primary-deep-foreground shadow-lg sm:p-6 lg:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-24 -top-24 -z-10 size-64 rounded-full bg-primary/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -inset-e-20 -z-10 size-72 rounded-full bg-secondary/10 blur-[110px]"
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar className="size-18 shrink-0 border-2 border-primary-deep-foreground/10 shadow-md sm:size-20">
          {account.avatarSrc ? (
            <AvatarImage src={account.avatarSrc} alt="" />
          ) : null}

          <AvatarFallback className="bg-primary/20 type-h4 font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="type-h2 text-primary-deep-foreground">
              {account.displayName}
            </h2>

            <Badge
              variant={badge.variant}
              className="transition-all duration-200 ease-in-out"
            >
              {badge.label}
            </Badge>
          </div>

          <p className="mt-2 flex items-center gap-2 type-body text-primary-deep-foreground/65">
            <BriefcaseBusinessIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />
            <span className="truncate">{account.profession}</span>
          </p>
        </div>

        {publicHref ? (
          <Button
            asChild
            variant="outline"
            className="shrink-0 border-primary-deep-foreground/15 bg-primary-deep-foreground/5 text-primary-deep-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-md motion-reduce:transform-none"
          >
            <Link href={publicHref} className="gap-2">
              {engineerPanelCopy.publicProfileLabel}
              <ExternalLinkIcon aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2 type-caption text-primary-deep-foreground/45">
            تکمیل پروفایل برای نمایش عمومی
            <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
          </span>
        )}
      </div>
    </section>
  );
}
