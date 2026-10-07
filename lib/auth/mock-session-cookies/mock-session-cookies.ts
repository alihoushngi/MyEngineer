/** Development-only mock session cookies. Opaque values only. */
export const MOCK_ENGINEER_SESSION_COOKIE = "mm_mock_engineer_session";
export const MOCK_ENGINEER_PROFILE_COOKIE = "mm_mock_engineer_profile";
export const MOCK_ENGINEER_SESSION_VALUE = "active";

export const MOCK_USER_SESSION_COOKIE = "mm_mock_user_session";
export const MOCK_USER_PROFILE_COOKIE = "mm_mock_user_profile";
export const MOCK_USER_SAVED_COOKIE = "mm_mock_user_saved";
export const MOCK_CREATED_REQUESTS_COOKIE = "mm_mock_service_requests";
export const MOCK_MESSAGING_COOKIE = "mm_mock_conversations";
export const MOCK_REVIEWS_COOKIE = "mm_mock_reviews";
export const MOCK_NOTIFICATIONS_COOKIE = "mm_mock_notifications";
export const MOCK_USER_SESSION_VALUE = "active";

export const MOCK_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  // AUTH_COOKIE_SECURE=false lets a plain-HTTP test server keep its session.
  secure: process.env.AUTH_COOKIE_SECURE
    ? process.env.AUTH_COOKIE_SECURE === "true"
    : process.env.NODE_ENV === "production",
};
