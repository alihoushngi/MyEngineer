import {
  AwardIcon,
  BadgeCheckIcon,
  GraduationCapIcon,
  LandmarkIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";

type ExpertProfessionalInfoProps = {
  expert: ExpertProfile;
};

export function ExpertProfessionalInfo({
  expert,
}: ExpertProfessionalInfoProps) {
  const education = expert.education ?? [];
  const qualifications = expert.qualifications ?? [];
  const competencies = expert.license?.competencies ?? [];
  const hasMembership = Boolean(expert.organizationMembership?.label);
  const hasLicense = Boolean(expert.license?.title);

  if (
    education.length === 0 &&
    !hasMembership &&
    !hasLicense &&
    qualifications.length === 0
  ) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-professional-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl">
        <SectionHeader
          titleId="expert-professional-heading"
          title={expertProfileCopy.professionalTitle}
        />

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {hasItems(education) ? (
            <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs sm:col-span-2">
              <dt className="flex items-center gap-2 type-caption font-semibold text-primary">
                <GraduationCapIcon aria-hidden="true" className="size-4" />
                {expertProfileCopy.educationLabel}
              </dt>
              <dd className="mt-4">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {education.map((item) => (
                    <li
                      key={`${item.degree}-${item.field ?? ""}-${item.institution ?? ""}`}
                      className="rounded-xl bg-surface-subtle p-3"
                    >
                      <p className="type-body font-semibold text-foreground">
                        {item.degree}
                      </p>
                      {item.field ? (
                        <p className="mt-1 type-body-sm text-foreground-muted">
                          {item.field}
                        </p>
                      ) : null}
                      {item.institution ? (
                        <p className="type-body-sm text-foreground-muted">
                          {item.institution}
                        </p>
                      ) : null}
                      {item.year ? (
                        <p className="mt-1 type-caption text-foreground-subtle">
                          {item.year}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}

          {hasMembership ? (
            <ProfessionalItem
              icon={<LandmarkIcon aria-hidden="true" />}
              label={expertProfileCopy.membershipLabel}
            >
              {expert.organizationMembership?.label}
            </ProfessionalItem>
          ) : null}

          {hasLicense ? (
            <ProfessionalItem
              icon={<BadgeCheckIcon aria-hidden="true" />}
              label={expertProfileCopy.licenseLabel}
            >
              <p>{expert.license?.title}</p>
              {hasItems(competencies) ? (
                <p className="mt-2 type-body-sm text-foreground-muted">
                  {competencies.join("، ")}
                </p>
              ) : null}
            </ProfessionalItem>
          ) : null}

          {hasItems(qualifications) ? (
            <ProfessionalItem
              icon={<AwardIcon aria-hidden="true" />}
              label={expertProfileCopy.qualificationsLabel}
              className="sm:col-span-2"
            >
              {qualifications.join("، ")}
            </ProfessionalItem>
          ) : null}
        </dl>
      </div>
    </section>
  );
}

function ProfessionalItem({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs ${className ?? ""}`}
    >
      <dt className="flex items-center gap-2 type-caption font-semibold text-primary">
        <span className="[&_svg]:size-4">{icon}</span>
        {label}
      </dt>
      <dd className="mt-3 type-body leading-relaxed text-foreground">
        {children}
      </dd>
    </div>
  );
}
