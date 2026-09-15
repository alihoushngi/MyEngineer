import Image from "next/image";

import {
  type BrandCard,
  type TeamMemberCard,
} from "@/services/content-service/content-service";

type AboutTeamSectionProps = {
  members: readonly TeamMemberCard[];
};

export function AboutTeamSection({ members }: AboutTeamSectionProps) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="container-app py-section">
      <div className="max-w-xl">
        <p className="type-caption font-semibold text-primary">تیم</p>
        <h2 className="mt-3 type-h1 text-foreground">افراد پشت مهندس من</h2>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li
            key={member.id}
            className="overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-xs"
          >
            <div className="relative aspect-square bg-surface-subtle">
              {member.imageSrc ? (
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="type-h4 text-foreground">{member.name}</h3>
              <p className="mt-1 type-caption text-foreground-muted">
                {member.position}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

type AboutBrandsSectionProps = {
  brands: readonly BrandCard[];
};

export function AboutBrandsSection({ brands }: AboutBrandsSectionProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-border-subtle bg-surface-subtle py-section">
      <div className="container-app">
        <div className="max-w-xl">
          <p className="type-caption font-semibold text-secondary">همکاران</p>
          <h2 className="mt-3 type-h1 text-foreground">برندهایی که کنار ما هستند</h2>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => {
            const content = (
              <span className="flex h-24 items-center justify-center rounded-2xl border border-border-subtle bg-surface px-3 shadow-xs">
                {brand.imageSrc ? (
                  <span className="relative h-12 w-full">
                    <Image
                      src={brand.imageSrc}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="140px"
                    />
                  </span>
                ) : (
                  <span className="type-caption font-medium text-foreground">
                    {brand.name}
                  </span>
                )}
              </span>
            );

            return (
              <li key={brand.id}>
                {brand.href ? (
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
