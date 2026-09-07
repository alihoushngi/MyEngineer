"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { ReviewSubmitForm } from "@/components/store/reviews/reviewSubmitForm/reviewSubmitForm";
import { Button } from "@/components/ui/button/button";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";

type ReviewSubmitDialogProps = {
  requestId: string;
  triggerLabel?: string;
  triggerVariant?: "primary" | "outline";
  triggerClassName?: string;
  onSubmitted?: (reviewId: string) => void;
};

export function ReviewSubmitDialog({
  requestId,
  triggerLabel = reviewsCopy.submitLabel,
  triggerVariant = "outline",
  triggerClassName,
  onSubmitted,
}: ReviewSubmitDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        icon={<StarIcon aria-hidden="true" />}
        className={triggerClassName}
        onClick={() => {
          setOpen(true);
        }}
      >
        {triggerLabel}
      </Button>

      <ResponsiveDialog
        open={open}
        title={reviewsCopy.submitTitle}
        description={reviewsCopy.submitDescription}
        contentClassName="sm:max-w-lg"
        onOpenChange={setOpen}
      >
        <ReviewSubmitForm
          requestId={requestId}
          onSuccess={(reviewId) => {
            setOpen(false);
            onSubmitted?.(reviewId);
          }}
        />
      </ResponsiveDialog>
    </>
  );
}
