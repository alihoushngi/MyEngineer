import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDiscoveryPage } from "@/components/store/service/serviceDiscoveryPage/serviceDiscoveryPage";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import {
  getServiceCategoryBySlug,
  getServiceDetail,
  listCatalogCities,
} from "@/services/catalog-service/catalog-service";
import { isUserAuthenticated } from "@/services/user-auth-service/user-access-service";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceCategoryBySlug(decodeURIComponent(slug));

  if (!service) {
    return notFoundMetadata;
  }

  return {
    title: service.label,
    description: service.description,
    alternates: {
      canonical: service.href,
    },
  };
}

export default async function ServiceRoutePage({ params }: ServicePageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const service = await getServiceCategoryBySlug(slug);

  if (!service) {
    notFound();
  }

  const [detail, cities, userAuthenticated] = await Promise.all([
    getServiceDetail(service.slug),
    listCatalogCities(),
    isUserAuthenticated(),
  ]);

  if (!detail) {
    notFound();
  }

  return (
    <ServiceDiscoveryPage
      service={service}
      detail={detail}
      cities={cities}
      isUserAuthenticated={userAuthenticated}
    />
  );
}
