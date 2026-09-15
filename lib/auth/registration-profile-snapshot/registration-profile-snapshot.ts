import { registrationCopy } from "@/config/registration.config/registration.config";
import { type MockEngineerProfileSnapshot } from "@/types/store/engineer-auth.types";
import {
  type DegreeKey,
  type RegistrationWizardData,
} from "@/types/store/registration.types";

const DEGREE_LABELS: Record<DegreeKey, string> = {
  associate: registrationCopy.degreeAssociate,
  bachelor: registrationCopy.degreeBachelor,
  master: registrationCopy.degreeMaster,
  doctorate: registrationCopy.degreeDoctorate,
  diploma: registrationCopy.degreeDiploma,
};

export function toMockEngineerProfileSnapshot(
  data: RegistrationWizardData,
): MockEngineerProfileSnapshot {
  const educationLabels =
    data.education?.level === "diplomaOrLower"
      ? ["دیپلم"]
      : (data.education?.degrees ?? []).map((key) => DEGREE_LABELS[key] ?? key);

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
    educationLabels,
    isOrganizationMember: data.organization?.isMember,
  };
}
