import { UnifiedLoginForm } from "@/components/store/auth/unifiedLoginForm/unifiedLoginForm";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

export const metadata: Metadata = {
  title: userAuthCopy.loginTitle,
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function UserLoginPage({ searchParams }: LoginPageProps) {
  const [userSession, engineerSession] = await Promise.all([
    getUserSession(),
    getEngineerSession(),
  ]);
  const params = await searchParams;
  const nextPath = getSafeUserNext(params.next);

  if (userSession) {
    redirect(nextPath);
  }

  if (engineerSession) {
    redirect(engineerPanelPaths.dashboard);
  }

  return (
    <UnifiedLoginForm
      audience="user"
      nextPath={nextPath}
      title="ورود کاربر"
      description="برای حساب کاربری عادی با کد ملی و رمز عبور وارد شوید. ورود متخصص مسیر جداگانه‌ای دارد."
    />
  );
}
