import { TicketInboxPage } from "@/components/store/tickets/ticketInboxPage/ticketInboxPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";
import { listTicketRooms } from "@/services/ticket-service/ticket-service";

export const metadata = userAccountMetadata(userAccountPageTitles.messages);
export const dynamic = "force-dynamic";

export default async function AccountMessagesRoute() {
  const access = await getUserAccess();
  if (access.kind !== "authenticated") {
    return null;
  }

  const tickets = await listTicketRooms().catch(() => []);
  return <TicketInboxPage tickets={tickets} />;
}
