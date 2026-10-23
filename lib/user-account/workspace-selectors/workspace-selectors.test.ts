import assert from "node:assert/strict";
import test from "node:test";
import {
  activeRequests,
  filterRequestsByStatus,
  findById,
  headerUnreadCount,
  parseUserRequestFilter,
  unreadCount,
  unreadMessageTotal,
} from "./workspace-selectors.ts";

test("findById returns the matching item or null", () => {
  const items = [{ id: "a" }, { id: "b" }];
  assert.equal(findById(items, "b")?.id, "b");
  assert.equal(findById(items, "z"), null);
});

test("unread helpers count notifications and conversation badges", () => {
  assert.equal(
    unreadCount([{ isRead: true }, { isRead: false }, { isRead: false }]),
    2,
  );
  assert.equal(unreadMessageTotal([{ unreadCount: 1 }, { unreadCount: 0 }]), 1);
});

test("header notification count never uses mock data when API is configured", () => {
  const mockNotifications = [{ isRead: false }];

  assert.equal(headerUnreadCount(true, [], mockNotifications), 0);
  assert.equal(headerUnreadCount(true, [{ isRead: false }], []), 1);
  assert.equal(headerUnreadCount(false, [], mockNotifications), 1);
});

test("activeRequests keeps sent and in-review items only", () => {
  const items = [
    { id: "1", status: "sent" },
    { id: "2", status: "in_review" },
    { id: "3", status: "closed" },
  ];
  assert.deepEqual(
    activeRequests(items).map((item) => item.id),
    ["1", "2"],
  );
});

test("parseUserRequestFilter accepts known statuses and defaults to all", () => {
  assert.equal(parseUserRequestFilter("sent"), "sent");
  assert.equal(parseUserRequestFilter("in_review"), "in_review");
  assert.equal(parseUserRequestFilter("closed"), "closed");
  assert.equal(parseUserRequestFilter("new"), "all");
  assert.equal(parseUserRequestFilter(null), "all");
});

test("filterRequestsByStatus keeps matching statuses only", () => {
  const items = [
    { id: "1", status: "sent" },
    { id: "2", status: "closed" },
  ];
  assert.deepEqual(
    filterRequestsByStatus(items, "closed").map((item) => item.id),
    ["2"],
  );
  assert.equal(filterRequestsByStatus(items, "all").length, 2);
});
