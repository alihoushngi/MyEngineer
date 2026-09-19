import { TicketInboxPage } from "@/components/store/tickets/ticketInboxPage/ticketInboxPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerAccess } from "@/services/engineer-service/engineer-access-service";
import { listTicketRooms } from "@/services/ticket-service/ticket-service";

export const metadata = engineerPageMetadata("پشتیبانی");
export const dynamic = "force-dynamic";

export default async function EngineerSupportRoute() {
  const access = await getEngineerAccess();
  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  const tickets = await listTicketRooms("/engineer/support").catch(() => []);

  return (
    <TicketInboxPage
      tickets={tickets}
      createHref="/engineer/support/new"
      title="پشتیبانی"
      description="تیکت‌های پشتیبانی پنل متخصص."
    />
  );
}
