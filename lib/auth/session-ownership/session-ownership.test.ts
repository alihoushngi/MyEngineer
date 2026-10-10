import assert from "node:assert/strict";
import test from "node:test";
import { findOwnedSession } from "./session-ownership.ts";

test("session revocation only accepts a caller's own positive integer ID", () => {
  const sessions = [
    { id: 7, current: true },
    { id: 8, current: false },
  ];
  assert.deepEqual(findOwnedSession(7, sessions), sessions[0]);
  assert.deepEqual(findOwnedSession(8, sessions), sessions[1]);
  for (const id of [
    9,
    0,
    -1,
    7.5,
    NaN,
    Infinity,
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    assert.equal(findOwnedSession(id, sessions), undefined);
  }
  assert.equal(findOwnedSession(7, []), undefined);
});
