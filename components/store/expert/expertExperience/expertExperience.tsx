import { HistoryIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { hasText } from "@/lib/experts/expert-profile/expert-profile";

type ExpertExperienceProps = {
  history?: string;
};

export function ExpertExperience({ history }: ExpertExperienceProps) {
  if (!hasText(history)) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-experience-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl">
        <SectionHeader
          titleId="expert-experience-heading"
          title={expertProfileCopy.experienceTitle}
        />

        <div className="relative mt-6 rounded-2xl border border-border-subtle bg-surface p-5 ps-14 shadow-xs sm:p-6 sm:ps-16">
          <span className="absolute inset-s-4 top-5 flex size-9 items-center justify-center rounded-xl bg-primary-subtle text-primary sm:inset-s-5 sm:top-6">
            <HistoryIcon aria-hidden="true" className="size-4" />
          </span>

          <div className="space-y-4">
            {history.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="type-body leading-loose text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
