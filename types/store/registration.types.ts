import { type EducationApiLevel } from "@/lib/registration/education-levels/education-levels";

export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
  provinceId: string;
};

export type RegistrationIdentityData = {
  phone: string;
  nationalId: string;
};

export type RegistrationServiceAreaData = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

export type RegistrationExpertiseData = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
};

export type RegistrationPersonalInfoData = {
  firstName: string;
  lastName: string;
  avatarUploadId?: string;
};

export type { EducationApiLevel };

export type RegistrationEducationData = {
  level: EducationApiLevel;
  fieldIds: readonly string[];
  university?: string;
  degreeFileUploadIds: Readonly<Record<string, string>>;
};

export type RegistrationOrganizationData = {
  isMember: boolean;
  membershipNumber?: string;
  hasLicense?: boolean;
  licenseNumber?: string;
  licenseUploadId?: string;
  disciplineId?: string;
  qualificationIds?: readonly string[];
};

export type RegistrationResumeData = {
  experienceYears: number;
  resumeText: string;
};

export type PortfolioImageEntry = {
  id: string;
  file: File;
  uploadId?: string;
};

export type CertificateEntry = {
  id: string;
  title: string;
  file?: File;
  uploadId?: string;
};

export type RegistrationPortfolioData = {
  images: readonly PortfolioImageEntry[];
  certificates: readonly CertificateEntry[];
  acceptRules: true;
};

export type RegistrationWizardData = {
  identity?: RegistrationIdentityData;
  otpVerified?: boolean;
  serviceArea?: RegistrationServiceAreaData;
  expertise?: RegistrationExpertiseData;
  personalInfo?: RegistrationPersonalInfoData;
  education?: RegistrationEducationData;
  organization?: RegistrationOrganizationData;
  resume?: RegistrationResumeData;
  portfolio?: RegistrationPortfolioData;
  submitted?: boolean;
};

export type RegistrationMaxStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
