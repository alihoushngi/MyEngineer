import { storePaths } from "@/config/navigation.config/navigation.config";
import { type ServiceCategory } from "@/config/services.config/services.config";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { stripHtml } from "@/lib/api/strip-html/strip-html";
import {
  type BackendBlog,
  type BackendBlogCategory,
  type BackendCity,
  type BackendEducation,
  type BackendFaq,
  type BackendKnowledge,
  type BackendKnowledgeCategory,
  type BackendPortfolio,
  type BackendProfessionalCard,
  type BackendProfessionalComment,
  type BackendProfessionalDetail,
  type BackendProvince,
  type BackendServiceNode,
  type BackendSlider,
  type BackendTestimonial,
} from "@/types/api/backend.types";
import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";
import {
  type ExpertCardData,
  type ExpertEducation,
  type ExpertPortfolioItem,
  type ExpertProfile,
} from "@/types/store/expert.types";
import {
  type FaqCategory,
  type FaqCategoryDetail,
  type FaqItem,
} from "@/types/store/faq.types";
import { type HomeHeroSlide, type HomeKnowledgeTip } from "@/types/store/home.types";
import {
  type KnowledgeCategoryDetail,
  type KnowledgeTip,
} from "@/types/store/knowledge.types";
import { type City, type Province } from "@/types/store/registration.types";
import { type ExpertReview } from "@/types/store/review.types";
import { type ServiceDetailData } from "@/types/store/service.types";

const ROLE_LABELS: Record<string, string> = {
  engineer: "مهندس",
  consulter: "مشاور",
  consultant: "مشاور",
  insurance: "بیمه",
};

const SERVICE_ACCENTS = [
  "teal",
  "blue",
  "orange",
  "green",
  "violet",
  "rose",
] as const;

export function mapProvince(province: BackendProvince): Province {
  return {
    id: String(province.id),
    name: province.name,
  };
}

export function mapCity(city: BackendCity): City {
  return {
    id: String(city.id),
    name: city.name,
    provinceId: String(city.province_id),
  };
}

export function mapServiceCategory(
  service: BackendServiceNode,
): ServiceCategory {
  const label = service.short_title?.trim() || service.title;
  const description = stripHtml(service.description) || label;

  return {
    slug: service.slug,
    label,
    href: `/services/${service.slug}`,
    description,
    id: service.id,
    imageSrc: resolveMediaUrl(service.image),
  };
}

export function mapServiceTree(
  nodes: readonly BackendServiceNode[],
): readonly ServiceCategory[] {
  return nodes.map(mapServiceCategory);
}

export function findServiceNodeBySlug(
  nodes: readonly BackendServiceNode[],
  slug: string,
): BackendServiceNode | null {
  for (const node of nodes) {
    if (node.slug === slug) {
      return node;
    }

    const child = findServiceNodeBySlug(node.children ?? [], slug);
    if (child) {
      return child;
    }
  }

  return null;
}

export function flattenServiceNodes(
  nodes: readonly BackendServiceNode[],
): readonly BackendServiceNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenServiceNodes(node.children ?? []),
  ]);
}

export function mapSliderToHeroSlide(
  slider: BackendSlider,
  serviceSlug?: string | null,
): HomeHeroSlide {
  const imageSrc =
    resolveMediaUrl(slider.image) ?? "/images/home/hero-construction.png";

  return {
    id: String(slider.id),
    imageSrc,
    imageAlt: slider.alt?.trim() || slider.title,
    headline: slider.title,
    description: slider.alt?.trim() || slider.title,
    ctaLabel: serviceSlug ? "مشاهده خدمت" : "شروع جستجو",
    ctaHref: serviceSlug ? `/services/${serviceSlug}` : "#service-categories",
  };
}

export function mapTestimonial(item: BackendTestimonial) {
  return {
    id: String(item.id),
    quote: stripHtml(item.description) || item.title || "",
    author: item.name?.trim() || "کاربر",
    role: item.title?.trim() || undefined,
  };
}

export function mapProfessionalCard(
  professional: Pick<
    BackendProfessionalCard,
    | "id"
    | "name"
    | "family"
    | "full_name"
    | "image"
    | "role"
    | "working_years"
    | "rating"
    | "rating_count"
  > & {
    city?: string | BackendCity | null;
  },
): ExpertCardData {
  const id = String(professional.id);
  const name =
    professional.full_name?.trim() ||
    [professional.name, professional.family].filter(Boolean).join(" ").trim() ||
    "متخصص";
  const role = professional.role ?? "";
  const profession = ROLE_LABELS[role] ?? "متخصص";
  const experienceYears = toNumber(professional.working_years);
  const cityName =
    typeof professional.city === "string"
      ? professional.city
      : professional.city?.name;

  return {
    id,
    href: `/experts/${id}`,
    name,
    profession,
    avatarSrc: resolveMediaUrl(professional.image),
    city: cityName ?? undefined,
    experienceYears,
    rating: professional.rating ?? undefined,
    reviewCount: professional.rating_count ?? undefined,
    isActive: true,
  };
}

export function mapProfessionalDetail(
  professional: BackendProfessionalDetail,
  portfolios: readonly BackendPortfolio[] = [],
  comments: readonly BackendProfessionalComment[] = [],
  related: readonly ExpertCardData[] = [],
): ExpertProfile {
  const card = mapProfessionalCard(professional);
  const cityName =
    typeof professional.city === "string"
      ? professional.city
      : professional.city?.name;
  const serviceCities = (professional.cities_covered ?? []).map(
    (city) => city.name,
  );
  const specialties = (professional.services ?? []).map(
    (service) => service.short_title || service.title,
  );
  const education = (professional.educations ?? [])
    .map(mapEducation)
    .filter((item): item is ExpertEducation => item !== null);
  const certificates = (professional.certificates ?? []).map((item) => ({
    id: String(item.id),
    title: item.title?.trim() || item.name?.trim() || "گواهی",
    issuer: item.issuer ?? undefined,
  }));
  const portfolio = portfolios.map(mapPortfolio);
  const reviews = comments.map(mapComment).filter(Boolean) as ExpertReview[];
  const phone =
    professional.phone_contact === "1" || professional.phone_contact === 1
      ? professional.mobile ?? undefined
      : undefined;

  return {
    ...card,
    city: cityName ?? card.city,
    shortIntroduction: stripHtml(professional.bio) || undefined,
    about: stripHtml(professional.bio) || undefined,
    specialties: specialties.length > 0 ? specialties : undefined,
    serviceCities: serviceCities.length > 0 ? serviceCities : undefined,
    education: education.length > 0 ? education : undefined,
    certificates: certificates.length > 0 ? certificates : undefined,
    qualifications: (professional.qualifications ?? [])
      .map((item) => item.title || item.name || "")
      .filter(Boolean),
    portfolio: portfolio.length > 0 ? portfolio : undefined,
    reviews: reviews.length > 0 ? reviews : undefined,
    contact: phone ? { phone, sms: phone } : undefined,
    relatedExperts: related.length > 0 ? related : undefined,
  };
}

export function mapBlogCategory(
  category: BackendBlogCategory,
): ArticleCategory {
  return {
    slug: category.slug,
    href: `/articles/categories/${category.slug}`,
    title: category.name,
  };
}

export function mapBlogCard(blog: BackendBlog): ArticleCardData {
  const categorySlug = blog.category?.slug;
  const tags = (blog.tags ?? []).map((tag) => tag.name).filter(Boolean);

  return {
    id: String(blog.id),
    slug: blog.slug,
    href: `/articles/${blog.slug}`,
    title: blog.title,
    excerpt: stripHtml(blog.description) || undefined,
    coverSrc: resolveMediaUrl(blog.image),
    publishedAt: blog.created_at ?? undefined,
    categorySlug,
    categoryLabel: blog.category?.name,
    tags: tags.length > 0 ? tags : undefined,
  };
}

export function mapBlogDetail(blog: BackendBlog): Article {
  return {
    ...mapBlogCard(blog),
    body: blog.description ?? undefined,
    viewCount: toNumber(blog.views),
  };
}

export function mapFaqItem(faq: BackendFaq): FaqItem {
  return {
    id: String(faq.id),
    question: faq.question,
    answer: stripHtml(faq.answer),
  };
}

export function groupFaqsByService(
  faqs: readonly BackendFaq[],
  services: readonly BackendServiceNode[],
): readonly FaqCategoryDetail[] {
  const flatServices = flattenServiceNodes(services);
  const byId = new Map(flatServices.map((service) => [service.id, service]));
  const grouped = new Map<number, BackendFaq[]>();

  for (const faq of faqs) {
    if (!faq.service_id) {
      continue;
    }

    const bucket = grouped.get(faq.service_id) ?? [];
    bucket.push(faq);
    grouped.set(faq.service_id, bucket);
  }

  return [...grouped.entries()]
    .map(([serviceId, items]) => {
      const service = byId.get(serviceId);
      if (!service) {
        return null;
      }

      const category: FaqCategoryDetail = {
        slug: service.slug,
        href: `/faq/${service.slug}`,
        title: service.short_title || service.title,
        description: stripHtml(service.description) || undefined,
        relatedServiceHref: `/services/${service.slug}`,
        relatedServiceLabel: service.short_title || service.title,
        items: items.map(mapFaqItem),
      };

      return category;
    })
    .filter((item): item is FaqCategoryDetail => item !== null)
    .sort((a, b) => a.title.localeCompare(b.title, "fa"));
}

export function toFaqCategorySummary(
  categories: readonly FaqCategoryDetail[],
): readonly FaqCategory[] {
  return categories.map((category) => ({
    slug: category.slug,
    href: category.href,
    title: category.title,
    description: category.description,
    relatedServiceHref: category.relatedServiceHref,
    relatedServiceLabel: category.relatedServiceLabel,
  }));
}

export function mapKnowledgeCategory(
  category: BackendKnowledgeCategory,
  tips: readonly KnowledgeTip[] = [],
): KnowledgeCategoryDetail {
  return {
    slug: category.slug,
    href: `/knowledge/${category.slug}`,
    title: category.name,
    description: category.description ?? undefined,
    tips,
  };
}

export function mapKnowledgeTip(item: BackendKnowledge): KnowledgeTip {
  return {
    id: String(item.id),
    title: item.title,
    body: stripHtml(item.description) || item.title,
  };
}

export function buildKnowledgeCategories(
  categories: readonly BackendKnowledgeCategory[],
  items: readonly BackendKnowledge[],
): readonly KnowledgeCategoryDetail[] {
  return categories.map((category) => {
    const tips = items
      .filter((item) => item.category?.id === category.id)
      .map(mapKnowledgeTip);

    return mapKnowledgeCategory(category, tips);
  });
}

export function mapKnowledgeTipsForHome(
  categories: readonly KnowledgeCategoryDetail[],
): readonly HomeKnowledgeTip[] {
  return categories.flatMap((category) =>
    category.tips
      .filter((tip) => Boolean(tip.body?.trim()))
      .map((tip) => ({
        id: tip.id,
        title: tip.title,
        body: tip.body?.trim() ?? "",
        categoryTitle: category.title,
        href: category.href,
      })),
  );
}

export function mapServiceDetail(
  service: BackendServiceNode,
  faqs: readonly FaqItem[],
  experts: readonly ExpertCardData[],
  index = 0,
): ServiceDetailData {
  const title = service.short_title?.trim() || service.title;
  const description = stripHtml(service.description) || title;
  const children = service.children ?? [];

  return {
    slug: service.slug,
    title,
    eyebrow: "خدمات ساختمانی",
    description,
    longDescription: description,
    imageSrc:
      resolveMediaUrl(service.image) ?? "/images/services/surveying.png",
    imageAlt: title,
    accent: SERVICE_ACCENTS[index % SERVICE_ACCENTS.length] ?? "teal",
    specialties: children.map((child) => ({
      id: String(child.id),
      title: child.short_title || child.title,
      description: stripHtml(child.description) || child.title,
    })),
    process: [
      {
        id: "scope",
        title: "تعریف نیاز",
        description: "نوع خدمت و جزئیات پروژه را مشخص کنید.",
      },
      {
        id: "compare",
        title: "مقایسه متخصصان",
        description: "سوابق و تخصص‌ها را بررسی کنید.",
      },
      {
        id: "contact",
        title: "ارتباط مستقیم",
        description: "با متخصص مناسب رایگان تماس بگیرید.",
      },
    ],
    faqs,
    experts,
    showSuggestedExperts: experts.length > 0,
  };
}

export function mapPopularFromServices(
  services: readonly BackendServiceNode[],
): {
  popularServices: {
    id: string;
    title: string;
    description: string;
    href: string;
    imageSrc: string;
  }[];
  drawingServices: {
    id: string;
    title: string;
    description: string;
    href: string;
  }[];
} {
  const parents = services.slice(0, 6).map((service) => {
    const title = service.short_title || service.title;
    return {
      id: String(service.id),
      title,
      description: stripHtml(service.description) || title,
      href: `/services/${service.slug}`,
      imageSrc:
        resolveMediaUrl(service.image) ?? "/images/services/surveying.png",
    };
  });

  const drawingParent =
    services.find((service) => service.slug.includes("ترسیم")) ??
    services.find((service) => (service.short_title || service.title).includes("ترسیم"));

  const drawingServices = (drawingParent?.children ?? []).map((child) => ({
    id: String(child.id),
    title: child.short_title || child.title,
    description: stripHtml(child.description) || child.title,
    href: `/services/${child.slug}`,
  }));

  return { popularServices: parents, drawingServices };
}

function mapEducation(
  education: BackendEducation,
): ExpertEducation | null {
  const field =
    typeof education.field === "string"
      ? education.field
      : education.field?.name;
  const degree = education.degree?.trim();

  if (!degree && !field) {
    return null;
  }

  return {
    degree: degree || field || "مدرک",
    field: field || undefined,
    institution: education.university || education.institution || undefined,
    year: education.year != null ? String(education.year) : undefined,
  };
}

function mapPortfolio(item: BackendPortfolio): ExpertPortfolioItem {
  return {
    id: String(item.id),
    title: item.title ?? undefined,
    description: stripHtml(item.description) || undefined,
    imageSrc: resolveMediaUrl(item.image),
    imageAlt: item.title ?? undefined,
  };
}

function mapComment(
  comment: BackendProfessionalComment,
): ExpertReview | null {
  const body = stripHtml(comment.body || comment.comment);
  if (!body) {
    return null;
  }

  return {
    id: String(comment.id),
    authorName:
      comment.user?.full_name?.trim() ||
      comment.user?.name?.trim() ||
      "کاربر",
    text: body,
    rating: comment.rating ?? undefined,
    dateLabel: comment.created_at ?? undefined,
  };
}

function toNumber(value: number | string | null | undefined): number | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function knowledgeCategoryHref(slug: string): string {
  return `${storePaths.knowledge}/${slug}`;
}
