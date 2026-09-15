import Link from "next/link";
import { InfoIcon, MessagesSquareIcon, PlusIcon } from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type TicketListItem } from "@/services/ticket-service/ticket-service";

type TicketInboxPageProps = {
  tickets: readonly TicketListItem[];
  createHref?: string;
  title?: string;
  description?: string;
};

export function TicketInboxPage({
  tickets,
  createHref = `${userAccountPaths.messages}/new`,
  title = "پشتیبانی",
  description = "تیکت‌های شما با پشتیبانی. گفتگوی مستقیم با متخصصان هنوز در API فعال نیست.",
}: TicketInboxPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={title}
        description={description}
        actions={
          <Button asChild className="min-h-11 gap-2">
            <Link href={createHref}>
              <PlusIcon aria-hidden="true" className="size-4" />
              تیکت جدید
            </Link>
          </Button>
        }
      />

      <div className="flex items-start gap-2 rounded-xl bg-info/10 px-3 py-2.5">
        <InfoIcon
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-info"
        />
        <p className="type-caption leading-relaxed text-foreground-muted">
          به‌جای پیام خصوصی، درخواست‌ها از مسیر تیکت پشتیبانی پیگیری می‌شوند.
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<MessagesSquareIcon aria-hidden="true" />}
            title="هنوز تیکتی ندارید"
            description="برای ارتباط با پشتیبانی یک تیکت جدید ثبت کنید."
          />
        </div>
      ) : (
        <ul className="rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Link
                href={ticket.href}
                className="flex flex-col gap-1 rounded-2xl px-4 py-3 transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="type-body-sm font-semibold text-foreground">
                    {ticket.subject}
                  </p>
                  <span className="rounded-full bg-primary-subtle px-2.5 py-0.5 type-caption text-primary">
                    {ticket.statusLabel}
                  </span>
                </div>
                <p className="type-caption text-foreground-muted">
                  شماره {ticket.number}
                  {ticket.createdAtLabel
                    ? ` · ${ticket.createdAtLabel}`
                    : ""}
                  {` · اولویت ${ticket.priorityLabel}`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
