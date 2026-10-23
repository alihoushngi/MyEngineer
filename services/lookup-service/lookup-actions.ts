"use server";

import { listServiceCategories } from "@/services/lookup-service/lookup-service";

export async function listPublicServiceCategoriesAction() {
  return listServiceCategories();
}
