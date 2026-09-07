import { PhoneCallIcon } from "lucide-react";
import { ExpertContactDrawer } from "@/components/store/expert/expertContactDrawer/expertContactDrawer";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import {
  getPublicPhone,
  getPublicSms,
  hasPublicContact,
} from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";

type ExpertStickyContactBarProps = {
  expert: ExpertProfile;
};

export function ExpertStickyContactBar({
  expert,
}: ExpertStickyContactBarProps) {
  if (!hasPublicContact(expert)) {
    return null;
  }

  return (
    <div className="fixed inset-x-2 bottom-2 z-30 lg:hidden">
      <div className="rounded-2xl border border-border-subtle bg-surface-elevated/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-xl">
        <ExpertContactDrawer
          expertName={expert.name}
          phone={getPublicPhone(expert.contact)}
          sms={getPublicSms(expert.contact)}
          trigger={
            <Button type="button" className="w-full gap-2" size="lg">
              <PhoneCallIcon aria-hidden="true" className="size-5" />
              {expertProfileCopy.contactLabel}
            </Button>
          }
        />
      </div>
    </div>
  );
}
