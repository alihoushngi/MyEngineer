import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Badge } from "@/components/ui/badge/badge";

type ExpertTagSectionProps = {
  title: string;
  titleId: string;
  items: readonly string[];
};

export function ExpertTagSection({
  title,
  titleId,
  items,
}: ExpertTagSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={titleId} className="py-8 first:pt-0">
      <SectionHeader titleId={titleId} title={title} />

      <ul className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <Badge variant="secondary" className="min-h-8 px-3">
              {item}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
