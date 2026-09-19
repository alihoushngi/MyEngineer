import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import { httpGet, httpPost, httpPut } from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";

export type BackendRole = {
  id: number;
  name: string;
  title: string;
};

export type BackendAuthUser = {
  id: number;
  name: string;
  family: string;
  full_name?: string;
  mobile?: string;
  melli?: string;
  email?: string | null;
  image?: string | null;
  role?: BackendRole | null;
  status?: { value?: string; label?: string } | null;
  mobile_verified?: boolean;
};

export type LoginSuccessData = {
  requires_role_selection: false;
  token: string;
  token_type: string;
  user: BackendAuthUser;
};

export type LoginRoleSelectionData = {
  requires_role_selection: true;
  token: string;
  token_type: string;
  available_roles: readonly BackendRole[];
};

export type LoginData = LoginSuccessData | LoginRoleSelectionData;

export type UserAccessState =
  | "authenticated"
  | "engineer_session"
  | "unauthenticated";

export type EngineerAccessState =
  | "active"
  | "registration_in_progress"
  | "forbidden"
  | "unauthenticated";

async function withSessionToken(): Promise<string | undefined> {
  return readAccessToken();
}

export async function apiRegister(input: {
  name: string;
  family: string;
  mobile: string;
  melli: string;
  email?: string;
  password: string;
  password_confirmation: string;
}) {
  const envelope = await httpPost<
    ApiEnvelope<{ user: BackendAuthUser; requires_verification: boolean }>
  >("/auth/register", { body: input });
  return unwrapApiData(envelope);
}

export async function apiLogin(input: {
  melli: string;
  password: string;
  device_name?: string;
}) {
  const envelope = await httpPost<ApiEnvelope<LoginData>>("/auth/login", {
    body: input,
  });
  return unwrapApiData(envelope);
}

export async function apiSelectRole(
  input: { role: string; device_name?: string },
  token: string,
) {
  const envelope = await httpPost<
    ApiEnvelope<{ token: string; token_type: string; user: BackendAuthUser }>
  >("/auth/role", {
    body: input,
    headers: authHeaders(token),
  });
  return unwrapApiData(envelope);
}

export async function apiRequestOtp(input: {
  mobile: string;
  purpose: "account_activation" | "login" | "password_reset";
}) {
  const envelope = await httpPost<ApiEnvelope<{ resend_after: number }>>(
    "/auth/otp",
    { body: input },
  );
  return unwrapApiData(envelope);
}

export async function apiVerifyOtp(input: {
  mobile: string;
  purpose: "account_activation" | "login" | "password_reset";
  code: string;
  device_name?: string;
}) {
  const envelope = await httpPost<
    ApiEnvelope<
      | LoginData
      | { token: string; token_type: string; purpose: string }
    >
  >("/auth/otp/verify", { body: input });
  return unwrapApiData(envelope);
}

export async function apiResetPassword(
  input: { password: string; password_confirmation: string },
  token: string,
) {
  const envelope = await httpPost<ApiEnvelope<null>>("/auth/password", {
    body: input,
    headers: authHeaders(token),
  });
  return unwrapApiData(envelope);
}

export async function apiMe(token?: string) {
  const sessionToken = token ?? (await withSessionToken());
  const envelope = await httpGet<ApiEnvelope<BackendAuthUser>>("/auth/me", {
    headers: authHeaders(sessionToken),
    cache: "no-store",
  });
  return unwrapApiData(envelope);
}

export async function apiLogout(token?: string) {
  const sessionToken = token ?? (await withSessionToken());
  await httpPost<ApiEnvelope<null>>("/auth/logout", {
    headers: authHeaders(sessionToken),
  });
}

export async function apiGetProfile(token?: string) {
  const sessionToken = token ?? (await withSessionToken());
  const envelope = await httpGet<ApiEnvelope<Record<string, unknown>>>(
    "/profile",
    {
      headers: authHeaders(sessionToken),
      cache: "no-store",
    },
  );
  return unwrapApiData(envelope);
}

export async function apiUpdateProfile(
  body: Record<string, unknown>,
  token?: string,
) {
  const sessionToken = token ?? (await withSessionToken());
  const envelope = await httpPut<ApiEnvelope<Record<string, unknown>>>(
    "/profile",
    {
      body,
      headers: authHeaders(sessionToken),
    },
  );
  return unwrapApiData(envelope);
}

export async function apiUpdatePassword(
  body: {
    current_password: string;
    password: string;
    password_confirmation: string;
  },
  token?: string,
) {
  const sessionToken = token ?? (await withSessionToken());
  await httpPut<ApiEnvelope<null>>("/profile/password", {
    body,
    headers: authHeaders(sessionToken),
  });
}

export async function apiSendContactMessage(body: {
  name: string;
  mobile: string;
  email?: string;
  subject: string;
  message: string;
}) {
  const envelope = await httpPost<ApiEnvelope<null>>("/messages", { body });
  return unwrapApiData(envelope);
}

export async function apiSubscribeNewsletter(contact: string) {
  const envelope = await httpPost<ApiEnvelope<null>>("/newsletter", {
    body: { contact },
  });
  return unwrapApiData(envelope);
}

export async function apiUserRegistrationOtp(input: { mobile: string }) {
  const envelope = await httpPost<ApiEnvelope<{ resend_after: number }>>(
    "/auth/user-registration/otp",
    { body: input },
  );
  return unwrapApiData(envelope);
}

export async function apiUserRegistrationVerify(input: {
  mobile: string;
  code: string;
}) {
  const envelope = await httpPost<ApiEnvelope<null>>(
    "/auth/user-registration/verify",
    { body: input },
  );
  return unwrapApiData(envelope);
}

export async function apiUserRegistrationComplete(input: {
  mobile: string;
  code: string;
  display_name: string;
  password: string;
  device_name?: string;
}) {
  const envelope = await httpPost<ApiEnvelope<LoginSuccessData>>(
    "/auth/user-registration/complete",
    { body: input },
  );
  return unwrapApiData(envelope);
}

export async function apiEngineerRegistrationOtp(input: {
  mobile: string;
  national_id: string;
}) {
  const envelope = await httpPost<ApiEnvelope<{ resend_after: number }>>(
    "/auth/engineer-registration/otp",
    { body: input },
  );
  return unwrapApiData(envelope);
}

export async function apiUserAccess(token?: string) {
  const sessionToken = token ?? (await withSessionToken());
  const envelope = await httpGet<
    ApiEnvelope<{
      state: UserAccessState;
      user: BackendAuthUser | null;
    }>
  >("/auth/user-access", {
    headers: authHeaders(sessionToken),
    cache: "no-store",
  });
  return unwrapApiData(envelope);
}

export async function apiEngineerAccess(token?: string) {
  const sessionToken = token ?? (await withSessionToken());
  const envelope = await httpGet<
    ApiEnvelope<{
      state: EngineerAccessState;
      user: BackendAuthUser | null;
    }>
  >("/auth/engineer-access", {
    headers: authHeaders(sessionToken),
    cache: "no-store",
  });
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationServiceArea(body: {
  province_id: number;
  city_id: number;
  nearby_city_ids?: readonly number[];
}) {
  const token = await withSessionToken();
  const envelope = await httpPut<ApiEnvelope<unknown>>(
    "/profile/registration/service-area",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationExpertise(body: {
  service_ids: readonly number[];
  software_ids: readonly number[];
}) {
  const token = await withSessionToken();
  const envelope = await httpPut<ApiEnvelope<unknown>>(
    "/profile/registration/expertise",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationPersonalInfo(body: {
  first_name: string;
  last_name: string;
  avatar_upload_id?: string | null;
}) {
  const token = await withSessionToken();
  const envelope = await httpPut<ApiEnvelope<unknown>>(
    "/profile/registration/personal-info",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationEducation(body: {
  level: string;
  degrees: readonly { field_id: number; university?: string | null }[];
  degree_file_upload_ids?: readonly (string | null)[];
}) {
  const token = await withSessionToken();
  const envelope = await httpPut<ApiEnvelope<unknown>>(
    "/profile/registration/education",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationOrganization(body: {
  is_member: boolean;
  membership_number?: string;
  has_license: boolean;
  license_number?: string;
  discipline_id?: number | null;
  qualification_ids?: readonly number[];
  license_upload_id?: string;
}) {
  const token = await withSessionToken();
  const envelope = await httpPost<ApiEnvelope<unknown>>(
    "/profile/registration/organization",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSaveRegistrationResume(body: {
  experience_years: number;
  resume_text: string;
}) {
  const token = await withSessionToken();
  const envelope = await httpPut<ApiEnvelope<unknown>>(
    "/profile/registration/resume",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}

export async function apiSubmitRegistration(body: {
  accept_rules: boolean;
  image_count?: number;
  certificate_count?: number;
}) {
  const token = await withSessionToken();
  const envelope = await httpPost<ApiEnvelope<unknown>>(
    "/profile/registration/submit",
    { body, headers: authHeaders(token) },
  );
  return unwrapApiData(envelope);
}
