import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { stripHtml } from "@/lib/api/strip-html/strip-html";
import { env } from "@/lib/env/env";
import {
  type BackendBrand,
  type BackendTeamMember,
} from "@/types/api/backend.types";

const PUBLIC_REVALIDATE_SECONDS = 300;

export type TeamMemberCard = {
  id: string;
  name: string;
  position: string;
  imageSrc?: string;
};

export type BrandCard = {
  id: string;
  name: string;
  href?: string;
  imageSrc?: string;
};

export type DownloadableFormItem = {
  id: string;
  name: string;
  slug: string;
  downloadsLabel: string;
  provinceName?: string;
  downloadHref: string;
};

export type CareerListItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  typeLabel: string;
  cityLabel?: string;
  provinceLabel?: string;
  salaryLabel?: string;
  href: string;
  imageSrc?: string;
};

export type CareerDetail = CareerListItem & {
  descriptionHtml: string;
  education?: string;
  insurance?: boolean;
  skillLevel?: string;
};

type BackendCareer = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  education?: string | null;
  insurance?: boolean;
  skill_level?: string | null;
  salary?: string | null;
  type?: string | null;
  province?: { id: number; name: string } | null;
  city?: { id: number; name: string } | null;
  category?: { id: number; title: string; slug: string } | null;
};

type BackendForm = {
  id: number;
  name: string;
  slug: string;
  downloads?: string | number | null;
  province?: { id: number; name: string } | null;
};

const careerTypeLabels: Record<string, string> = {
  part_time: "پاره‌وقت",
  full_time: "تمام‌وقت",
  contract: "قراردادی",
  permanent: "دائمی",
};

async function getPublic<TData>(path: string) {
  return httpGet<ApiEnvelope<TData>>(path, {
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

export async function listTeamMembers(): Promise<readonly TeamMemberCard[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getPublic<BackendTeamMember[]>("/teams");
  return unwrapApiData(envelope).map((member) => ({
    id: String(member.id),
    name: member.name,
    position: member.position?.trim() || "عضو تیم",
    imageSrc: resolveMediaUrl(member.image),
  }));
}

export async function listBrands(): Promise<readonly BrandCard[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getPublic<BackendBrand[]>("/brands");
  return unwrapApiData(envelope).map((brand) => ({
    id: String(brand.id),
    name: brand.name,
    href: brand.link && brand.link !== "#" ? brand.link : undefined,
    imageSrc: resolveMediaUrl(brand.image),
  }));
}

export type FormListFilters = {
  q?: string;
  categoryId?: string;
  provinceId?: string;
};

export type FormCategoryOption = { id: string; name: string };

export async function listDownloadableForms(
  filters: FormListFilters = {},
): Promise<readonly DownloadableFormItem[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await httpGet<ApiEnvelope<BackendForm[]>>("/forms", {
    query: {
      q: filters.q || undefined,
      category_id: filters.categoryId || undefined,
      province_id: filters.provinceId || undefined,
    },
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
  const base = env.apiBaseUrl.replace(/\/$/, "");

  return unwrapApiData(envelope).map((form) => ({
    id: String(form.id),
    name: form.name,
    slug: form.slug,
    downloadsLabel: String(form.downloads ?? "0"),
    provinceName: form.province?.name,
    downloadHref: `${base}/forms/${encodeURIComponent(form.slug)}/download`,
  }));
}

export async function listCareers(): Promise<readonly CareerListItem[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getPublic<BackendCareer[]>("/careers");
  return unwrapApiData(envelope).map(mapCareerListItem);
}

export async function getCareer(id: string): Promise<CareerDetail | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  try {
    const envelope = await getPublic<BackendCareer>(`/careers/${id}`);
    const career = unwrapApiData(envelope);
    const base = mapCareerListItem(career);
    return {
      ...base,
      descriptionHtml: career.description ?? "",
      education: career.education ?? undefined,
      insurance: career.insurance,
      skillLevel: career.skill_level ?? undefined,
    };
  } catch {
    return null;
  }
}

export type CareerApplyInput = {
  name: string;
  family: string;
  email: string;
  mobile: string;
  age: number;
  gender: "male" | "female";
  provinceId: string;
  cityId: string;
  resume?: File | null;
};

export async function applyCareer(
  careerId: string,
  input: CareerApplyInput,
): Promise<void> {
  if (!env.apiBaseUrl) {
    throw new Error("سرویس فرصت‌های شغلی در دسترس نیست.");
  }

  const form = new FormData();
  form.append("name", input.name);
  form.append("family", input.family);
  form.append("email", input.email);
  form.append("mobile", input.mobile);
  form.append("age", String(input.age));
  form.append("gender", input.gender);
  form.append("province_id", input.provinceId);
  form.append("city_id", input.cityId);

  if (input.resume && input.resume.size > 0) {
    form.append("resume", input.resume);
  }

  await httpPost<ApiEnvelope<unknown>>(
    `/careers/${encodeURIComponent(careerId)}/apply`,
    { body: form },
  );
}

function mapCareerListItem(career: BackendCareer): CareerListItem {
  const summary = stripHtml(career.description ?? "").slice(0, 160);
  return {
    id: String(career.id),
    title: career.title,
    slug: career.slug,
    summary: summary || "جزئیات این فرصت شغلی را ببینید.",
    typeLabel: careerTypeLabels[career.type ?? ""] ?? "فرصت شغلی",
    cityLabel: career.city?.name,
    provinceLabel: career.province?.name,
    salaryLabel: career.salary ? formatSalary(career.salary) : undefined,
    href: `/careers/${career.id}`,
    imageSrc: resolveMediaUrl(career.image),
  };
}

function formatSalary(value: string): string {
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return value;
  }
  return `${new Intl.NumberFormat("fa-IR").format(numeric)} تومان`;
}

/**
 * Form categories for the forms filter. The contract does not define a
 * dedicated endpoint yet, so this is fail-soft: an empty list hides the select.
 */
export async function listFormCategories(): Promise<
  readonly FormCategoryOption[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  try {
    const envelope = await getPublic<
      { id: number; name?: string | null; title?: string | null }[]
    >("/form-categories");
    return unwrapApiData(envelope)
      .map((item) => ({
        id: String(item.id),
        name: (item.name ?? item.title ?? "").trim(),
      }))
      .filter((item) => item.name !== "");
  } catch {
    return [];
  }
}

export type TestimonialInput = {
  jobTitle: string;
  comment: string;
  name?: string;
  photoUploadId?: string;
};

/** POST /testimonials (auth). Returns the API success message. */
export async function postTestimonial(
  input: TestimonialInput,
): Promise<string | undefined> {
  const token = await readAccessToken();
  const envelope = await httpPost<ApiEnvelope<unknown>>("/testimonials", {
    headers: authHeaders(token),
    body: {
      job_title: input.jobTitle,
      comment: input.comment,
      name: input.name || undefined,
      photo_upload_id: input.photoUploadId || undefined,
    },
  });

  return envelope.message ?? undefined;
}
