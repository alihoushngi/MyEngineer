import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertCardData } from "@/types/store/expert.types";

type RelatedExpertsProps = {
  experts?: readonly ExpertCardData[];
  excludeId?: string;
};

export function RelatedExperts({ experts, excludeId }: RelatedExpertsProps) {
  const items = (experts ?? []).filter((expert) => expert.id !== excludeId);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-experts-heading"
      className="relative isolate overflow-hidden border-t border-border-subtle bg-surface-subtle py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-40 top-0 -z-10 size-96 rounded-full bg-primary/5 blur-[130px]"
      />

      <div className="container-app">
        <SectionHeader
          eyebrow="متخصصان پیشنهادی"
          titleId="related-experts-heading"
          title={expertProfileCopy.relatedTitle}
        />

        <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
          {items.map((expert) => (
            <li key={expert.id} className="min-w-0">
              <ExpertCard expert={expert} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
