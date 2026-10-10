import { type NextRequest, NextResponse } from "next/server";
import {
  engineerPanelPaths,
  isEngineerPanelPath,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  FEATURE_UNAVAILABLE_PATH,
  isPathEnabled,
} from "@/config/feature-flags.config/feature-flags.config";
import {
  isAccountPath,
  isUserAuthEntryPath,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import {
  ACCESS_TOKEN_COOKIE,
  AUTH_ROLE_COOKIE,
  isEngineerPanelRole,
} from "@/lib/auth/cookie-names/cookie-names";
import { env } from "@/lib/env/env";
import {
  isMockAuthEnabled,
  isMockUserAuthEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import {
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_ENGINEER_SESSION_VALUE,
  MOCK_USER_SESSION_COOKIE,
  MOCK_USER_SESSION_VALUE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== FEATURE_UNAVAILABLE_PATH && !isPathEnabled(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = FEATURE_UNAVAILABLE_PATH;
    url.search = "";
    return NextResponse.rewrite(url);
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  // Token presence only avoids an unnecessary login redirect. Server session
  // readers and backend access endpoints verify identity and permissions.
  // Live checks stay out of Edge middleware so private API TLS configuration
  // and backend outages cannot introduce repeated redirects here.
  const hasLiveSessionHint = Boolean(env.apiBaseUrl && accessToken);
  const hasLiveEngineerHint =
    hasLiveSessionHint &&
    isEngineerPanelRole(request.cookies.get(AUTH_ROLE_COOKIE)?.value);

  const hasMockEngineerSession =
    !env.apiBaseUrl &&
    isMockAuthEnabled() &&
    request.cookies.get(MOCK_ENGINEER_SESSION_COOKIE)?.value ===
      MOCK_ENGINEER_SESSION_VALUE;
  const hasMockUserSession =
    !env.apiBaseUrl &&
    isMockUserAuthEnabled() &&
    request.cookies.get(MOCK_USER_SESSION_COOKIE)?.value ===
      MOCK_USER_SESSION_VALUE;

  if (
    isEngineerPanelPath(pathname) &&
    !hasLiveSessionHint &&
    !hasMockEngineerSession
  ) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.login;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // Live login pages perform their own verified session read and redirect.
  if (hasMockEngineerSession && pathname === engineerPanelPaths.login) {
    const next = getSafeEngineerNext(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Only the wizard entry redirects a signed-in engineer to the panel. Deeper
  // steps must stay reachable: OTP verification (step 2) already creates the
  // session, and the remaining steps run while that session is active.
  if (
    (hasLiveEngineerHint || hasMockEngineerSession) &&
    pathname === "/expert-registration"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.dashboard;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (
    isAccountPath(pathname) &&
    !hasLiveSessionHint &&
    !hasMockUserSession &&
    !hasMockEngineerSession
  ) {
    const url = request.nextUrl.clone();
    url.pathname = userAuthPaths.login;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (hasMockUserSession && isUserAuthEntryPath(pathname)) {
    const next = getSafeUserNext(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons/|images/|fonts/).*)",
  ],
};
