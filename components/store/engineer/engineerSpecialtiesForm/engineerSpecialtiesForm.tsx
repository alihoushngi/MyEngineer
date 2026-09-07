import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { verificationBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";

type EngineerWelcomeProps = {
  workspace: EngineerWorkspace;
};

export function EngineerWelcome({ workspace }: EngineerWelcomeProps) {
  const { account } = workspace;
  const publicHref = account.publicExpertId
    ? `/experts/${account.publicExpertId}`
    : undefined;
  const badge = verificationBadge(account.verificationStatus);

  return (
    <section className="rounded-lg border border-border bg-surface p-card">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar className="size-16">
          {account.avatarSrc ? (
            <AvatarImage src={account.avatarSrc} alt="" />
          ) : null}
          <AvatarFallback>{account.displayName.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="type-h3 text-foreground">{account.displayName}</h2>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
          <p className="type-body text-muted-foreground">
            {account.profession}
          </p>
        </div>
        {publicHref ? (
          <Button asChild variant="outline">
            <Link href={publicHref}>
              {engineerPanelCopy.publicProfileLabel}
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
