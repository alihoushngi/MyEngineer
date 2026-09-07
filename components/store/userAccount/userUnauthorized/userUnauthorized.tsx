import { CircleAlertIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/spinner/spinner";

import { siteConfig } from "@/config/site.config/site.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";

import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";

import { type UserAccessResult } from "@/types/store/user-auth.types";

type UserUnauthorizedProps = {
  access: Exclude<UserAccessResult, { kind: "authenticated" }>;
  nextPath?: string;
};

export function UserUnauthorized({ access, nextPath }: UserUnauthorizedProps) {
  if (access.kind === "checking") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <header className="border-b border-border-subtle bg-surface px-4 py-3">
          <BrandLogo />
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="container-narrow flex flex-1 items-center justify-center py-section outline-none"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-border-subtle bg-surface p-8 text-center shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-subtle text-primary">
              <Spinner className="size-6" />
            </span>

            <p className="mt-5 type-h3 text-foreground">
              {userAuthCopy.checkingTitle}
            </p>
            <p className="mt-2 type-body leading-relaxed text-foreground-muted">
              {userAuthCopy.checkingDescription}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const copy =
    access.kind === "engineer_session"
      ? {
          title: userAuthCopy.engineerSessionTitle,
          description: userAuthCopy.engineerSessionDescription,
        }
      : access.kind === "expired"
        ? {
            title: userAuthCopy.expiredTitle,
            description: userAuthCopy.expiredDescription,
          }
        : access.kind === "error"
          ? {
              title: userAuthCopy.errorTitle,
              description: access.message || userAuthCopy.errorDescription,
            }
          : access.kind === "unavailable"
            ? {
                title: userAuthCopy.unavailableTitle,
                description: userAuthCopy.unavailableDescription,
              }
            : {
                title: userAuthCopy.unauthenticatedTitle,
                description: userAuthCopy.unauthenticatedDescription,
              };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border-subtle bg-surface px-4 py-3">
        <BrandLogo />
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="container-narrow flex flex-1 items-center justify-center py-section outline-none"
      >
        <div className="w-full max-w-lg rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-7">
          <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            {access.kind === "engineer_session" ? (
              <ShieldCheckIcon aria-hidden="true" className="size-5" />
            ) : (
              <CircleAlertIcon aria-hidden="true" className="size-5" />
            )}
          </span>

          <Alert variant="danger" className="rounded-2xl">
            <CircleAlertIcon aria-hidden="true" />
            <AlertTitle>{copy.title}</AlertTitle>
            <AlertDescription>{copy.description}</AlertDescription>
          </Alert>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            {access.kind === "engineer_session" ? (
              <Button asChild className="sm:flex-1">
                <Link href={siteConfig.engineerPanelHref}>
                  {userAuthCopy.engineerPanelCta}
                </Link>
              </Button>
            ) : (
              <Button asChild className="sm:flex-1">
                <Link href={userLoginHref(nextPath ?? userAuthPaths.account)}>
                  {userAuthCopy.loginCta}
                </Link>
              </Button>
            )}

            <Button asChild variant="outline" className="sm:flex-1">
              <Link href={siteConfig.homeHref}>{userAuthCopy.homeCta}</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
