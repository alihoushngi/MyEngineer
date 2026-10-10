import assert from "node:assert/strict";
import test from "node:test";
import {
  loginActionInput,
  registerActionInput,
  requestOtpActionInput,
  resetPasswordActionInput,
  selectRoleActionInput,
  userRegisterCompleteActionInput,
  verifyOtpActionInput,
} from "./auth-action-input.ts";

test("direct auth action calls reject invalid types, roles, audiences and purposes", () => {
  assert.equal(loginActionInput.safeParse(null).success, false);
  assert.equal(
    loginActionInput.safeParse({
      melli: "1234567890",
      password: {},
      audience: "user",
    }).success,
    false,
  );
  assert.equal(
    loginActionInput.safeParse({
      melli: "1234567890",
      password: "pass",
      audience: "admin",
    }).success,
    false,
  );
  assert.equal(
    selectRoleActionInput.safeParse({ role: "root", audience: "user" }).success,
    false,
  );
  assert.equal(
    requestOtpActionInput.safeParse({
      mobile: "09121112233",
      purpose: "arbitrary",
    }).success,
    false,
  );
});

test("login strings are bounded while ordinary credentials are preserved", () => {
  assert.equal(
    loginActionInput.safeParse({
      melli: "1234567890",
      password: "a".repeat(1025),
      audience: "user",
    }).success,
    false,
  );
  assert.equal(
    loginActionInput.safeParse({
      melli: "1234567890",
      password: "pass",
      audience: "user",
      nextPath: "a".repeat(2049),
    }).success,
    false,
  );
  assert.deepEqual(
    loginActionInput.parse({
      melli: " 1234567890 ",
      password: " unchanged ",
      audience: "user",
    }),
    { melli: "1234567890", password: " unchanged ", audience: "user" },
  );
});

test("OTP input accepts backend digit lengths and rejects malformed mobile/code values", () => {
  assert.equal(
    verifyOtpActionInput.safeParse({
      mobile: "09121112233",
      purpose: "login",
      code: "12345",
    }).success,
    true,
  );
  assert.equal(
    verifyOtpActionInput.safeParse({
      mobile: "09121112233",
      purpose: "password_reset",
      code: "123456",
    }).success,
    true,
  );
  assert.equal(
    verifyOtpActionInput.safeParse({
      mobile: "09121112233",
      purpose: "login",
      code: "1234567890123",
    }).success,
    false,
  );
  assert.equal(
    verifyOtpActionInput.safeParse({
      mobile: "09121112233",
      purpose: "login",
      code: "abc",
    }).success,
    false,
  );
  assert.equal(
    requestOtpActionInput.safeParse({ mobile: "anything", purpose: "login" })
      .success,
    false,
  );
});

test("registration and password reset enforce the existing password rules on the server", () => {
  const input = {
    name: "Ali",
    family: "Test",
    mobile: "09121112233",
    melli: "1234567890",
    password: "Example123",
    password_confirmation: "Example123",
  };
  assert.equal(registerActionInput.safeParse(input).success, true);
  assert.equal(
    registerActionInput.safeParse({
      ...input,
      password_confirmation: "Different123",
    }).success,
    false,
  );
  assert.equal(
    resetPasswordActionInput.safeParse({
      password: "weak",
      password_confirmation: "weak",
    }).success,
    false,
  );
  assert.equal(
    userRegisterCompleteActionInput.safeParse({
      phone: input.mobile,
      otp: "12345",
      displayName: "Ali",
      password: input.password,
    }).success,
    true,
  );
  assert.equal(
    userRegisterCompleteActionInput.safeParse({
      phone: input.mobile,
      otp: "12345",
      displayName: "Ali",
      password: "12345678",
    }).success,
    true,
  );
});
