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

type ExpertContactCtaProps = {
  expert: ExpertProfile;
};

export function ExpertContactCta({ expert }: ExpertContactCtaProps) {
  const canContact = hasPublicContact(expert);

  return (
    <section
      aria-labelledby="expert-contact-cta-heading"
      className="border-t border-border-subtle pt-6"
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
        <PhoneCallIcon aria-hidden="true" className="size-5" />
      </div>

      <h2
        id="expert-contact-cta-heading"
        className="mt-4 type-h3 text-foreground"
      >
        {canContact
          ? expertProfileCopy.ctaTitle
          : expertProfileCopy.contactUnavailableTitle}
      </h2>

      <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
        {canContact
          ? expertProfileCopy.freeContactCta
          : expertProfileCopy.contactUnavailableDescription}
      </p>

      {canContact ? (
        <div className="mt-5">
          <ExpertContactDrawer
            expertName={expert.name}
            phone={getPublicPhone(expert.contact)}
            sms={getPublicSms(expert.contact)}
            trigger={
              <Button type="button" size="lg" className="w-full">
                {expertProfileCopy.contactLabel}
              </Button>
            }
          />
        </div>
      ) : null}
    </section>
  );
}
