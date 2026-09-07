"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "lucide-react";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { siteConfig } from "@/config/site.config/site.config";

type RegistrationCompleteViewProps = {
  redirectToPanel: boolean;
};

export function RegistrationCompleteView({
  redirectToPanel,
}: RegistrationCompleteViewProps) {
  const router = useRouter();

  useEffect(() => {
    if (!redirectToPanel) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.replace(engineerPanelPaths.dashboard);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [redirectToPanel, router]);

  return (
    <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center py-4">
      <Empty
        icon={<CheckCircleIcon aria-hidden="true" className="text-success" />}
        title={registrationCopy.completeTitle}
        description={
          redirectToPanel
            ? registrationCopy.completeRedirecting
            : registrationCopy.completeDescription
        }
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={engineerPanelPaths.dashboard}>
                {registrationCopy.completeWorkspaceCta}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={siteConfig.homeHref}>
                {registrationCopy.completeHomeCta}
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
