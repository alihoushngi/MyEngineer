"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { clearMockRegistrationWizard } from "@/lib/registration/mock-wizard-storage/mock-wizard-storage";
import { resetWizardStore } from "@/lib/registration/mock-wizard-store/mock-wizard-store";
import { logoutEngineer } from "@/services/engineer-auth-service/engineer-auth-service";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { siteConfig } from "@/config/site.config/site.config";

export function useEngineerLogout() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(logoutEngineer);

  async function logout() {
    setError(null);

    try {
      await mutation.mutateAsync();
      clearMockRegistrationWizard();
      resetWizardStore();
      router.replace(siteConfig.homeHref);
      router.refresh();
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.logoutUnavailable));
    }
  }

  return {
    logout,
    error,
    isPending: mutation.isPending,
  };
}
