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
} from "@/lib/auth/access-token-cookie/access-token-cookie";
import {
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_ENGINEER_SESSION_VALUE,
  MOCK_USER_SESSION_COOKIE,
  MOCK_USER_SESSION_VALUE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { getSafeEngineerNext } from "@/lib/auth/safe-engineer-next/safe-engineer-next";
import { getSafeUserNext } from "@/lib/auth/safe-user-next/safe-user-next";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== FEATURE_UNAVAILABLE_PATH && !isPathEnabled(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = FEATURE_UNAVAILABLE_PATH;
    url.search = "";
    return NextResponse.rewrite(url);
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const authRole = request.cookies.get(AUTH_ROLE_COOKIE)?.value;
  const hasLiveEngineerSession =
    Boolean(accessToken) && isEngineerPanelRole(authRole);
  const hasLiveUserSession =
    Boolean(accessToken) && Boolean(authRole) && !isEngineerPanelRole(authRole);

  const hasMockEngineerSession =
    request.cookies.get(MOCK_ENGINEER_SESSION_COOKIE)?.value ===
    MOCK_ENGINEER_SESSION_VALUE;
  const hasMockUserSession =
    request.cookies.get(MOCK_USER_SESSION_COOKIE)?.value ===
    MOCK_USER_SESSION_VALUE;

  const hasEngineerSession = hasLiveEngineerSession || hasMockEngineerSession;
  const hasUserSession = hasLiveUserSession || hasMockUserSession;

  if (isEngineerPanelPath(pathname) && !hasEngineerSession) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.login;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (hasEngineerSession && pathname === engineerPanelPaths.login) {
    const next = getSafeEngineerNext(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (
    hasEngineerSession &&
    pathname.startsWith("/expert-registration") &&
    pathname !== registrationPaths.complete
  ) {
    const url = request.nextUrl.clone();
    url.pathname = engineerPanelPaths.dashboard;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isAccountPath(pathname) && !hasUserSession && !hasEngineerSession) {
    const url = request.nextUrl.clone();
    url.pathname = userAuthPaths.login;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (hasUserSession && isUserAuthEntryPath(pathname)) {
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
