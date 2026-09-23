import { EDUCATION_API_LEVELS } from "@/lib/registration/education-levels/education-levels";
import { type MockEngineerProfileSnapshot } from "@/types/store/engineer-auth.types";
import { type RegistrationWizardData } from "@/types/store/registration.types";

export function toMockEngineerProfileSnapshot(
  data: RegistrationWizardData,
): MockEngineerProfileSnapshot {
  const levelLabel =
    EDUCATION_API_LEVELS.find((item) => item.id === data.education?.level)
      ?.label ?? data.education?.level;

  return {
    firstName: data.personalInfo?.firstName,
    lastName: data.personalInfo?.lastName,
    cityId: data.serviceArea?.cityId,
    cityName: undefined,
    provinceId: data.serviceArea?.provinceId,
    provinceName: undefined,
    specialties: data.expertise?.expertiseIds,
    software: data.expertise?.softwareIds,
    experienceYears: data.resume?.experienceYears,
    resumeText: data.resume?.resumeText,
    educationLabels: levelLabel ? [levelLabel] : [],
    isOrganizationMember: data.organization?.isMember,
  };
}
