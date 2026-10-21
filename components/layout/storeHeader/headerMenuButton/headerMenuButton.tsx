"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { MobileNavigation } from "@/components/layout/mobileNavigation/mobileNavigation";
import { Button } from "@/components/ui/button/button";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type HeaderMenuButtonProps = {
  authChrome: StoreAuthChrome;
  showUtilityTools?: boolean;
  selectedCityLabel?: string;
};

export function HeaderMenuButton({
  authChrome,
  showUtilityTools = true,
  selectedCityLabel,
}: HeaderMenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-md border-client-focus bg-[#212529] text-client-white hover:bg-[#212529]/90 hover:text-client-white focus-visible:ring-client-focus focus-visible:ring-offset-2 focus-visible:ring-offset-client-secondary"
        aria-label="منو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <MenuIcon aria-hidden="true" className="size-7" />
      </Button>

      <MobileNavigation
        open={open}
        onOpenChange={setOpen}
        authChrome={authChrome}
        showUtilityTools={showUtilityTools}
        selectedCityLabel={selectedCityLabel}
      />
    </>
  );
}
