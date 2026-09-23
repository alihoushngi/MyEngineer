"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getCitiesByProvince,
} from "@/services/city-service/city-service";
import { type City, type Province } from "@/types/store/registration.types";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";

type UseProvinceCitiesReturn = {
  provinces: readonly Province[];
  cities: readonly City[];
  isLoadingProvinces: boolean;
  isLoadingCities: boolean;
  provinceError: string | null;
  cityError: string | null;
  retryProvinces: () => void;
  retryCities: () => void;
  selectedProvinceId: string;
  setSelectedProvince: (provinceId: string) => void;
};

const PROVINCE_ERROR_FALLBACK = "خطا در بارگذاری استان‌ها";
const CITY_ERROR_FALLBACK = "خطا در بارگذاری شهرها";

export function useProvinceCities(options?: {
  initialProvinceId?: string;
}): UseProvinceCitiesReturn {
  const [selectedProvinceId, setSelectedProvinceId] = useState(
    options?.initialProvinceId ?? "",
  );

  const provincesQuery = useQuery({
    queryKey: ["registration", "provinces"],
    queryFn: getProvinces,
    retry: false,
  });

  const citiesQuery = useQuery({
    queryKey: ["registration", "cities", selectedProvinceId],
    queryFn: () => getCitiesByProvince(selectedProvinceId),
    enabled: selectedProvinceId !== "",
    retry: false,
  });

  const retryProvinces = () => {
    void provincesQuery.refetch();
  };

  const retryCities = () => {
    void citiesQuery.refetch();
  };

  const setSelectedProvince = useCallback((provinceId: string) => {
    setSelectedProvinceId(provinceId);
  }, []);

  return {
    provinces: provincesQuery.data ?? [],
    cities: citiesQuery.data ?? [],
    isLoadingProvinces: provincesQuery.isPending,
    isLoadingCities: selectedProvinceId !== "" && citiesQuery.isPending,
    provinceError: provincesQuery.error
      ? toUserErrorMessage(provincesQuery.error, PROVINCE_ERROR_FALLBACK)
      : null,
    cityError: citiesQuery.error
      ? toUserErrorMessage(citiesQuery.error, CITY_ERROR_FALLBACK)
      : null,
    retryProvinces,
    retryCities,
    selectedProvinceId,
    setSelectedProvince,
  };
}
