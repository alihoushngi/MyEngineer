import type { HomeDrawingService } from "../../../types/store/home.types.js";

export type DrawingConsultationDiscipline = {
  title: string;
  matches: readonly string[];
};

export type DrawingConsultationCard = {
  disciplineTitle: string;
  item?: HomeDrawingService;
};

export function mapDrawingConsultationCards(
  disciplines: readonly DrawingConsultationDiscipline[],
  items: readonly HomeDrawingService[],
): DrawingConsultationCard[] {
  const assigned = new Set<number>();
  const cards: DrawingConsultationCard[] = [];

  for (const discipline of disciplines) {
    const group: DrawingConsultationCard[] = [];

    for (const [index, item] of items.entries()) {
      if (
        assigned.has(index) ||
        !discipline.matches.some((match) => item.title.includes(match))
      ) {
        continue;
      }

      assigned.add(index);
      group.push({ disciplineTitle: discipline.title, item });
    }

    cards.push(
      ...(group.length > 0 ? group : [{ disciplineTitle: discipline.title }]),
    );
  }

  for (const [index, item] of items.entries()) {
    if (!assigned.has(index)) {
      cards.push({ disciplineTitle: item.title, item });
    }
  }

  return cards;
}
