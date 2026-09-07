import { InfoIcon } from "lucide-react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ExpertAbout } from "@/components/store/expert/expertAbout/expertAbout";
import { ExpertCertificates } from "@/components/store/expert/expertCertificates/expertCertificates";
import { ExpertContactCta } from "@/components/store/expert/expertContactCta/expertContactCta";
import { ExpertExperience } from "@/components/store/expert/expertExperience/expertExperience";
import { ExpertPortfolio } from "@/components/store/expert/expertPortfolio/expertPortfolio";
import { ExpertProfessionalInfo } from "@/components/store/expert/expertProfessionalInfo/expertProfessionalInfo";
import { ExpertProfileHero } from "@/components/store/expert/expertProfileHero/expertProfileHero";
import { ExpertQuickFacts } from "@/components/store/expert/expertQuickFacts/expertQuickFacts";
import { ExpertReviews } from "@/components/store/expert/expertReviews/expertReviews";
import { ExpertSpecialties } from "@/components/store/expert/expertSpecialties/expertSpecialties";
import { ExpertStickyContactBar } from "@/components/store/expert/expertStickyContactBar/expertStickyContactBar";
import { ExpertTagSection } from "@/components/store/expert/expertTagSection/expertTagSection";
import { RelatedExperts } from "@/components/store/expert/relatedExperts/relatedExperts";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { siteConfig } from "@/config/site.config/site.config";
import {
  hasItems,
  hasPublicContact,
  hasText,
} from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type ExpertProfilePageProps = {
  expert: ExpertProfile;
  expertOption: RequestExpertOption;
  cities: readonly City[];
  isDevelopmentPreview?: boolean;
  isUserAuthenticated?: boolean;
  isSaved?: boolean;
  eligibleReviewRequestId?: string;
};

export function ExpertProfilePage({
  expert,
  expertOption,
  cities,
  isDevelopmentPreview = false,
  isUserAuthenticated = false,
  isSaved = false,
  eligibleReviewRequestId,
}: ExpertProfilePageProps) {
  const hasStickyContact = hasPublicContact(expert);

  return (
    <div
      className={
        hasStickyContact
          ? "pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-0"
          : undefined
      }
    >
      <div className="container-app py-5 sm:py-6">
        <StoreBreadcrumb
          items={[
            {
              label: expertProfileCopy.breadcrumbHome,
              href: siteConfig.homeHref,
            },
            { label: expertProfileCopy.breadcrumbExperts },
            { label: expert.name },
          ]}
        />
      </div>

      {isDevelopmentPreview ? (
        <div className="container-app pb-6">
          <Alert variant="warning" className="rounded-2xl">
            <InfoIcon aria-hidden="true" />
            <AlertTitle>{expertProfileCopy.developmentPreviewTitle}</AlertTitle>
            <AlertDescription>
              {expertProfileCopy.developmentPreviewDescription}
            </AlertDescription>
          </Alert>
        </div>
      ) : null}

      <ExpertProfileHero
        expert={expert}
        expertOption={expertOption}
        cities={cities}
        isUserAuthenticated={isUserAuthenticated}
        isSaved={isSaved}
      />

      <div className="container-app grid items-start gap-10 py-page lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="min-w-0 divide-y divide-border-subtle">
          {hasText(expert.about) ? <ExpertAbout about={expert.about} /> : null}
          {hasItems(expert.specialties) ? (
            <ExpertSpecialties specialties={expert.specialties} />
          ) : null}
          <ExpertProfessionalInfo expert={expert} />
          {hasText(expert.history) ? (
            <ExpertExperience history={expert.history} />
          ) : null}
          {hasItems(expert.certificates) ? (
            <ExpertCertificates certificates={expert.certificates} />
          ) : null}
          {hasItems(expert.serviceCities) ? (
            <ExpertTagSection
              title={expertProfileCopy.citiesTitle}
              titleId="expert-cities-heading"
              items={expert.serviceCities}
            />
          ) : null}
          {hasItems(expert.software) ? (
            <ExpertTagSection
              title={expertProfileCopy.softwareTitle}
              titleId="expert-software-heading"
              items={expert.software}
            />
          ) : null}
          {hasItems(expert.portfolio) ? (
            <ExpertPortfolio items={expert.portfolio} />
          ) : null}
          {hasItems(expert.reviews) ||
          typeof expert.rating === "number" ||
          typeof expert.reviewCount === "number" ? (
            <ExpertReviews
              expertName={expert.name}
              reviews={expert.reviews}
              rating={expert.rating}
              reviewCount={expert.reviewCount}
              eligibleRequestId={eligibleReviewRequestId}
            />
          ) : null}
        </div>

        <aside className="min-w-0 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm lg:sticky lg:top-24 lg:p-6">
          <ExpertQuickFacts expert={expert} />
          <ExpertContactCta expert={expert} />
        </aside>
      </div>

      <RelatedExperts experts={expert.relatedExperts} excludeId={expert.id} />
      <ExpertStickyContactBar expert={expert} />
    </div>
  );
}
