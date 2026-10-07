import assert from "node:assert/strict";
import test from "node:test";
import { OTP_LENGTH } from "./otp-length.ts";

test("the shared OTP length is five digits", () => {
  assert.equal(OTP_LENGTH, 5);
});
