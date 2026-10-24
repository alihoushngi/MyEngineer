import assert from "node:assert/strict";
import test from "node:test";

import {
  getDrawingConsultationPreview,
  parseDrawingConsultationPreviewMode,
} from "./drawing-consultation-preview.ts";

const items = [
  {
    id: "8",
    title: "ترسیم نقشه معماری",
    description: "شرح",
    href: "/services/architecture",
    imageSrc: "https://media.example.com/services/8/8.jpg",
  },
  {
    id: "9",
    title: "ترسیم نقشه سازه",
    description: "شرح",
    href: "/services/structure",
    imageSrc: "https://media.example.com/services/9/9.jpg",
  },
];

test("keeps API data by default and exposes only local preview states", () => {
  assert.equal(parseDrawingConsultationPreviewMode(undefined), "demo");
  assert.equal(parseDrawingConsultationPreviewMode("unknown"), "demo");
  assert.equal(
    parseDrawingConsultationPreviewMode(["worst", "empty"]),
    "worst",
  );
  assert.equal(getDrawingConsultationPreview(items, "demo"), items);
  assert.equal(getDrawingConsultationPreview(items, "empty").length, 0);
  assert.equal(getDrawingConsultationPreview(items, "one").length, 1);

  const worst = getDrawingConsultationPreview(items, "worst");
  assert.equal(worst[0]?.id, "8");
  assert.equal(worst[0]?.href, undefined);
  assert.match(worst[0]?.title ?? "", /معماری.*جزئیات اجرایی/);
  assert.equal(
    worst[0]?.imageSrc,
    "https://media.example.com/services/8/8.jpg.missing-preview",
  );
  assert.equal(worst[1]?.imageSrc, undefined);
});
