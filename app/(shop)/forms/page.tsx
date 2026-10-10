import { type Metadata } from "next";
import { FormsPage } from "@/components/store/content/careersAndFormsPages/careersAndFormsPages";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { getProvinces } from "@/services/city-service/city-service";
import {
  listDownloadableForms,
  listFormCategories,
} from "@/services/content-service/content-service";

type FormsRouteProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    province?: string | string[];
  }>;
};

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export async function generateMetadata({
  searchParams,
}: FormsRouteProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered =
    first(params.q) !== "" ||
    first(params.category) !== "" ||
    first(params.province) !== "";
  return {
    title: "فرم‌های نظام مهندسی",
    description: "دانلود فرم‌های فعال مهندس من برای فرآیندهای اداری و فنی.",
    alternates: { canonical: storePaths.forms },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: "فرم‌های نظام مهندسی",
      description: "دانلود فرم‌های فعال مهندس من برای فرآیندهای اداری و فنی.",
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
  };
}

export default async function FormsRoutePage({
  searchParams,
}: FormsRouteProps) {
  const params = await searchParams;
  const q = first(params.q).slice(0, 100);
  const category = /^\d+$/.test(first(params.category))
    ? first(params.category)
    : "";
  const province = /^\d+$/.test(first(params.province))
    ? first(params.province)
    : "";

  const [formsResult, categories, provinces] = await Promise.all([
    listDownloadableForms({ q, categoryId: category, provinceId: province })
      .then((forms) => ({ forms, failed: false }))
      .catch(() => ({ forms: [], failed: true })),
    listFormCategories(),
    getProvinces().catch(() => []),
  ]);

  return (
    <FormsPage
      forms={formsResult.forms}
      loadFailed={formsResult.failed}
      q={q}
      category={category}
      province={province}
      categories={categories}
      provinces={provinces}
    />
  );
}
