import Link from "next/link";
import { ArrowLeftIcon, BriefcaseBusinessIcon, MapPinIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStatusBadges } from "@/components/store/expert/expertStatusBadges/expertStatusBadges";
import {
  expertCardCopy,
  expertProfileCopy,
} from "@/config/experts.config/experts.config";
import { getExpertInitials } from "@/lib/experts/expert-profile/expert-profile";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type ExpertCardData } from "@/types/store/expert.types";

type ExpertCardProps = {
  expert: ExpertCardData;
  className?: string;
};

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const specialties = expert.specialties ?? [];

  return (
    <article className={cn("h-full", className)}>
      <Link
        href={expert.href}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs outline-none transition-all duration-200 ease-in-out before:pointer-events-none before:absolute before:-inset-e-20 before:-top-20 before:size-40 before:rounded-full before:bg-primary/0 before:blur-3xl before:transition-all before:duration-200 before:ease-in-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md hover:before:scale-125 hover:before:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none sm:p-5 lg:p-6"
      >
        <div className="relative z-10 flex min-w-0 items-start gap-4">
          <Avatar
            size="xl"
            className="size-16 rounded-2xl border-border-subtle shadow-sm"
          >
            {expert.avatarSrc ? (
              <AvatarImage src={expert.avatarSrc} alt="" />
            ) : null}
            <AvatarFallback className="rounded-2xl bg-primary-subtle type-h4 text-primary">
              {getExpertInitials(expert.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="truncate type-h3 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
              {expert.name}
            </h3>
            <p className="mt-1 truncate type-body-sm text-foreground-muted">
              {expert.profession}
            </p>
            <div className="mt-2">
              <ExpertStatusBadges
                isVerified={expert.isVerified}
                isActive={expert.isActive}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 type-body-sm text-foreground-muted">
          {expert.city ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              {expert.city}
            </span>
          ) : null}

          {typeof expert.experienceYears === "number" ? (
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseBusinessIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-foreground-subtle"
              />
              {formatFaNumber(expert.experienceYears)}{" "}
              {expertProfileCopy.yearsSuffix}
            </span>
          ) : null}

          {typeof expert.rating === "number" ? (
            <ExpertRating
              rating={expert.rating}
              reviewCount={expert.reviewCount}
            />
          ) : null}
        </div>

        {specialties.length > 0 ? (
          <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5">
            {specialties.slice(0, 3).map((specialty) => (
              <li
                key={specialty}
                className="inline-flex min-h-7 items-center rounded-full border border-border-subtle bg-surface-muted px-2.5 py-1 type-caption text-foreground-muted"
              >
                {specialty}
              </li>
            ))}
            {specialties.length > 3 ? (
              <li className="inline-flex min-h-7 items-center rounded-full border border-primary/10 bg-primary-subtle px-2.5 py-1 type-caption font-medium text-primary">
                +{formatFaNumber(specialties.length - 3)}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="relative z-10 mt-auto flex min-h-12 items-center justify-between gap-3 border-t border-border-subtle pt-4 type-button text-primary">
          <span>{expertCardCopy.profileCta}</span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none">
            <ArrowLeftIcon
              aria-hidden="true"
              className="size-4 ltr:rotate-180"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
