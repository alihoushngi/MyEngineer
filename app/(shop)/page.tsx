import { type Metadata } from "next";
import { HomePage } from "@/components/store/home/homePage/homePage";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { getHomeCatalog } from "@/services/catalog-service/catalog-service";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: homeHeroCopy.description,
  alternates: {
    canonical: storePaths.home,
  },
};

export default async function ShopHomePage() {
  const [catalog, session] = await Promise.all([
    getHomeCatalog(),
    getUserSession().catch(() => null),
  ]);
  return (
    <HomePage
      catalog={catalog}
      isAuthenticated={Boolean(session)}
      userName={session?.profile?.displayName}
    />
  );
}
