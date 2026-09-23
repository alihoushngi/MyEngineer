import * as yup from "yup";

export const organizationStepSchema = yup.object({
  isMember: yup.mixed<"yes" | "no">().oneOf(["yes", "no"]).required(),
  membershipNumber: yup.string().when("isMember", {
    is: "yes",
    then: (schema) => schema.trim().required("شماره عضویت الزامی است."),
    otherwise: (schema) => schema,
  }),
  hasLicense: yup.mixed<"yes" | "no">().oneOf(["yes", "no"]).required(),
  licenseNumber: yup.string().when(["isMember", "hasLicense"], {
    is: (isMember: string, hasLicense: string) =>
      isMember === "yes" && hasLicense === "yes",
    then: (schema) => schema.trim().required("شماره پروانه الزامی است."),
    otherwise: (schema) => schema,
  }),
  disciplineId: yup.string().when(["isMember", "hasLicense"], {
    is: (isMember: string, hasLicense: string) =>
      isMember === "yes" && hasLicense === "yes",
    then: (schema) => schema.required("انتخاب رشته الزامی است."),
    otherwise: (schema) => schema,
  }),
  qualificationIds: yup.array(yup.string().required()).default([]),
});

export type OrganizationStepData = yup.InferType<typeof organizationStepSchema>;
