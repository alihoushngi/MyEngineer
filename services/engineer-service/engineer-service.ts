/**
 * Engineer workspace mutations and client-safe catalog reads.
 * Session access lives in engineer-access-service.ts (server-only).
 */

import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { logoutEngineer } from "@/services/engineer-auth-service/engineer-auth-service";
import { sendMessage } from "@/services/messaging-service/messaging-service";
import {
  getCitiesByProvince,
  getProvinces,
} from "@/services/city-service/city-service";
import { listCatalogCities } from "@/services/catalog-service/catalog-service";
import { type City, type Province } from "@/types/store/registration.types";

const WRITE_UNAVAILABLE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

export type SendEngineerMessageRequest = {
  conversationId: string;
  body: string;
};

export type AddEngineerPortfolioItemRequest = {
  title: string;
  description?: string;
};

export async function sendEngineerMessage(
  request: SendEngineerMessageRequest,
): Promise<void> {
  await sendMessage(request);
}

export async function addEngineerPortfolioItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: AddEngineerPortfolioItemRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function removeEngineerPortfolioItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function markEngineerNotificationRead(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function signOutEngineer(): Promise<void> {
  await logoutEngineer();
}

export async function getEngineerLocationCatalog(): Promise<{
  provinces: readonly Province[];
  cities: readonly City[];
}> {
  try {
    const [provinces, cities] = await Promise.all([
      getProvinces(),
      listCatalogCities(),
    ]);
    return { provinces, cities };
  } catch {
    return { provinces: [], cities: [] };
  }
}

export async function getEngineerCitiesByProvince(
  provinceId: string,
): Promise<readonly City[]> {
  try {
    return await getCitiesByProvince(provinceId);
  } catch {
    return [];
  }
}
