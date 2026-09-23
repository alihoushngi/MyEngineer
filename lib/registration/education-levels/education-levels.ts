export const EDUCATION_API_LEVELS = [
  { id: "zire_diplom", label: "زیر دیپلم" },
  { id: "diplom", label: "دیپلم" },
  { id: "kardani", label: "کاردانی" },
  { id: "karshenasi", label: "کارشناسی" },
  { id: "arshad", label: "کارشناسی ارشد" },
  { id: "doctori", label: "دکتری" },
] as const;

export type EducationApiLevel = (typeof EDUCATION_API_LEVELS)[number]["id"];

export function isEducationApiLevel(value: string): value is EducationApiLevel {
  return EDUCATION_API_LEVELS.some((item) => item.id === value);
}

export type EducationDegreePayload = {
  field_id: number;
  university?: string | null;
};

export function mapEducationToApi(input: {
  level: string;
  fieldIds: readonly string[];
  university?: string;
  uploadIds?: Readonly<Record<string, string | null | undefined>>;
}): {
  level: EducationApiLevel;
  degrees: EducationDegreePayload[];
  degree_file_upload_ids: (string | null)[];
} {
  if (!isEducationApiLevel(input.level)) {
    throw new Error("مقطع تحصیلی معتبر نیست.");
  }

  const university = input.university?.trim() || null;
  const degrees: EducationDegreePayload[] = [];
  const uploadIds: (string | null)[] = [];

  for (const fieldId of input.fieldIds) {
    const id = Number(fieldId);
    if (!Number.isFinite(id) || id <= 0) {
      continue;
    }

    degrees.push({
      field_id: id,
      university,
    });
    const uploaded = input.uploadIds?.[String(id)]?.trim();
    uploadIds.push(uploaded ? uploaded : null);
  }

  return {
    level: input.level,
    degrees,
    degree_file_upload_ids: uploadIds,
  };
}
