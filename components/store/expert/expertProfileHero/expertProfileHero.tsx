import { BriefcaseBusinessIcon, EyeIcon, MapPinIcon } from "lucide-react";
import { ExpertAvatarPreview } from "@/components/store/expert/expertAvatarPreview/expertAvatarPreview";
import { ExpertProfileToolbar } from "@/components/store/expert/expertProfileToolbar/expertProfileToolbar";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  getExpertInitials,
  getPrimaryDegree,
  getReviewCount,
} from "@/lib/experts/expert-profile/expert-profile";
import { type ExpertProfile } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type ExpertProfileHeroProps = {
  expert: ExpertProfile;
  expertOption: RequestExpertOption;
  cities: readonly City[];
  isUserAuthenticated?: boolean;
  isSaved?: boolean;
};

export function ExpertProfileHero({
  expert,
  expertOption,
  cities,
  isUserAuthenticated = false,
  isSaved = false,
}: ExpertProfileHeroProps) {
  const initials = getExpertInitials(expert.name);
  const reviewCount = getReviewCount(expert);
  const degree = getPrimaryDegree(expert.education);
  const competencies = expert.license?.competencies ?? [];

  return (
    <header className="relative isolate overflow-hidden border-y border-primary-deep-foreground/10 bg-primary-deep text-primary-deep-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-36 -top-36 -z-10 size-96 rounded-full bg-primary/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 inset-e-0 -z-10 size-112 rounded-full bg-secondary/10 blur-[150px]"
      />

      <div className="container-app py-8 sm:py-10 lg:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 type-caption text-primary-deep-foreground/55">
          {typeof expert.viewCount === "number" ? (
            <p className="inline-flex items-center gap-2">
              <EyeIcon aria-hidden="true" className="size-4" />
              {formatFaNumber(expert.viewCount)} {expertProfileCopy.viewsLabel}
            </p>
          ) : (
            <span />
          )}

          <ExpertStatusBadges
            isVerified={expert.isVerified}
            isActive={expert.isActive}
            className="**:data-[slot=badge]:border-primary-deep-foreground/15 **:data-[slot=badge]:bg-primary-deep-foreground/10 **:data-[slot=badge]:text-primary-deep-foreground"
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
            <ExpertAvatarPreview
              name={expert.name}
              initials={initials}
              avatarSrc={expert.avatarSrc}
            />

            <div className="min-w-0">
              <h1 className="wrap-break-word type-h1 text-primary-deep-foreground">
                {expert.name}
              </h1>

              <p className="mt-2 type-body-lg text-primary-deep-foreground/70">
                {expert.profession}
                {degree ? ` · ${degree}` : ""}
              </p>

              {expert.license?.title ? (
                <p className="mt-4 type-body-sm leading-relaxed text-primary-deep-foreground/60">
                  {expert.license.title}
                  {competencies.length > 0
                    ? ` · ${competencies.join("، ")}`
                    : ""}
                </p>
              ) : null}

              {expert.organizationMembership?.label ? (
                <p className="mt-1 type-body-sm text-primary-deep-foreground/60">
                  {expert.organizationMembership.label}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 type-body-sm text-primary-deep-foreground/65">
                {typeof expert.experienceYears === "number" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusinessIcon
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {formatFaNumber(expert.experienceYears)}{" "}
                    {expertProfileCopy.yearsSuffix}
                  </span>
                ) : null}

                {expert.city ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {expert.city}
                  </span>
                ) : null}
              </div>

              {typeof expert.rating === "number" ? (
                <ExpertRating
                  rating={expert.rating}
                  reviewCount={reviewCount}
                  className="mt-4 text-primary-deep-foreground/75"
                />
              ) : null}

              <p className="mt-4 type-body font-medium text-primary-deep-foreground">
                {expertProfileCopy.freeContactCta}
              </p>
            </div>
          </div>

          <ExpertProfileToolbar
            expert={expert}
            expertOption={expertOption}
            cities={cities}
            isUserAuthenticated={isUserAuthenticated}
            isSaved={isSaved}
          />
        </div>
      </div>
    </header>
  );
}
