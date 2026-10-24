import { type Metadata } from "next";
import { HomePage } from "@/components/store/home/homePage/homePage";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import {
  getDrawingConsultationPreview,
  parseDrawingConsultationPreviewMode,
} from "@/lib/home/drawing-consultation-preview/drawing-consultation-preview";
import {
  getPopularServicesPreview,
  parsePopularServicesPreviewMode,
} from "@/lib/home/popular-services-preview/popular-services-preview";
import { getHomeCatalog } from "@/services/catalog-service/catalog-service";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: homeHeroCopy.description,
  alternates: {
    canonical: storePaths.home,
  },
  openGraph: {
    title: siteConfig.name,
    description: homeHeroCopy.description,
    url: storePaths.home,
    type: "website",
    locale: "fa_IR",
  },
};

type ShopHomePageProps = {
  searchParams: Promise<{
    drawingData?: string | string[];
    popularData?: string | string[];
  }>;
};

export default async function ShopHomePage({
  searchParams,
}: ShopHomePageProps) {
  const params = await searchParams;
  const previewMode = parsePopularServicesPreviewMode(params.popularData);
  const drawingPreviewMode = parseDrawingConsultationPreviewMode(
    params.drawingData,
  );
  const [catalog, session] = await Promise.all([
    getHomeCatalog(),
    getUserSession().catch(() => null),
  ]);
  const visibleCatalog =
    process.env.NODE_ENV === "development"
      ? {
          ...catalog,
          popularServices: getPopularServicesPreview(
            catalog.popularServices,
            previewMode,
          ),
          drawingServices: getDrawingConsultationPreview(
            catalog.drawingServices,
            drawingPreviewMode,
          ),
        }
      : catalog;
  return (
    <HomePage
      catalog={visibleCatalog}
      isAuthenticated={Boolean(session)}
      userName={session?.profile?.displayName}
      popularServicesPreviewMode={
        process.env.NODE_ENV === "development" ? previewMode : undefined
      }
      drawingConsultationPreviewMode={
        process.env.NODE_ENV === "development" ? drawingPreviewMode : undefined
      }
    />
  );
}
