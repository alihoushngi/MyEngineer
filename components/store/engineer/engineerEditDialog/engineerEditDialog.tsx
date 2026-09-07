"use client";

import { type ReactNode, useId } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

type EngineerEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  pending: boolean;
  error: string | null;
  canSubmit: boolean;
  onSubmit: () => void;
  onRetry?: () => void;
};

export function EngineerEditDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  pending,
  error,
  canSubmit,
  onSubmit,
  onRetry,
}: EngineerEditDialogProps) {
  const formId = useId();

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      contentClassName="sm:max-w-lg"
      footer={
        <>
          <Button
            type="submit"
            form={formId}
            loading={pending}
            disabled={!canSubmit}
            className="w-full sm:w-auto"
          >
            {engineerPanelCopy.saveLabel}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={pending}
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            {engineerPanelCopy.cancelLabel}
          </Button>
        </>
      }
    >
      <form
        id={formId}
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <EngineerActionError message={error} onRetry={onRetry} />
      </form>
    </ResponsiveDialog>
  );
}
