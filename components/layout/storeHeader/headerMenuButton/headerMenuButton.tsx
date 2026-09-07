"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { MobileNavigation } from "@/components/layout/mobileNavigation/mobileNavigation";
import { Button } from "@/components/ui/button/button";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type HeaderMenuButtonProps = {
  authChrome: StoreAuthChrome;
};

export function HeaderMenuButton({ authChrome }: HeaderMenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-xl text-primary-deep-foreground/75 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep xl:hidden"
        aria-label="منو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <MenuIcon aria-hidden="true" className="size-5" />
      </Button>

      <MobileNavigation
        open={open}
        onOpenChange={setOpen}
        authChrome={authChrome}
      />
    </>
  );
}
