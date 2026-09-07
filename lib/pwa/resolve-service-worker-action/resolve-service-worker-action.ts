type ServiceWorkerRegistrationContext = {
  nodeEnv: string;
  hasServiceWorker: boolean;
  isSecureContext: boolean;
  hostname: string;
};

export type ServiceWorkerAction = "register" | "unregister" | "none";

function isLocalhost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function resolveServiceWorkerAction({
  nodeEnv,
  hasServiceWorker,
  isSecureContext,
  hostname,
}: ServiceWorkerRegistrationContext): ServiceWorkerAction {
  if (!hasServiceWorker) {
    return "none";
  }

  if (nodeEnv !== "production") {
    return "unregister";
  }

  if (!isSecureContext && !isLocalhost(hostname)) {
    return "none";
  }

  return "register";
}
