import { UnifiedLoginForm } from "@/components/store/auth/unifiedLoginForm/unifiedLoginForm";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { userAuthPaths } from "@/config/user-auth.config/user-auth.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";

export const metadata: Metadata = {
  title: engineerLoginCopy.title,
  robots: { index: false, follow: false },
};

type EngineerLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function EngineerLoginPage({
  searchParams,
}: EngineerLoginPageProps) {
  const [engineerSession, userSession] = await Promise.all([
    getEngineerSession(),
    getUserSession(),
  ]);
  const params = await searchParams;
  const nextPath = getSafeEngineerNext(params.next);

  if (engineerSession) {
    redirect(nextPath);
  }

  if (userSession) {
    redirect(userAuthPaths.account);
  }

  return (
    <UnifiedLoginForm
      audience="engineer"
      nextPath={
        nextPath.startsWith("/engineer")
          ? nextPath
          : engineerPanelPaths.dashboard
      }
      title={engineerLoginCopy.title}
      description="ورود به پنل متخصص با کد ملی و رمز عبور. ثبت‌نام مهندس از مسیر جداگانهٔ ثبت‌نام متخصص انجام می‌شود."
    />
  );
}
