import Link from "next/link";
import { notFound } from "next/navigation";

import {
  StoreFooter,
  type StoreFooterPreviewData,
} from "@/components/layout/storeFooter/storeFooter";
import { getSiteSettings } from "@/services/site-settings-service/site-settings-service";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";

type FooterPreviewPageProps = {
  searchParams: Promise<{ data?: string | string[] }>;
};

const previewStates = [
  { id: "demo", label: "Demo data" },
  { id: "worst", label: "Worst case" },
  { id: "empty", label: "Empty" },
  { id: "one", label: "One" },
  { id: "many", label: "1,000 rows" },
] as const;

function makePreviewData(
  state: string,
  data: StoreFooterPreviewData,
): StoreFooterPreviewData {
  if (state === "worst") {
    return {
      serviceCategories: data.serviceCategories.map((category, index) =>
        index === 0
          ? {
              ...category,
              label:
                "خدمات تخصصی نقشه‌برداری، تهیه نقشه‌های ثبتی و تعیین حدود املاک و زمین‌های کشاورزی در سراسر استان گیلان",
            }
          : category,
      ),
      settings: {
        ...data.settings,
        name: "مهندس من؛ بازار تخصصی مهندسان، استادکاران و پیمانکاران ساختمان",
        tagline:
          "ساده‌سازی ارتباط با مهندسان و متخصصان حوزه ساخت‌وساز کشور، با اطلاعات کامل خدمات، راه‌های تماس و سوابق حرفه‌ای برای انتخاب آگاهانه در پروژه‌های ساختمانی کوچک و بزرگ.",
        address:
          "استان گیلان، شهرستان رشت، پیاده‌راه فرهنگی شهرداری رشت، کوچه مهربان، ساختمان احمد پناه، واحد شماره یک، مرکز پشتیبانی و پاسخ‌گویی خدمات کاربران",
        phones: [
          {
            label: "واحد پشتیبانی مشتریان و پیگیری درخواست‌های خدمات ساختمانی",
            number: "+98 13 3244 2501 ext 204",
          },
          { label: "", number: "0996-5794766" },
        ],
        email:
          "bartholomew.fitzgerald@northwind-industries-holdings.example.com",
        socials: [
          {
            key: "telegram",
            label: "تلگرام پشتیبانی مهندس من - پرسش‌های کاربران و پیگیری خدمات",
            url: "",
          },
          {
            key: "youtube",
            label: "ویدیوهای آموزشی و راهنمای استفاده از خدمات مهندس من",
            url: "",
          },
          {
            key: "whatsapp",
            label: "واتساپ پشتیبانی مشتریان و متخصصان مهندس من",
            url: "",
          },
          {
            key: "instagram",
            label: "اینستاگرام مهندس من و اخبار حوزه ساخت‌وساز کشور",
            url: "",
          },
          {
            key: "linkedin",
            label: "لینکدین رسمی مهندس من برای متخصصان و شرکت‌های ساختمانی",
            url: "",
          },
          {
            key: "facebook",
            label: "Facebook page for Mohandes Man construction services",
            url: "",
          },
          {
            key: "x",
            label: "Mohandes Man service announcements and support updates",
            url: "",
          },
          {
            key: "aparat",
            label: "ویدیوهای راهنمای استفاده از مهندس من در آپارات",
            url: "",
          },
        ],
        copyright:
          "تمام حقوق این سایت متعلق به شرکت هیرکان است؛ استفاده از داده‌ها و محتوای تخصصی، خدمات و اطلاعات تماس مشمول قوانین سایت است و هرگونه بازنشر باید با ذکر منبع انجام شود. © 2025",
      },
    };
  }

  if (state === "empty") {
    return {
      serviceCategories: [],
      settings: {
        ...data.settings,
        name: "",
        tagline: "",
        address: "",
        phones: [],
        email: null,
        socials: [],
        copyright: "",
      },
    };
  }

  if (state === "many" && data.serviceCategories[0]) {
    const category = data.serviceCategories[0];
    return {
      ...data,
      serviceCategories: Array.from({ length: 1000 }, (_, index) => ({
        ...category,
        label: `${category.label} ${index + 1}`,
        href: `${category.href}?preview=${index + 1}` as typeof category.href,
      })),
    };
  }

  if (state === "one") {
    return {
      serviceCategories: data.serviceCategories.slice(0, 1),
      settings: {
        ...data.settings,
        address: "رشت، گیلان",
        phones: [{ label: "", number: "013-32442501" }],
        email: null,
        socials: [
          {
            key: "instagram",
            label: "اینستاگرام مهندس من",
            url: "",
          },
        ],
      },
    };
  }

  return data;
}

export default async function FooterPreviewPage({
  searchParams,
}: FooterPreviewPageProps) {
  if (process.env.NODE_ENV !== "development") notFound();

  const query = await searchParams;
  const requestedState = Array.isArray(query.data) ? query.data[0] : query.data;
  const state = previewStates.some(({ id }) => id === requestedState)
    ? requestedState!
    : "demo";
  const [serviceCategories, settings] = await Promise.all([
    listServiceCategories().catch(() => []),
    getSiteSettings(),
  ]);
  const previewData = makePreviewData(state, { serviceCategories, settings });

  return (
    <>
      <main id="main-content" data-footer-preview>
        <StoreFooter previewData={previewData} siteWide={false} />
      </main>
      <nav
        aria-label="Footer data preview"
        className="fixed bottom-3 left-1/2 z-50 flex max-w-[calc(100vw-1rem)] -translate-x-1/2 flex-wrap justify-center gap-1 rounded-full bg-neutral-300 p-1 font-sans text-xs text-neutral-800 shadow-md"
      >
        {previewStates.map(({ id, label }) => (
          <Link
            key={id}
            href={`?data=${id}`}
            aria-current={state === id ? "page" : undefined}
            className={`rounded-full px-3 py-2 ${state === id ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
