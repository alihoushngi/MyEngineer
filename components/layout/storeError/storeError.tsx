"use client";

import Link from "next/link";
import { CircleAlertIcon, HouseIcon, RotateCcwIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";

import { siteConfig } from "@/config/site.config/site.config";

type StoreErrorProps = {
  onRetry: () => void;
};

export function StoreError({ onRetry }: StoreErrorProps) {
  return (
    <div className="container-narrow flex min-h-[60dvh] items-center py-section">
      <div className="relative w-full overflow-hidden rounded-4xl border border-border-subtle bg-surface p-5 text-center shadow-md sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-16 -top-16 size-36 rounded-full bg-danger/8 blur-3xl"
        />

        <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
          <CircleAlertIcon aria-hidden="true" className="size-7" />
        </span>

        <Alert
          variant="danger"
          className="relative mt-5 border-0 bg-transparent p-0 text-center shadow-none"
        >
          <AlertTitle className="type-h2">
            بارگذاری صفحه با مشکل مواجه شد
          </AlertTitle>
          <AlertDescription className="mt-2 type-body text-foreground-muted">
            لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.
          </AlertDescription>
        </Alert>

        <div className="relative mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Button type="button" className="gap-2" onClick={onRetry}>
            <RotateCcwIcon aria-hidden="true" className="size-4" />
            تلاش دوباره
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <Link href={siteConfig.homeHref}>
              <HouseIcon aria-hidden="true" className="size-4" />
              بازگشت به خانه
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
