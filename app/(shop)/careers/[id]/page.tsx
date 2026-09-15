import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { CareerApplyForm } from "@/components/store/content/careerApplyForm/careerApplyForm";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { getCareer } from "@/services/content-service/content-service";
import { stripHtml } from "@/lib/api/strip-html/strip-html";

type CareerDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CareerDetailRouteProps): Promise<Metadata> {
  const { id } = await params;
  const career = await getCareer(id).catch(() => null);
  if (!career) {
    return { title: "فرصت شغلی" };
  }
  return {
    title: career.title,
    description: stripHtml(career.descriptionHtml).slice(0, 160),
  };
}

export default async function CareerDetailRoutePage({
  params,
}: CareerDetailRouteProps) {
  const { id } = await params;
  const career = await getCareer(id);

  if (!career) {
    notFound();
  }

  return (
    <div className="pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "فرصت‌های شغلی", href: storePaths.careers },
            { label: career.title },
          ]}
        />
      </div>

      <article className="container-app max-w-3xl">
        {career.imageSrc ? (
          <div className="relative mb-8 aspect-16/9 overflow-hidden rounded-3xl bg-surface-subtle">
            <Image
              src={career.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 48rem, 100vw"
              priority
            />
          </div>
        ) : null}

        <p className="type-caption font-semibold text-primary">
          {career.typeLabel}
        </p>
        <h1 className="mt-3 type-h1 text-foreground">{career.title}</h1>
        <p className="mt-3 type-body-sm text-foreground-muted">
          {[career.provinceLabel, career.cityLabel].filter(Boolean).join(" · ")}
          {career.salaryLabel ? ` · ${career.salaryLabel}` : ""}
        </p>

        <div
          className="prose-store mt-8 type-body leading-loose text-foreground"
          dangerouslySetInnerHTML={{ __html: career.descriptionHtml }}
        />

        <CareerApplyForm careerId={career.id} careerTitle={career.title} />
      </article>
    </div>
  );
}
