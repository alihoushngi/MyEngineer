import { notFound } from "next/navigation";
import { TicketDetailPage } from "@/components/store/tickets/ticketDetailPage/ticketDetailPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerAccess } from "@/services/engineer-service/engineer-access-service";
import { getCurrentProfile } from "@/services/profile-service/profile-service";
import { getTicketRoom } from "@/services/ticket-service/ticket-service";

type EngineerTicketRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = engineerPageMetadata(engineerPageTitles.conversation);
export const dynamic = "force-dynamic";

export default async function EngineerTicketRoute({
  params,
}: EngineerTicketRouteProps) {
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
      backHref={engineerPanelPaths.messages}
    />
  );
}
