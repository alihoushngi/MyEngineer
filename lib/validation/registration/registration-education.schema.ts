import * as yup from "yup";
import {
  EDUCATION_API_LEVELS,
  type EducationApiLevel,
} from "@/lib/registration/education-levels/education-levels";

const LEVEL_IDS = EDUCATION_API_LEVELS.map((item) => item.id) as [
  EducationApiLevel,
  ...EducationApiLevel[],
];

export const educationStepSchema = yup.object({
  level: yup.mixed<EducationApiLevel>().oneOf(LEVEL_IDS).required(),
  fieldIds: yup
    .array(yup.string().required())
    .default([])
    .min(1, "حداقل یک رشته تحصیلی انتخاب کنید."),
  university: yup.string().trim().default(""),
});

export type EducationStepFormData = yup.InferType<typeof educationStepSchema>;
