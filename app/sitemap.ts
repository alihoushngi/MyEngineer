import { type MetadataRoute } from "next";
import {
  isPageEnabled,
  type PageFlag,
} from "@/config/feature-flags.config/feature-flags.config";
import {
  listArticlesPage,
  listArticleCategories,
} from "@/services/article-service/article-service";
import { searchProfessionals } from "@/services/expert-service/expert-service";
import { listCareers } from "@/services/content-service/content-service";
import { listFaqCategories } from "@/services/faq-service/faq-service";
import { listKnowledgeCategorySummaries } from "@/services/knowledge-service/knowledge-service";
import { listFlattenedBackendServices } from "@/services/lookup-service/lookup-service";

export const revalidate = 300;

const staticPages: readonly [PageFlag, string][] = [
  ["home", "/"],
  ["articles", "/articles"],
  ["knowledge", "/knowledge"],
  ["faq", "/faq"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["careers", "/careers"],
  ["forms", "/forms"],
  ["terms", "/terms"],
  ["privacy", "/privacy-policy"],
  ["iphoneInstall", "/install/iphone"],
];

async function collectPagePaths(
  loadPage: (page: number) => Promise<{
    paths: readonly string[];
    page: number;
    pageCount: number;
    failed: boolean;
  }>,
): Promise<string[]> {
  const paths: string[] = [];
  for (let page = 1; ; page += 1) {
    const result = await loadPage(page);
    // Stop on failure or an API that ignores pagination instead of looping forever.
    if (result.failed || result.page !== page) break;
    paths.push(...result.paths);
    if (page >= result.pageCount) break;
  }
  return paths;
}

/** Public content only. Private workspaces, auth, search and filters are excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let origin: string;
  try {
    const configured = process.env.SITE_URL?.trim();
    if (!configured) return [];
    const url = new URL(configured);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    )
      return [];
    origin = url.origin;
  } catch {
    return [];
  }

  const paths = staticPages
    .filter(([flag]) => isPageEnabled(flag))
    .map(([, path]) => path);
  const additions = await Promise.all([
    isPageEnabled("services")
      ? listFlattenedBackendServices()
          .then((items) =>
            items.map((item) => `/services/${encodeURIComponent(item.slug)}`),
          )
          .catch(() => [])
      : [],
    isPageEnabled("articles")
      ? collectPagePaths(async (page) => {
          const result = await listArticlesPage({ page, perPage: 100 });
          return { ...result, paths: result.articles.map((item) => item.href) };
        })
      : [],
    isPageEnabled("articles")
      ? listArticleCategories()
          .then((categories) => categories.map((item) => item.href))
          .catch(() => [])
      : [],
    isPageEnabled("knowledge")
      ? listKnowledgeCategorySummaries()
          .then((items) => items.map((item) => item.href))
          .catch(() => [])
      : [],
    isPageEnabled("faq")
      ? listFaqCategories()
          .then((items) => items.map((item) => item.href))
          .catch(() => [])
      : [],
    isPageEnabled("careers")
      ? listCareers()
          .then((items) => items.map((item) => item.href))
          .catch(() => [])
      : [],
    isPageEnabled("experts")
      ? collectPagePaths(async (page) => {
          const result = await searchProfessionals({ page, per_page: 100 });
          return {
            ...result,
            paths: result.experts.map(
              (item) => `/experts/${encodeURIComponent(item.id)}`,
            ),
          };
        })
      : [],
  ]);

  const urls = new Set(
    [...paths, ...additions.flat()].map((path) => new URL(path, origin).href),
  );
  return [...urls].map((url) => ({ url }));
}
