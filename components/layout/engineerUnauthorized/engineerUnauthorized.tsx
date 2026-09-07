import Link from "next/link";
import {
  ArrowLeftIcon,
  CircleAlertIcon,
  LogInIcon,
  UserPlusIcon,
} from "lucide-react";

import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";

import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type EngineerAccessDenied } from "@/types/store/engineer.types";

type EngineerUnauthorizedProps = {
  access: EngineerAccessDenied;
};

export function EngineerUnauthorized({ access }: EngineerUnauthorizedProps) {
  const copy =
    access.kind === "unauthenticated"
      ? {
          title: engineerPanelCopy.unauthenticatedTitle,
          description: engineerPanelCopy.unauthenticatedDescription,
        }
      : access.kind === "forbidden"
        ? {
            title: engineerPanelCopy.forbiddenTitle,
            description: engineerPanelCopy.forbiddenDescription,
          }
        : {
            title: engineerPanelCopy.unavailableTitle,
            description: engineerPanelCopy.unavailableDescription,
          };

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-background-subtle">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-20 -z-10 size-120 rounded-full bg-danger/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -inset-e-48 -z-10 size-128 rounded-full bg-primary/5 blur-[150px]"
      />

      <header className="border-b border-primary-deep-foreground/10 bg-primary-deep/95 px-4 py-2.5 text-primary-deep-foreground shadow-sm backdrop-blur-xl">
        <div className="container-app">
          <BrandLogo className="text-primary-deep-foreground" />
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="container-narrow flex flex-1 items-center py-section outline-none"
      >
        <div className="w-full rounded-4xl border border-border-subtle bg-surface p-5 shadow-md sm:p-8">
          <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <CircleAlertIcon aria-hidden="true" className="size-7" />
          </span>

          <Alert
            variant="danger"
            className="border-0 bg-transparent p-0 shadow-none"
          >
            <AlertTitle className="type-h2">{copy.title}</AlertTitle>
            <AlertDescription className="mt-2 type-body text-foreground-muted">
              {copy.description}
            </AlertDescription>
          </Alert>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button asChild className="gap-2">
              <Link href={siteConfig.engineerLoginHref}>
                <LogInIcon aria-hidden="true" className="size-4" />
                {engineerPanelCopy.loginCta}
              </Link>
            </Button>

            <Button asChild variant="outline" className="gap-2">
              <Link href={siteConfig.joinHref}>
                <UserPlusIcon aria-hidden="true" className="size-4" />
                {engineerPanelCopy.joinCta}
              </Link>
            </Button>

            <Button asChild variant="ghost" className="gap-2">
              <Link href={siteConfig.homeHref}>
                {engineerPanelCopy.homeCta}
                <ArrowLeftIcon aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
