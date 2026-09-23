import assert from "node:assert/strict";
import test from "node:test";
import { groupQualifications } from "./group-qualifications.ts";

test("groupQualifications nests children under parent_id", () => {
  const grouped = groupQualifications([
    { id: 2, title: "عمران", parent_id: null },
    { id: 3, title: "عمران اجرا", parent_id: 2 },
    { id: 4, title: "عمران نظارت", parent_id: 2 },
    { id: 6, title: "معماری", parent_id: null },
  ]);

  assert.deepEqual(grouped, [
    {
      id: "2",
      label: "عمران",
      children: [
        { id: "3", label: "عمران اجرا" },
        { id: "4", label: "عمران نظارت" },
      ],
    },
    {
      id: "6",
      label: "معماری",
      children: [],
    },
  ]);
});
