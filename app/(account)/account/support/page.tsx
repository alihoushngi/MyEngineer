import { TicketInboxPage } from "@/components/store/tickets/ticketInboxPage/ticketInboxPage";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";
import { listTicketRooms } from "@/services/ticket-service/ticket-service";

export const metadata = userAccountMetadata("پشتیبانی");
export const dynamic = "force-dynamic";

export default async function AccountSupportRoute() {
  const access = await getUserAccess();
  if (access.kind !== "authenticated") {
    return null;
  }

  const tickets = await listTicketRooms("/account/support").catch(() => []);
  return (
    <TicketInboxPage
      tickets={tickets}
      createHref="/account/support/new"
      title="پشتیبانی"
      description="تیکت‌های پشتیبانی با تیم مهندس من."
    />
  );
}
