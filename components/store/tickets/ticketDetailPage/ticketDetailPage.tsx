"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowRightIcon } from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Textarea } from "@/components/ui/textarea/textarea";

import {
  closeTicketAction,
  replyTicketAction,
} from "@/services/ticket-service/ticket-actions";
import {
  ticketPriorityLabels,
  ticketStatusLabels,
} from "@/lib/tickets/ticket-labels/ticket-labels";
import { TicketMessageThread } from "@/components/store/tickets/ticketMessageThread/ticketMessageThread";
import { type TicketRoomDetail } from "@/lib/tickets/parse-ticket-room/parse-ticket-room";
import {
  TICKET_FILE_ACCEPT,
  ticketFileError,
} from "@/lib/tickets/ticket-attachment/ticket-attachment";

type TicketDetailPageProps = {
  room: TicketRoomDetail;
  currentUserId?: number;
  backHref?: string;
};

export function TicketDetailPage({
  room,
  currentUserId,
  backHref = "/account/support",
}: TicketDetailPageProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState<string | null>(null);
  const isClosed = room.status === "closed";

  function onReply(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const attachmentError = ticketFileError(file);
    if (attachmentError) {
      setError(attachmentError);
      return;
    }
    if (message.trim().length < 2 && !file) {
      setError("متن پاسخ یا پیوست تصویر را وارد کنید.");
      return;
    }

    const formData = new FormData();
    formData.set("roomId", String(room.id));
    formData.set("message", message.trim());
    if (file) {
      formData.set("file", file);
    }

    startTransition(async () => {
      const result = await replyTicketAction(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMessage("");
      setFile(undefined);
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
        description={`شماره ${room.number} · ${ticketStatusLabels[room.status]} · اولویت ${ticketPriorityLabels[room.priority]}`}
        actions={
          <Button asChild variant="outline" className="min-h-11 gap-2">
            <Link href={backHref}>
              <ArrowRightIcon aria-hidden="true" className="size-4" />
              بازگشت
            </Link>
          </Button>
        }
      />

      <div className="rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs sm:p-5">
        <TicketMessageThread
          messages={room.messages}
          currentUserId={currentUserId}
        />
      </div>

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
          <Field>
            <FieldLabel>پیوست تصویر (اختیاری)</FieldLabel>
            <FileUpload
              accept={TICKET_FILE_ACCEPT}
              disabled={pending}
              label={file ? "تغییر تصویر" : "انتخاب تصویر"}
              description={
                file
                  ? `فایل انتخاب‌شده: ${file.name}`
                  : "jpeg، png یا gif تا ۲ مگابایت"
              }
              onChange={(event) => setFile(event.currentTarget.files?.[0])}
            />
            <FieldDescription>
              می‌توانید فقط تصویر بفرستید یا متن و تصویر را با هم ارسال کنید.
            </FieldDescription>
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
