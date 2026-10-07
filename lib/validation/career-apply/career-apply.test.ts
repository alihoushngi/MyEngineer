import assert from "node:assert/strict";
import test from "node:test";

import { validateCareerApply } from "./career-apply.ts";

const valid = {
  name: "علی",
  family: "رضایی",
  email: "a@b.co",
  mobile: "09121234567",
  age: "30",
  gender: "male",
  provinceId: "1",
  cityId: "2",
  resumeError: null,
};

test("valid application has no errors", () => {
  assert.deepEqual(validateCareerApply(valid), {});
});

test("each invalid field gets its own message", () => {
  const errors = validateCareerApply({
    ...valid,
    name: "",
    email: "x",
    age: "10",
    gender: "",
    cityId: "",
  });

  assert.ok(errors.name && errors.email && errors.age);
  assert.ok(errors.gender && errors.cityId);
  assert.equal(errors.mobile, undefined);
});

test("a resume error is surfaced on the resume field", () => {
  assert.equal(
    validateCareerApply({ ...valid, resumeError: "bad file" }).resumeError,
    "bad file",
  );
});
