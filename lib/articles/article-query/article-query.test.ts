import assert from "node:assert/strict";
import test from "node:test";
import {
  ALL_ARTICLE_CATEGORY,
  buildArticleHubHref,
  buildArticleHubQuery,
  parseArticleSearchParam,
  parseArticleSortParam,
  filterArticlesByCategory,
  parseArticleCategoryParam,
} from "./article-query.ts";

const slugs = ["surveying", "construction", "design"] as const;

test("parseArticleCategoryParam keeps known slugs and defaults the rest to all", () => {
  assert.equal(parseArticleCategoryParam("design", slugs), "design");
  assert.equal(
    parseArticleCategoryParam(["construction"], slugs),
    "construction",
  );
  assert.equal(
    parseArticleCategoryParam("architecture", slugs),
    ALL_ARTICLE_CATEGORY,
  );
  assert.equal(parseArticleCategoryParam("all", slugs), ALL_ARTICLE_CATEGORY);
  assert.equal(
    parseArticleCategoryParam(undefined, slugs),
    ALL_ARTICLE_CATEGORY,
  );
});

test("filterArticlesByCategory returns the matching category or the full list", () => {
  const articles = [
    { slug: "a", categorySlug: "surveying" },
    { slug: "b", categorySlug: "design" },
    { slug: "c", categorySlug: "surveying" },
  ];

  assert.deepEqual(
    filterArticlesByCategory(articles, "surveying").map((item) => item.slug),
    ["a", "c"],
  );
  assert.equal(
    filterArticlesByCategory(articles, ALL_ARTICLE_CATEGORY).length,
    3,
  );
});

test("buildArticleHubHref omits all-category and page 1", () => {
  assert.equal(
    buildArticleHubHref("/articles", ALL_ARTICLE_CATEGORY, 1),
    "/articles",
  );
  assert.equal(
    buildArticleHubHref("/articles", "design", 1),
    "/articles?category=design",
  );
  assert.equal(
    buildArticleHubHref("/articles", "design", 2),
    "/articles?category=design&page=2",
  );
  assert.equal(
    buildArticleHubHref("/articles", ALL_ARTICLE_CATEGORY, 2),
    "/articles?page=2",
  );
});

test("article search and sort params are normalised", () => {
  assert.equal(parseArticleSortParam("popular"), "popular");
  assert.equal(parseArticleSortParam("weird"), "newest");
  assert.equal(parseArticleSearchParam("  سازه "), "سازه");
  assert.equal(parseArticleSearchParam(undefined), "");
  assert.equal(
    buildArticleHubQuery({ category: "all", q: "a b", sort: "popular", page: 2 }),
    "q=a+b&sort=popular&page=2",
  );
  assert.equal(buildArticleHubQuery({ sort: "newest" }), "");
});
