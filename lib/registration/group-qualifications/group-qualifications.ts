export type QualificationNode = {
  id: number;
  title: string;
  slug?: string | null;
  parent_id?: number | null;
};

export type QualificationDiscipline = {
  id: string;
  label: string;
  children: readonly { id: string; label: string }[];
};

export function groupQualifications(
  items: readonly QualificationNode[],
): readonly QualificationDiscipline[] {
  const childrenByParent = new Map<number, { id: string; label: string }[]>();

  for (const item of items) {
    if (item.parent_id == null) {
      continue;
    }

    const list = childrenByParent.get(item.parent_id) ?? [];
    list.push({ id: String(item.id), label: item.title });
    childrenByParent.set(item.parent_id, list);
  }

  return items
    .filter((item) => item.parent_id == null)
    .map((item) => ({
      id: String(item.id),
      label: item.title,
      children: childrenByParent.get(item.id) ?? [],
    }));
}
