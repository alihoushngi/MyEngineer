import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet, httpPost, httpPut } from "@/lib/api/http-client/http-client";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { env } from "@/lib/env/env";
import { type UserAccount } from "@/types/store/user-account.types";

export type ProfileRecord = {
  id: number;
  name: string;
  family: string;
  mobile?: string;
  melli?: string;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  gender?: string | null;
  birthday?: string | null;
  marital_status?: string | null;
  working_years?: string | null;
  phone_contact?: string | null;
  text_contact?: string | null;
  show_mobile?: string | null;
  show_image?: string | null;
  province?: { id: number; name: string } | null;
  city?: { id: number; name: string } | null;
  role?: { id: number; name: string; title: string } | null;
};

export type ProfileUpdateInput = {
  name?: string;
  family?: string;
  email?: string | null;
  bio?: string | null;
  gender?: "male" | "female" | "";
  birthday?: string;
  marital_status?: "single" | "married" | "";
  working_years?: string;
  phone_contact?: string;
  text_contact?: string;
  show_mobile?: "yes" | "no";
  show_image?: "yes" | "no";
  province_id?: number;
  city_id?: number;
};

function authHeaders(token?: string): HeadersInit | undefined {
  if (!token) {
    return undefined;
  }
  return { Authorization: `Bearer ${token}` };
}

export async function getCurrentProfile(): Promise<ProfileRecord | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  const token = await readAccessToken();
  if (!token) {
    return null;
  }

  const envelope = await httpGet<ApiEnvelope<ProfileRecord>>("/profile", {
    headers: authHeaders(token),
    cache: "no-store",
  });
  return unwrapApiData(envelope);
}

export async function updateCurrentProfile(
  body: ProfileUpdateInput,
): Promise<ProfileRecord> {
  const token = await readAccessToken();
  const envelope = await httpPut<ApiEnvelope<ProfileRecord>>("/profile", {
    body,
    headers: authHeaders(token),
  });
  return unwrapApiData(envelope);
}

export async function updateCurrentPassword(body: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  const token = await readAccessToken();
  await httpPut<ApiEnvelope<null>>("/profile/password", {
    body,
    headers: authHeaders(token),
  });
}

export async function uploadCurrentAvatar(file: File): Promise<ProfileRecord> {
  const token = await readAccessToken();
  const form = new FormData();
  form.append("image", file);
  const envelope = await httpPost<ApiEnvelope<ProfileRecord>>(
    "/profile/avatar",
    {
      body: form,
      headers: authHeaders(token),
    },
  );
  return unwrapApiData(envelope);
}

export async function updateProfileServices(
  serviceIds: readonly number[],
): Promise<void> {
  const token = await readAccessToken();
  await httpPut<ApiEnvelope<unknown>>("/profile/services", {
    body: { service_ids: [...serviceIds] },
    headers: authHeaders(token),
  });
}

export async function updateProfileCities(
  cityIds: readonly number[],
): Promise<void> {
  const token = await readAccessToken();
  await httpPut<ApiEnvelope<unknown>>("/profile/cities", {
    body: { city_ids: [...cityIds] },
    headers: authHeaders(token),
  });
}

export function profileToUserAccount(profile: ProfileRecord): UserAccount {
  const displayName =
    [profile.name, profile.family].filter(Boolean).join(" ").trim() ||
    "کاربر";

  return {
    id: String(profile.id),
    displayName,
    avatarSrc: resolveMediaUrl(profile.image),
    mobileDisplay: profile.mobile
      ? maskMobile(profile.mobile)
      : undefined,
    city: profile.city?.name,
    cityId: profile.city ? String(profile.city.id) : undefined,
  };
}

function maskMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 7) {
    return mobile;
  }
  return `${digits.slice(0, 4)}***${digits.slice(-3)}`;
}
