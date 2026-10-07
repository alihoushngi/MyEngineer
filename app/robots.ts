import { type MetadataRoute } from "next";

// Test server: keep every crawler out. Restore the previous rules
// (allow "/", disallow private areas) when the site goes live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
