import { CreateTicketForm } from "@/components/store/tickets/createTicketForm/createTicketForm";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getEngineerAccess } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata("تیکت جدید");
export const dynamic = "force-dynamic";

export default async function EngineerNewSupportTicketRoute() {
  const access = await getEngineerAccess();
  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title="تیکت جدید"
        description="پیام شما برای پشتیبانی ثبت می‌شود."
      />
      <CreateTicketForm redirectBase="/engineer/support" />
    </div>
  );
}
