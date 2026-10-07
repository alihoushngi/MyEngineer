import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import { env } from "@/lib/env/env";
import { footerDefaults } from "@/config/site.config/site.config";

const SETTINGS_REVALIDATE_SECONDS = 300;

export type SiteSettingsPhone = { label: string; number: string };
export type SiteSettingsSocial = { key: string; label: string; url: string };

export type SiteSettings = {
  name: string;
  tagline: string;
  address: string;
  phones: readonly SiteSettingsPhone[];
  email: string | null;
  socials: readonly SiteSettingsSocial[];
  copyright: string;
};

type BackendSiteSettings = {
  name?: string | null;
  tagline?: string | null;
  address?: string | null;
  phones?: readonly { label?: string | null; number?: string | null }[] | null;
  email?: string | null;
  socials?:
    | readonly {
        key?: string | null;
        label?: string | null;
        url?: string | null;
      }[]
    | null;
  copyright?: string | null;
};

export function getDefaultSiteSettings(): SiteSettings {
  return {
    name: footerDefaults.name,
    tagline: footerDefaults.tagline,
    address: footerDefaults.address,
    phones: footerDefaults.phones,
    email: footerDefaults.email,
    socials: footerDefaults.socials,
    copyright: footerDefaults.copyright,
  };
}

export function mapSiteSettings(raw: BackendSiteSettings): SiteSettings {
  const defaults = getDefaultSiteSettings();

  return {
    name: raw.name?.trim() || defaults.name,
    tagline: raw.tagline?.trim() || defaults.tagline,
    address: raw.address?.trim() || defaults.address,
    phones: (raw.phones ?? [])
      .filter((phone) => phone.number?.trim())
      .map((phone) => ({
        label: phone.label?.trim() ?? "",
        number: phone.number?.trim() ?? "",
      })),
    email: raw.email?.trim() || null,
    socials: (raw.socials ?? [])
      .filter((social) => social.url?.trim())
      .map((social) => ({
        key: social.key?.trim().toLowerCase() ?? "",
        label: social.label?.trim() ?? social.key ?? "",
        url: social.url?.trim() ?? "",
      })),
    copyright: raw.copyright?.trim() || defaults.copyright,
  };
}

/** Fail-soft: returns static defaults when the endpoint is missing or errors. */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!env.apiBaseUrl) {
    return getDefaultSiteSettings();
  }

  try {
    const envelope = await httpGet<ApiEnvelope<BackendSiteSettings>>(
      "/site-settings",
      { next: { revalidate: SETTINGS_REVALIDATE_SECONDS } },
    );
    return mapSiteSettings(unwrapApiData(envelope) ?? {});
  } catch {
    return getDefaultSiteSettings();
  }
}
