"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchSurface } from "@/components/layout/searchSurface/searchSurface";
import { Button } from "@/components/ui/button/button";
import { isPageEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { cn } from "@/lib/utils/cn/cn";

type HeaderSearchButtonProps = {
  surface?: boolean;
  onDialogClose?: () => void;
};

export function HeaderSearchButton({
  surface = false,
  onDialogClose,
}: HeaderSearchButtonProps) {
  const [open, setOpen] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      onDialogClose?.();
    }
  }

  if (!isPageEnabled("search")) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "hidden min-h-10 justify-start gap-2 rounded-xl px-3 transition-all duration-200 ease-in-out lg:inline-flex",
          surface
            ? "text-client-secondary hover:bg-client-surface-secondary hover:text-client-secondary focus-visible:ring-client-focus focus-visible:ring-offset-client-surface-soft"
            : "text-primary-deep-foreground/70 hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-surface"
        onClick={() => setOpen(true)}
      >
        <SearchIcon aria-hidden="true" className="size-4" />
        جستجو
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-xl transition-all duration-200 ease-in-out lg:hidden",
          surface
            ? "text-client-secondary hover:bg-client-surface-secondary hover:text-client-secondary focus-visible:ring-client-focus focus-visible:ring-offset-client-surface-soft"
            : "text-primary-deep-foreground/75 hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep",
        )}
        aria-label="جستجو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-surface"
        onClick={() => setOpen(true)}
      >
        <SearchIcon aria-hidden="true" className="size-5" />
      </Button>

      <SearchSurface open={open} onOpenChange={handleOpenChange} />
    </>
  );
}
