import assert from "node:assert/strict";
import test from "node:test";

import { resolveServiceWorkerAction } from "./resolve-service-worker-action.ts";

test("resolveServiceWorkerAction unregisters leftover workers in development", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "development",
      hasServiceWorker: true,
      isSecureContext: true,
      hostname: "localhost",
    }),
    "unregister",
  );
});

test("resolveServiceWorkerAction unregisters leftover workers in test", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "test",
      hasServiceWorker: true,
      isSecureContext: true,
      hostname: "localhost",
    }),
    "unregister",
  );
});

test("resolveServiceWorkerAction registers in a secure production context", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "production",
      hasServiceWorker: true,
      isSecureContext: true,
      hostname: "mohandesman.ir",
    }),
    "register",
  );
});

test("resolveServiceWorkerAction registers production testing on localhost", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "production",
      hasServiceWorker: true,
      isSecureContext: false,
      hostname: "localhost",
    }),
    "register",
  );
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "production",
      hasServiceWorker: true,
      isSecureContext: false,
      hostname: "127.0.0.1",
    }),
    "register",
  );
});

test("resolveServiceWorkerAction skips insecure non-localhost production hosts", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "production",
      hasServiceWorker: true,
      isSecureContext: false,
      hostname: "example.com",
    }),
    "none",
  );
});

test("resolveServiceWorkerAction does nothing when the browser has no service worker API", () => {
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "development",
      hasServiceWorker: false,
      isSecureContext: true,
      hostname: "localhost",
    }),
    "none",
  );
  assert.equal(
    resolveServiceWorkerAction({
      nodeEnv: "production",
      hasServiceWorker: false,
      isSecureContext: true,
      hostname: "mohandesman.ir",
    }),
    "none",
  );
});
