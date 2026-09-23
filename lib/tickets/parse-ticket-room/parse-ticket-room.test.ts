import assert from "node:assert/strict";
import test from "node:test";
import { parseTicketRoomDetail } from "./parse-ticket-room.ts";

test("unwraps OpenAPI { room, messages } ticket payload", () => {
  const parsed = parseTicketRoomDetail({
    room: {
      id: 9,
      number: "T-9",
      subject: "ورود",
      priority: "high",
      status: "pending",
      sender_id: 1,
      receiver_id: 2,
    },
    messages: [
      { id: 4, message: "سلام", sender_id: 1, file: "front/upload/a.png" },
    ],
  });

  assert.equal(parsed?.id, 9);
  assert.equal(parsed?.subject, "ورود");
  assert.equal(parsed?.messages.length, 1);
  assert.equal(parsed?.messages[0]?.file, "front/upload/a.png");
});

test("accepts a flat room-with-messages payload", () => {
  const parsed = parseTicketRoomDetail({
    id: 3,
    number: "T-3",
    subject: "پشتیبانی",
    priority: "mid",
    status: "answered",
    sender_id: 8,
    receiver_id: 1,
    messages: [{ id: 1, message: "پاسخ", sender_id: 1 }],
  });

  assert.equal(parsed?.id, 3);
  assert.equal(parsed?.status, "answered");
  assert.equal(parsed?.messages[0]?.message, "پاسخ");
});

test("returns null for invalid ticket payloads", () => {
  assert.equal(parseTicketRoomDetail(null), null);
  assert.equal(parseTicketRoomDetail({ messages: [] }), null);
});
