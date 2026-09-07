"use client";

import { useEffect } from "react";

import { markConversationRead } from "@/services/messaging-service/messaging-service";

type MessagingMarkReadProps = {
  conversationId: string;
};

export function MessagingMarkRead({ conversationId }: MessagingMarkReadProps) {
  useEffect(() => {
    void markConversationRead(conversationId);
  }, [conversationId]);

  return null;
}
