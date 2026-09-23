import { notFound } from "next/navigation";
import { TicketDetailPage } from "@/components/store/tickets/ticketDetailPage/ticketDetailPage";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getEngineerAccess } from "@/services/engineer-service/engineer-access-service";
import { getTicketRoom } from "@/services/ticket-service/ticket-service";
import { getCurrentProfile } from "@/services/profile-service/profile-service";

type EngineerSupportTicketRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = engineerPageMetadata("تیکت پشتیبانی");
export const dynamic = "force-dynamic";

export default async function EngineerSupportTicketRoute({
  params,
}: EngineerSupportTicketRouteProps) {
  const access = await getEngineerAccess();
  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  const { id } = await params;
  const [room, profile] = await Promise.all([
    getTicketRoom(id),
    getCurrentProfile().catch(() => null),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <TicketDetailPage
      room={room}
      currentUserId={profile?.id}
      backHref="/engineer/support"
    />
  );
}
