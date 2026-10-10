import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDiscoveryPage } from "@/components/store/service/serviceDiscoveryPage/serviceDiscoveryPage";
import { readPreferredCitiesFromRequest } from "@/lib/city/preferred-city-server/preferred-city-server";
import {
  ALL_FILTER,
  buildProfessionalsQuery,
  hasActiveServiceFilters,
  parseServiceFilterParams,
} from "@/lib/service/service-query/service-query";
import { listBackendFields } from "@/services/lookup-service/lookup-service";
import { searchProfessionals } from "@/services/expert-service/expert-service";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import {
  getServiceCategoryBySlug,
  getServiceDetail,
  listCatalogCities,
} from "@/services/catalog-service/catalog-service";
import { isUserAuthenticated } from "@/services/user-auth-service/user-access-service";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
  searchParams,
}: ServicePageProps): Promise<Metadata> {
  const [{ slug }, rawSearchParams] = await Promise.all([params, searchParams]);
  const service = await getServiceCategoryBySlug(decodeURIComponent(slug));

  if (!service) {
    return notFoundMetadata;
  }

  const query = parseServiceFilterParams(rawSearchParams);
  const isFilteredPage =
    query.page > 1 ||
    hasActiveServiceFilters(query.filters) ||
    query.filters.sort !== ALL_FILTER;

  return {
    title: service.label,
    description: service.description,
    alternates: {
      canonical: service.href,
    },
    ...(isFilteredPage ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: service.label,
      description: service.description,
      url: service.href,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
      ...(service.imageSrc
        ? { images: [{ url: service.imageSrc, alt: service.label }] }
        : {}),
    },
  };
}

export default async function ServiceRoutePage({
  params,
  searchParams,
}: ServicePageProps) {
  const [{ slug: rawSlug }, rawSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const slug = decodeURIComponent(rawSlug);
  const service = await getServiceCategoryBySlug(slug);

  if (!service) {
    notFound();
  }

  const query = parseServiceFilterParams(rawSearchParams);
  const preferredCities = await readPreferredCitiesFromRequest();
  const usePreferred = !query.citiesExplicit && preferredCities.length > 0;
  const filters = usePreferred
    ? { ...query.filters, cities: preferredCities.map((city) => city.id) }
    : query.filters;

  const [detail, cities, userAuthenticated, listing, fields] =
    await Promise.all([
      getServiceDetail(service.slug),
      listCatalogCities(),
      isUserAuthenticated(),
      searchProfessionals(
        buildProfessionalsQuery(filters, query.page, {
          serviceId: service.id,
        }),
      ),
      listBackendFields().catch(() => []),
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
      listing={listing}
      filters={filters}
      disciplines={fields}
      hasPreferredFallback={preferredCities.length > 0}
    />
  );
}
