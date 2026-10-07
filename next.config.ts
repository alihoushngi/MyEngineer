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
    return [
      {
        protocol: url.protocol === "https:" ? "https" : "http",
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
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
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(host) && !host.startsWith("127.");
  } catch {
    return false;
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  agentRules: false,
  images: {
    // Private/local hosts (localhost, 127.0.0.1, server IPs) are blocked by
    // default in Next's image optimizer; the backend media host is trusted.
    dangerouslyAllowLocalIP: true,
    // A bare server IP is typically unreachable from inside its own container,
    // so the optimiser could not fetch backend media; serve it directly.
    unoptimized: isBareIpApi(),
    remotePatterns: [
      ...apiImagePattern(),
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        pathname: "/front/**",
      },
      {
        protocol: "https",
        hostname: "test.kbdcland.ir",
        pathname: "/web/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui", "swiper"],
  },
  async headers() {
    return [
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
