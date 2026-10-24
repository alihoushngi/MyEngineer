import assert from "node:assert/strict";
import test from "node:test";

import { mapDrawingConsultationCards } from "./drawing-consultation-cards.ts";

const disciplines = [
  { title: "معماری", matches: ["معماری"] },
  { title: "سازه", matches: ["سازه"] },
  { title: "برق", matches: ["برق", "الکت"] },
  { title: "مکانیک", matches: ["مکانیک"] },
] as const;

function service(id: string, title: string) {
  return { id, title, description: title, href: `/services/${id}` };
}

test("keeps all API records in reference discipline order", () => {
  const cards = mapDrawingConsultationCards(disciplines, [
    service("8", "ترسیم نقشه معماری"),
    service("9", "ترسیم نقشه سازه"),
    service("10", "ترسیم نقشه برق"),
    service("11", "ترسیم نقشه مکانیک"),
    service("12", "نقشه معماری جزئیات اجرایی"),
  ]);

  assert.deepEqual(
    cards.map(({ disciplineTitle, item }) => [disciplineTitle, item?.id]),
    [
      ["معماری", "8"],
      ["معماری", "12"],
      ["سازه", "9"],
      ["برق", "10"],
      ["مکانیک", "11"],
    ],
  );
});

test("keeps empty discipline positions and surfaces unmatched API records", () => {
  const cards = mapDrawingConsultationCards(disciplines, [
    service("8", "ترسیم نقشه معماری"),
    service("12", "خدمات نقشه‌کشی"),
  ]);

  assert.deepEqual(
    cards.map(({ disciplineTitle, item }) => [disciplineTitle, item?.id]),
    [
      ["معماری", "8"],
      ["سازه", undefined],
      ["برق", undefined],
      ["مکانیک", undefined],
      ["خدمات نقشه‌کشی", "12"],
    ],
  );
});
