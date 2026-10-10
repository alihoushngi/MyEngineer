import assert from "node:assert/strict";
import test from "node:test";
import { verifyBackendSession } from "./verify-backend-session.ts";

test("a forged token does not establish a session", async () => {
  let calls = 0;
  const user = await verifyBackendSession("forged-token", async () => {
    calls += 1;
    throw new Error("Unauthorized");
  });
  assert.equal(user, null);
  assert.equal(calls, 1);
});

test("absence of a token never calls the backend", async () => {
  const user = await verifyBackendSession(undefined, async () => {
    assert.fail("No request should be made without a bearer token");
  });
  assert.equal(user, null);
});

test("identity and role come from backend verification, including incomplete profiles", async () => {
  const expected = {
    id: 123,
    role: { name: "engineer" },
    status: { value: "registration_in_progress" },
  };
  const user = await verifyBackendSession("valid-token", async (token) => {
    assert.equal(token, "valid-token");
    return expected;
  });
  assert.deepEqual(user, expected);
});

test("malformed identities and an unavailable backend fail closed", async () => {
  for (const value of [
    { id: 0, role: { name: "user" } },
    { id: -1, role: { name: "user" } },
    { id: 1, role: null },
    { id: 1, role: { name: "" } },
  ]) {
    assert.equal(await verifyBackendSession("token", async () => value), null);
  }
  assert.equal(
    await verifyBackendSession("token", async () => {
      throw new Error("Service unavailable");
    }),
    null,
  );
});
