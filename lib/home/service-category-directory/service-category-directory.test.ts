import assert from "node:assert/strict";
import test from "node:test";

import type { ServiceCategory } from "../../../config/services.config/services.config";
import {
  getHomeServiceCategoryHref,
  getHomeServiceCategoryImageSource,
  getHomeServiceCategoryLabel,
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
});

test("uses only API artwork and suppresses missing or failed images", () => {
  const surveying = category("نقشه-برداری", "https://media.example/surveying.jpg");

  assert.equal(
    getHomeServiceCategoryImageSource(surveying),
    "https://media.example/surveying.jpg",
  );
  assert.equal(
    getHomeServiceCategoryImageSource(surveying, surveying.imageSrc),
    undefined,
  );
  assert.equal(
    getHomeServiceCategoryImageSource(category("نقشه-برداری")),
    undefined,
  );
  assert.equal(
    getHomeServiceCategoryImageSource(category("custom-service", "  ")),
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
    getHomeServiceCategoryHref({ ...service, slug: "", href: "/services/" }),
    undefined,
  );
  assert.equal(
    getHomeServiceCategoryHref({ ...service, href: "/faq" as ServiceCategory["href"] }),
    undefined,
  );
});
