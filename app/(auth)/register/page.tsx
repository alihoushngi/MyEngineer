import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { UnifiedRegisterForm } from "@/components/store/auth/unifiedRegisterForm/unifiedRegisterForm";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { userAuthPaths } from "@/config/user-auth.config/user-auth.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";

export const metadata: Metadata = {
  title: "ثبت‌نام کاربر",
  robots: { index: false, follow: false },
};

export default async function UserRegisterPage() {
  const [userSession, engineerSession] = await Promise.all([
    getUserSession(),
    getEngineerSession(),
  ]);

  if (userSession) {
    redirect(userAuthPaths.account);
  }
  if (engineerSession) {
    redirect(engineerPanelPaths.dashboard);
  }

  return <UnifiedRegisterForm />;
}
