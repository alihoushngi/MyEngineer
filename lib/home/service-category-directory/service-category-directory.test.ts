import assert from "node:assert/strict";
import test from "node:test";

import type { ServiceCategory } from "../../../config/services.config/services.config";
import {
  getHomeServiceCategoryHref,
  getHomeServiceCategoryImageSource,
  getHomeServiceCategoryLabel,
  homeServiceCategoryArtworkBySlug,
  orderHomeServiceCategories,
} from "./service-category-directory.ts";

function category(slug: string, imageSrc?: string): ServiceCategory {
  return {
    slug,
    label: slug,
    href: `/services/${slug}`,
    description: "",
    imageSrc,
  };
}

test("orders known services like the reference and keeps additional API order", () => {
  const extras = [category("custom-first"), category("custom-second")];
  const input = [
    ...extras,
    category("خدمات-اداری"),
    category("نقشه-برداری"),
  ];

  assert.deepEqual(
    orderHomeServiceCategories(input).map(({ slug }) => slug),
    ["نقشه-برداری", "خدمات-اداری", "custom-first", "custom-second"],
  );
  assert.equal(Object.keys(homeServiceCategoryArtworkBySlug).length, 6);
});

test("preserves valid server artwork and falls back by stable slug", () => {
  const surveying = category("نقشه-برداری", "https://media.example/surveying.jpg");

  assert.equal(
    getHomeServiceCategoryImageSource(surveying),
    "https://media.example/surveying.jpg",
  );
  assert.equal(
    getHomeServiceCategoryImageSource(category("نقشه-برداری")),
    "/images/services/surveying.png",
  );
  assert.equal(
    getHomeServiceCategoryImageSource(surveying, surveying.imageSrc),
    "/images/services/surveying.png",
  );
  assert.equal(
    getHomeServiceCategoryImageSource(category("custom-service")),
    undefined,
  );
});

test("uses a stable identifier when an API label is blank", () => {
  assert.equal(
    getHomeServiceCategoryLabel({ ...category("custom-service"), label: "  " }),
    "custom-service",
  );
});

test("only returns the existing service route for a matching API slug", () => {
  const service = category("نقشه-برداری");
  assert.equal(getHomeServiceCategoryHref(service), service.href);
  assert.equal(
    getHomeServiceCategoryHref({ ...service, href: "/faq" as ServiceCategory["href"] }),
    undefined,
  );
});
