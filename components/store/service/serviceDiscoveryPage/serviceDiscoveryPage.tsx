import { Suspense } from "react";

import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { ServiceDiscoveryHero } from "@/components/store/service/serviceDiscoveryHero/serviceDiscoveryHero";
import { ServiceExpertMarketplace } from "@/components/store/service/serviceExpertMarketplace/serviceExpertMarketplace";
import { ServiceProcessSection } from "@/components/store/service/serviceProcessSection/serviceProcessSection";
import { ServiceRelatedSection } from "@/components/store/service/serviceRelatedSection/serviceRelatedSection";
import { ServiceRequestCta } from "@/components/store/service/serviceRequestCta/serviceRequestCta";
import { ServiceScopeSection } from "@/components/store/service/serviceScopeSection/serviceScopeSection";
import { ServiceSuggestedExperts } from "@/components/store/service/serviceSuggestedExperts/serviceSuggestedExperts";

import {
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";

import {
  type FilterOption,
  type ServiceFilterValues,
} from "@/lib/service/service-query/service-query";
import { type ProfessionalsPage } from "@/services/expert-service/expert-service";
import { type City } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceDiscoveryPageProps = {
  service: ServiceCategory;
  detail: ServiceDetailData;
  cities: readonly City[];
  isUserAuthenticated?: boolean;
  listing: ProfessionalsPage;
  filters: ServiceFilterValues;
  disciplines: readonly FilterOption[];
  hasPreferredFallback: boolean;
};

export function ServiceDiscoveryPage({
  service,
  detail,
  cities,
  isUserAuthenticated = false,
  listing,
  filters,
  disciplines,
  hasPreferredFallback,
}: ServiceDiscoveryPageProps) {
  const suggestedExperts = detail.showSuggestedExperts
    ? detail.experts.filter((expert) => expert.isVerified).slice(0, 3)
    : [];

  // The live catalog can contain more services than the six client references.
  // Keep their existing presentation unless a reference can be identified.
  const referenceName = `${service.slug} ${service.label}`;
  const hasMobileReference =
    /land-surveying|construction-workers|drawing|interior-design|building-permit|(?:construction-)?administrative-services|construction-admin-services|نقشه.?بردار|استادکار|پیمانکار|ترسیم نقشه|طراحی (?:نما|داخلی)|پروانه ساخت|پایان کار|خدمات اداری/.test(
      referenceName,
    );
  const scopeFirst =
    /interior-design|building-permit|(?:construction-)?administrative-services|construction-admin-services|طراحی (?:نما|داخلی)|پروانه ساخت|پایان کار|خدمات اداری/.test(
      referenceName,
    );
  const showCategoryNavigation =
    /construction-workers|drawing|استادکار|پیمانکار|ترسیم نقشه/.test(
      referenceName,
    );
  const scope = (
    <ServiceScopeSection detail={detail} alignMobile={hasMobileReference} />
  );
  const suggested =
    suggestedExperts.length > 0 ? (
      <ServiceSuggestedExperts experts={suggestedExperts} />
    ) : null;
  const request = (
    <ServiceRequestCta
      slug={service.slug}
      experts={detail.experts}
      cities={cities}
      isUserAuthenticated={isUserAuthenticated}
    />
  );
  const process = <ServiceProcessSection detail={detail} />;
  const faq =
    detail.faqs.length > 0 ? (
      <section className="bg-secondary-subtle py-section">
        <div className="container-narrow">
          <p className="type-label text-secondary">
            {serviceDiscoveryCopy.faqLabel}
          </p>
          <h2 className="mt-3 type-h1 text-foreground">
            {serviceDiscoveryCopy.faqTitle}
          </h2>

          <div className="mt-7 rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs sm:p-6">
            <FaqAccordion items={detail.faqs} />
          </div>
        </div>
      </section>
    ) : null;
  const marketplace = (
    <Suspense
      fallback={
        <div
          className="container-app grid gap-4 py-section md:grid-cols-2 xl:grid-cols-3"
          aria-label="در حال آماده‌سازی فهرست متخصصان"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-3xl border border-border-subtle bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      }
    >
      <ServiceExpertMarketplace
        slug={service.slug}
        experts={listing.experts}
        total={listing.total}
        page={listing.page}
        pageCount={listing.pageCount}
        loadFailed={listing.failed}
        filters={filters}
        cities={cities}
        skills={detail.specialties.map((item) => ({
          id: item.id,
          label: item.title,
        }))}
        disciplines={disciplines}
        hasPreferredFallback={hasPreferredFallback}
        alignment={
          hasMobileReference
            ? {
                scope,
                suggested,
                request,
                process,
                faq,
                scopeFirst,
                showCategoryNavigation,
              }
            : undefined
        }
      />
    </Suspense>
  );

  if (hasMobileReference) {
    return (
      <>
        <ServiceDiscoveryHero service={service} detail={detail} alignMobile />
        {marketplace}
        <ServiceRelatedSection service={service} />
      </>
    );
  }

  return (
    <>
      <ServiceDiscoveryHero service={service} detail={detail} />

      {scope}

      <section className="bg-background-subtle py-section">
        <div className="container-app space-y-10">
          {suggested}
          <div className="flex justify-end">{request}</div>
          {marketplace}
        </div>
      </section>

      {process}
      {faq}

      <ServiceRelatedSection service={service} />
    </>
  );
}
