"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchSurface } from "@/components/layout/searchSurface/searchSurface";
import { Button } from "@/components/ui/button/button";

export function HeaderSearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="hidden min-h-10 justify-start gap-2 rounded-xl px-3 text-primary-deep-foreground/70 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep lg:inline-flex"
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
        className="rounded-xl text-primary-deep-foreground/75 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep lg:hidden"
        aria-label="جستجو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-surface"
        onClick={() => setOpen(true)}
      >
        <SearchIcon aria-hidden="true" className="size-5" />
      </Button>

      <SearchSurface open={open} onOpenChange={setOpen} />
    </>
  );
}
