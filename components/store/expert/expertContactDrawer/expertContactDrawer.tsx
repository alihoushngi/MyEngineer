"use client";

import { type ReactNode } from "react";
import { MessageSquareIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ExpertContactDrawerProps = {
  expertName: string;
  phone?: string;
  sms?: string;
  trigger: ReactNode;
};

export function ExpertContactDrawer({
  expertName,
  phone,
  sms,
  trigger,
}: ExpertContactDrawerProps) {
  const hasPhone = Boolean(phone);
  const hasSms = Boolean(sms);

  if (!hasPhone && !hasSms) {
    return null;
  }

  return (
    <ResponsiveDialog
      trigger={trigger}
      title={expertProfileCopy.contactTitle}
      description={`${expertProfileCopy.contactDescription} ${expertName}`}
      contentClassName="sm:max-w-md"
      footer={
        <>
          {hasPhone ? (
            <Button asChild className="w-full sm:w-auto">
              <a href={`tel:${phone}`} className="gap-2">
                <PhoneIcon aria-hidden="true" />
                {expertProfileCopy.callLabel}
                <span className="ltr-data type-body-sm">{phone}</span>
              </a>
            </Button>
          ) : null}

          {hasSms ? (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a href={`sms:${sms}`} className="gap-2">
                <MessageSquareIcon aria-hidden="true" />
                {expertProfileCopy.smsLabel}
                <span className="ltr-data type-body-sm">{sms}</span>
              </a>
            </Button>
          ) : null}

          <p className="w-full text-center type-caption text-foreground-muted">
            {expertProfileCopy.contactPlatformNote}
          </p>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-4">
        <ShieldCheckIcon
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-primary"
        />
        <p className="type-body-sm leading-loose text-foreground-muted">
          {expertProfileCopy.contactCaution}
        </p>
      </div>
    </ResponsiveDialog>
  );
}
