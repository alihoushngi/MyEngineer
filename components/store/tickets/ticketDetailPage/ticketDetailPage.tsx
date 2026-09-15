"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowRightIcon } from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";

import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import {
  closeTicketAction,
  replyTicketAction,
} from "@/services/ticket-service/ticket-actions";
import {
  formatFaDate,
  priorityLabels,
  statusLabels,
  type TicketRoomDetail,
} from "@/services/ticket-service/ticket-service";

type TicketDetailPageProps = {
  room: TicketRoomDetail;
  currentUserId?: number;
  backHref?: string;
};

export function TicketDetailPage({
  room,
  currentUserId,
  backHref = userAccountPaths.messages,
}: TicketDetailPageProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isClosed = room.status === "closed";

  function onReply(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (message.trim().length < 2) {
      setError("متن پاسخ را وارد کنید.");
      return;
    }

    startTransition(async () => {
      const result = await replyTicketAction({
        roomId: String(room.id),
        message: message.trim(),
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMessage("");
      router.refresh();
    });
  }

  function onClose() {
    startTransition(async () => {
      const result = await closeTicketAction(String(room.id));
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={room.subject}
        description={`شماره ${room.number} · ${statusLabels[room.status]} · اولویت ${priorityLabels[room.priority]}`}
        actions={
          <Button asChild variant="outline" className="min-h-11 gap-2">
            <Link href={backHref}>
              <ArrowRightIcon aria-hidden="true" className="size-4" />
              بازگشت
            </Link>
          </Button>
        }
      />

      <ul className="flex flex-col gap-3 rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs sm:p-5">
        {(room.messages ?? []).length === 0 ? (
          <li className="type-body-sm text-foreground-muted">
            هنوز پیامی در این تیکت نیست.
          </li>
        ) : (
          (room.messages ?? []).map((item) => {
            const own =
              currentUserId !== undefined && item.sender_id === currentUserId;
            return (
              <li
                key={item.id}
                className={
                  own
                    ? "ms-auto max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-primary-foreground"
                    : "me-auto max-w-[85%] rounded-2xl bg-surface-subtle px-4 py-3 text-foreground"
                }
              >
                <p className="type-body-sm whitespace-pre-wrap">
                  {item.message || "فایل پیوست"}
                </p>
                {item.created_at ? (
                  <p
                    className={
                      own
                        ? "mt-2 type-caption text-primary-foreground/70"
                        : "mt-2 type-caption text-foreground-muted"
                    }
                  >
                    {formatFaDate(item.created_at)}
                  </p>
                ) : null}
              </li>
            );
          })
        )}
      </ul>

      {isClosed ? (
        <p className="rounded-2xl bg-surface-subtle px-4 py-3 type-body-sm text-foreground-muted">
          این تیکت بسته شده است.
        </p>
      ) : (
        <form
          onSubmit={onReply}
          className="flex flex-col gap-4 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs"
        >
          <Field>
            <FieldLabel htmlFor="ticket-reply">پاسخ</FieldLabel>
            <Textarea
              id="ticket-reply"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={pending}
            />
          </Field>
          {error ? <FieldError>{error}</FieldError> : null}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={pending} className="min-h-11">
              {pending ? "در حال ارسال…" : "ارسال پاسخ"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              className="min-h-11"
              onClick={onClose}
            >
              بستن تیکت
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
