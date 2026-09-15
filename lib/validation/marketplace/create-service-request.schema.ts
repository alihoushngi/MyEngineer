import * as yup from "yup";
import { type ServiceSlug } from "@/config/services.config/services.config";

export const createServiceRequestSchema = yup.object({
  expertId: yup.string().trim().required("متخصص را انتخاب کنید."),
  serviceSlug: yup.string().required("خدمت را انتخاب کنید."),
  cityId: yup.string().trim().required("شهر را انتخاب کنید."),
  description: yup
    .string()
    .trim()
    .required("شرح نیاز را بنویسید.")
    .min(20, "شرح نیاز باید دست‌کم بیست نویسه باشد."),
});

export type CreateServiceRequestFormValues = yup.InferType<
  typeof createServiceRequestSchema
>;

export function isCreateServiceSlug(value: string): value is ServiceSlug {
  return value.trim().length > 0;
}
