"use client";

import { useEffect } from "react";

import { resolveServiceWorkerAction } from "@/lib/pwa/resolve-service-worker-action/resolve-service-worker-action";

const CACHE_PREFIX = "mohandes-man-";

async function unregisterStaleServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations.map((registration) => registration.unregister()),
  );

  if (!("caches" in window)) {
    return;
  }

  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name.startsWith(CACHE_PREFIX))
      .map((name) => caches.delete(name)),
  );
}

export function PwaRegistration() {
  useEffect(() => {
    const action = resolveServiceWorkerAction({
      nodeEnv: process.env.NODE_ENV,
      hasServiceWorker: "serviceWorker" in navigator,
      isSecureContext: window.isSecureContext,
      hostname: window.location.hostname,
    });

    if (action === "none") {
      return;
    }

    if (action === "unregister") {
      void unregisterStaleServiceWorkers();
      return;
    }

    let registration: ServiceWorkerRegistration | undefined;
    let disposed = false;

    async function register() {
      try {
        const nextRegistration = await navigator.serviceWorker.register(
          "/sw.js",
          {
            scope: "/",
            updateViaCache: "none",
          },
        );

        if (disposed) {
          return;
        }

        registration = nextRegistration;
        await registration.update();
      } catch {
        // Progressive enhancement: registration failure must not break the app.
      }
    }

    void register();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void registration?.update();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
