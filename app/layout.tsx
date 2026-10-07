import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import { PwaRegistration } from "@/components/common/pwaRegistration/pwaRegistration";
import { AppProvider } from "@/providers/app-provider/app-provider";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { siteConfig } from "@/config/site.config/site.config";
import { kalameh } from "@/lib/fonts/kalameh/kalameh";
import "@/css/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: homeHeroCopy.description,
  applicationName: siteConfig.name,
  // Test server: keep out of search engines. Remove when going live.
  robots: { index: false, follow: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#24313E",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className={kalameh.variable}>
      <body className={kalameh.className}>
        <AppProvider>{children}</AppProvider>
        <PwaRegistration />
      </body>
    </html>
  );
}
