import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusinessIcon,
  EyeIcon,
  MapPinIcon,
  ShapesIcon,
  WrenchIcon,
} from "lucide-react";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ExpertProfile } from "@/types/store/expert.types";

type QuickFact = {
  label: string;
  value: string;
  icon: LucideIcon;
};

type ExpertQuickFactsProps = {
  expert: ExpertProfile;
};

export function ExpertQuickFacts({ expert }: ExpertQuickFactsProps) {
  const facts: QuickFact[] = [];

  if (typeof expert.viewCount === "number") {
    facts.push({
      label: expertProfileCopy.viewsLabel,
      value: formatFaNumber(expert.viewCount),
      icon: EyeIcon,
    });
  }

  if (typeof expert.experienceYears === "number") {
    facts.push({
      label: expertProfileCopy.experienceYearsLabel,
      value: `${formatFaNumber(expert.experienceYears)} ${expertProfileCopy.yearsSuffix}`,
      icon: BriefcaseBusinessIcon,
    });
  }

  if (expert.primarySpecialty) {
    facts.push({
      label: expertProfileCopy.specialtiesTitle,
      value: expert.primarySpecialty,
      icon: WrenchIcon,
    });
  }

  if (expert.city) {
    facts.push({
      label: expertProfileCopy.cityLabel,
      value: expert.city,
      icon: MapPinIcon,
    });
  }

  if (expert.discipline) {
    facts.push({
      label: expertProfileCopy.disciplineLabel,
      value: expert.discipline,
      icon: ShapesIcon,
    });
  }

  if (facts.length === 0) {
    return null;
  }

  return (
    <section aria-label="خلاصه اطلاعات">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {facts.map((fact) => {
          const Icon = fact.icon;

          return (
            <div
              key={fact.label}
              className="flex items-start gap-3 rounded-xl bg-surface-subtle p-3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <div className="min-w-0">
                <dt className="type-caption text-foreground-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 wrap-break-word type-body-sm font-semibold text-foreground">
                  {fact.value}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
