import { CreateTicketForm } from "@/components/store/tickets/createTicketForm/createTicketForm";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";

export const metadata = userAccountMetadata(userAccountPageTitles.messages);
export const dynamic = "force-dynamic";

export default async function AccountNewTicketRoute() {
  const access = await getUserAccess();
  if (access.kind !== "authenticated") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title="تیکت جدید"
        description="پیام شما برای پشتیبانی ثبت می‌شود."
      />
      <CreateTicketForm />
    </div>
  );
}
