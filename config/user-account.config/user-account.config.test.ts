import assert from "node:assert/strict";
import test from "node:test";
import {
  isUserAccountNavActive,
  userAccountPaths,
  userAccountSidebarNav,
} from "./user-account.config.ts";

test("account paths stay under the private /account family", () => {
  assert.equal(userAccountPaths.dashboard, "/account");
  assert.equal(userAccountPaths.profile, "/account/profile");
  assert.equal(userAccountPaths.requests, "/account/requests");
  assert.equal(userAccountPaths.messages, "/account/messages");
  assert.equal(userAccountPaths.support, "/account/support");
  assert.equal(userAccountPaths.saved, "/account/saved");
  assert.equal(userAccountPaths.reviews, "/account/reviews");
  assert.equal(userAccountPaths.notifications, "/account/notifications");
  assert.equal(userAccountPaths.settings, "/account/settings");
  assert.equal(userAccountSidebarNav.length, 9);
});

test("dashboard nav is active only on the exact account root", () => {
  assert.equal(
    isUserAccountNavActive("/account", userAccountPaths.dashboard),
    true,
  );
  assert.equal(
    isUserAccountNavActive("/account/requests", userAccountPaths.dashboard),
    false,
  );
});

test("nested request, message, and review routes keep parent navigation active", () => {
  assert.equal(
    isUserAccountNavActive(
      "/account/requests/req-1",
      userAccountPaths.requests,
    ),
    true,
  );
  assert.equal(
    isUserAccountNavActive(
      "/account/messages/conv-1",
      userAccountPaths.messages,
    ),
    true,
  );
  assert.equal(
    isUserAccountNavActive("/account/reviews/rev-1", userAccountPaths.reviews),
    true,
  );
  assert.equal(
    isUserAccountNavActive("/account/saved", userAccountPaths.requests),
    false,
  );
});
