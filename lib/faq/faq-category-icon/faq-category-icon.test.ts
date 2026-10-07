import assert from "node:assert/strict";
import test from "node:test";

import { CircleHelpIcon, RulerIcon } from "lucide-react";

import { resolveFaqCategoryIcon } from "./faq-category-icon.ts";

test("resolveFaqCategoryIcon maps known keys and falls back", () => {
  assert.equal(resolveFaqCategoryIcon("Ruler"), RulerIcon);
  assert.equal(resolveFaqCategoryIcon("lucide-ruler"), RulerIcon);
  assert.equal(resolveFaqCategoryIcon("unknown-key"), CircleHelpIcon);
  assert.equal(resolveFaqCategoryIcon(undefined), CircleHelpIcon);
});
