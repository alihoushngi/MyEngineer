"use client";

import Image from "next/image";
import { ExpandIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ExpertAvatarPreviewProps = {
  name: string;
  initials: string;
  avatarSrc?: string;
};

export function ExpertAvatarPreview({
  name,
  initials,
  avatarSrc,
}: ExpertAvatarPreviewProps) {
  const [open, setOpen] = useState(false);

  const avatar = (
    <Avatar className="size-24 rounded-3xl border-2 border-primary-deep-foreground/15 shadow-lg sm:size-28">
      {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
      <AvatarFallback className="rounded-3xl bg-primary/15 type-h3 text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  if (!avatarSrc) {
    return avatar;
  }

  return (
    <>
      <button
        type="button"
        className="group relative w-fit rounded-3xl outline-none transition-all duration-200 ease-in-out hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
        aria-label={expertProfileCopy.avatarPreviewLabel}
        onClick={() => setOpen(true)}
      >
        {avatar}
        <span
          aria-hidden="true"
          className="absolute bottom-2 inset-e-2 flex size-8 items-center justify-center rounded-xl border border-primary-deep-foreground/10 bg-primary-deep/80 text-primary-deep-foreground opacity-0 shadow-sm backdrop-blur-md transition-all duration-200 ease-in-out group-hover:opacity-100"
        >
          <ExpandIcon className="size-4" />
        </span>
      </button>

      <ResponsiveDialog
        open={open}
        title={name}
        description={expertProfileCopy.avatarPreviewLabel}
        contentClassName="sm:max-w-lg"
        onOpenChange={setOpen}
      >
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-surface-subtle">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            sizes="(min-width: 640px) 28rem, 100vw"
            className="object-cover"
          />
        </div>
      </ResponsiveDialog>
    </>
  );
}
