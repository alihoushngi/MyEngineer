import { redirect } from "next/navigation";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { InfoIcon } from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import {
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";

export const metadata = userAccountMetadata(userAccountPageTitles.conversation);
export const dynamic = "force-dynamic";

type StartConversationRouteProps = {
  searchParams: Promise<{ expertId?: string | string[] }>;
};

export default async function StartConversationRoute({
  searchParams,
}: StartConversationRouteProps) {
  const expertId = firstQueryValue((await searchParams).expertId).trim();

  if (expertId === "") {
    redirect(userAccountPaths.messages);
  }

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title="گفتگوی مستقیم فعال نیست"
        description="در نسخهٔ فعلی API، پیام خصوصی با متخصص وجود ندارد. از پشتیبانی استفاده کنید."
      />

      <Alert variant="info" className="rounded-2xl">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>تغییر مسیر ارتباط</AlertTitle>
        <AlertDescription>
          به‌جای چت مستقیم، یک تیکت پشتیبانی ثبت کنید تا تیم پیگیری کند.
        </AlertDescription>
      </Alert>

      <Button asChild className="min-h-11 self-start">
        <Link href={`${userAccountPaths.messages}/new`}>ثبت تیکت پشتیبانی</Link>
      </Button>
    </div>
  );
}

function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}
