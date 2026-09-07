import { AwardIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertCertificate } from "@/types/store/expert.types";

type ExpertCertificatesProps = {
  certificates?: readonly ExpertCertificate[];
};

export function ExpertCertificates({ certificates }: ExpertCertificatesProps) {
  if (!hasItems(certificates)) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-certificates-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl">
        <SectionHeader
          titleId="expert-certificates-heading"
          title={expertProfileCopy.certificatesTitle}
        />

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {certificates.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                <AwardIcon aria-hidden="true" className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="type-body font-semibold text-foreground">
                  {item.title}
                </p>
                {item.issuer ? (
                  <p className="mt-1 type-body-sm text-foreground-muted">
                    {item.issuer}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
