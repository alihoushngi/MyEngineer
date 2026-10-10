import type { NextConfig } from "next";

/** The configured API host must be allowed for next/image (backend media). */
function apiImagePattern(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) {
    return [];
  }
  try {
    const url = new URL(base);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return [];
    }
    return [
      {
        protocol: url.protocol === "https:" ? "https" : "http",
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

function isBareIpApi(): boolean {
  try {
    const host = new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "").hostname;
    return (
      /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ||
      host === "[::1]" ||
      host === "localhost" ||
      host.endsWith(".localhost")
    );
  } catch {
    return false;
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  agentRules: false,
  poweredByHeader: false,
  images: {
    // Keep the optimizer's private-network SSRF protection enabled.
    dangerouslyAllowLocalIP: false,
    // A bare server IP is typically unreachable from inside its own container,
    // so the optimiser could not fetch backend media; serve it directly.
    unoptimized: isBareIpApi(),
    remotePatterns: [
      ...apiImagePattern(),
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        port: "",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        port: "",
        pathname: "/front/**",
      },
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        port: "",
        pathname: "/web/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui", "swiper"],
    // Existing upload rules allow 4 MB files; reserve room for multipart fields.
    serverActions: { bodySizeLimit: "5mb" },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'",
          },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; connect-src 'self'",
          },
        ],
      },
      {
        source: "/engineer",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/engineer/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/account",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/account/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // Test server: no search engine indexing. Remove when going live.
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
