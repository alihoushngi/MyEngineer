"use server";

import {
  getAllCities,
  getCitiesByProvince,
  getProvinces,
} from "@/services/city-service/city-service";

export async function listPublicProvincesAction() {
  return getProvinces();
}

export async function listPublicCitiesByProvinceAction(provinceId: string) {
  return getCitiesByProvince(provinceId);
}

export async function listPublicCitiesAction() {
  return getAllCities();
}
