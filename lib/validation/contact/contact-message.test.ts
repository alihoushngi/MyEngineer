import assert from "node:assert/strict";
import test from "node:test";

import { validateContactMessage } from "./contact-message.ts";

const valid = {
  name: "علی",
  family: "رضایی",
  mobile: "09121234567",
  email: "",
  subject: "سلام",
  message: "پیام آزمایشی",
};

test("valid contact values produce no errors", () => {
  assert.deepEqual(validateContactMessage(valid), {});
});

test("required subject and message report their own errors", () => {
  const errors = validateContactMessage({ ...valid, subject: "", message: "" });

  assert.ok(errors.subject);
  assert.ok(errors.message);
  assert.equal(errors.name, undefined);
});

test("mobile, email and message length are validated", () => {
  const errors = validateContactMessage({
    ...valid,
    mobile: "123",
    email: "bad",
    message: "x".repeat(201),
  });

  assert.ok(errors.mobile);
  assert.ok(errors.email);
  assert.ok(errors.message);
});
