"use client";

import { MapPinIcon } from "lucide-react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Empty } from "@/components/ui/empty/empty";

type CityUnavailableDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title: string;
  description: string;
};

export function CityUnavailableDialog({
  open,
  onOpenChange,
  id,
  title,
  description,
}: CityUnavailableDialogProps) {
  return (
    <ResponsiveDialog
      id={id}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      headerHidden
      contentClassName="sm:max-w-md"
      bodyClassName="flex items-center"
    >
      <Empty
        icon={<MapPinIcon aria-hidden="true" className="size-6" />}
        title={title}
        description={description}
        className="w-full border-0 bg-transparent px-2 py-8 shadow-none sm:py-10"
      />
    </ResponsiveDialog>
  );
}
