import { notFound } from "next/navigation";
import { TicketDetailPage } from "@/components/store/tickets/ticketDetailPage/ticketDetailPage";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";
import { getTicketRoom } from "@/services/ticket-service/ticket-service";
import { getCurrentProfile } from "@/services/profile-service/profile-service";

type AccountSupportTicketRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = userAccountMetadata("تیکت پشتیبانی");
export const dynamic = "force-dynamic";

export default async function AccountSupportTicketRoute({
  params,
}: AccountSupportTicketRouteProps) {
  const access = await getUserAccess();
  if (access.kind !== "authenticated") {
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

  return <TicketDetailPage room={room} currentUserId={profile?.id} />;
}
