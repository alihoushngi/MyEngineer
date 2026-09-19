import assert from "node:assert/strict";
import test from "node:test";
import {
  enabledLinks,
  featureFlags,
  isPathEnabled,
  isPathEnabledWith,
  shouldRenderHomeSection,
  type FeatureFlags,
} from "./feature-flags.config.ts";

function withFlags(patch: (flags: FeatureFlags) => FeatureFlags): FeatureFlags {
  const flags: FeatureFlags = {
    pages: { ...featureFlags.pages },
    homeSections: { ...featureFlags.homeSections },
    account: { ...featureFlags.account },
    engineer: { ...featureFlags.engineer },
    footer: { ...featureFlags.footer },
  };

  return patch(flags);
}

test("default flags keep current public and panel routes enabled", () => {
  assert.equal(isPathEnabled("/"), true);
  assert.equal(isPathEnabled("/articles/sample"), true);
  assert.equal(isPathEnabled("/account/messages/conv-1"), true);
  assert.equal(isPathEnabled("/engineer/login"), true);
  assert.equal(isPathEnabled("/engineer/requests/req-1"), true);
  assert.equal(isPathEnabled("/offline"), true);
});

test("disabled page hides the route family and keeps siblings visible", () => {
  const flags = withFlags((current) => {
    current.pages.articles = false;
    return current;
  });

  assert.equal(isPathEnabledWith("/articles", flags), false);
  assert.equal(isPathEnabledWith("/articles/hello", flags), false);
  assert.equal(isPathEnabledWith("/articles/categories/news", flags), false);
  assert.equal(isPathEnabledWith("/knowledge", flags), true);
  assert.equal(isPathEnabledWith("/", flags), true);
});

test("parent account flag disables every account route", () => {
  const flags = withFlags((current) => {
    current.pages.userAccount = false;
    return current;
  });

  assert.equal(isPathEnabledWith("/account", flags), false);
  assert.equal(isPathEnabledWith("/account/messages", flags), false);
  assert.equal(isPathEnabledWith("/login", flags), true);
});

test("nested account flag can hide messages without closing the dashboard", () => {
  const flags = withFlags((current) => {
    current.account.messages = false;
    return current;
  });

  assert.equal(isPathEnabledWith("/account", flags), true);
  assert.equal(isPathEnabledWith("/account/messages", flags), false);
  assert.equal(isPathEnabledWith("/account/messages/new", flags), false);
  assert.equal(isPathEnabledWith("/account/requests", flags), true);
});

test("engineer login stays independent from the engineer panel flag", () => {
  const flags = withFlags((current) => {
    current.pages.engineerPanel = false;
    return current;
  });

  assert.equal(isPathEnabledWith("/engineer", flags), false);
  assert.equal(isPathEnabledWith("/engineer/profile", flags), false);
  assert.equal(isPathEnabledWith("/engineer/login", flags), true);
});

test("home path is exact and does not swallow other routes", () => {
  const flags = withFlags((current) => {
    current.pages.home = false;
    return current;
  });

  assert.equal(isPathEnabledWith("/", flags), false);
  assert.equal(isPathEnabledWith("/about", flags), true);
});

test("home marketplace section requires both its section flag and expert pages", () => {
  assert.equal(shouldRenderHomeSection("marketplace"), true);

  const hiddenSection = withFlags((current) => {
    current.homeSections.marketplace = false;
    return current;
  });
  assert.equal(shouldRenderHomeSection("marketplace", hiddenSection), false);

  const hiddenExperts = withFlags((current) => {
    current.pages.experts = false;
    return current;
  });
  assert.equal(shouldRenderHomeSection("marketplace", hiddenExperts), false);
});

test("enabledLinks drops hrefs whose page flag is off", () => {
  const flags = withFlags((current) => {
    current.pages.faq = false;
    return current;
  });

  const links = enabledLinks(
    [
      { href: "/articles", label: "مقالات" },
      { href: "/faq", label: "سوالات متداول" },
    ],
    flags,
  );

  assert.deepEqual(
    links.map((item) => item.href),
    ["/articles"],
  );
});
