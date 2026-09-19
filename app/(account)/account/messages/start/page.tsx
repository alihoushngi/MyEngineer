import { redirect } from "next/navigation";
import { StartConversationRedirect } from "@/components/store/messaging/startConversationRedirect/startConversationRedirect";
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

  return <StartConversationRedirect expertId={expertId} />;
}

function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}
