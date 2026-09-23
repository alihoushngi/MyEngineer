import { type MockEngineerProfileSnapshot } from "@/types/store/engineer-auth.types";
import { type MockExpertiseCatalog } from "@/lib/mock-data/registration-expertise-catalog/registration-expertise-catalog";
import { type EducationApiLevel } from "@/lib/registration/education-levels/education-levels";

export type SendOtpRequest = {
  phone: string;
  nationalId: string;
};

export type VerifyOtpRequest = {
  phone: string;
  code: string;
};

export type SaveServiceAreaRequest = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

export type SaveExpertiseRequest = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
};

export type SavePersonalInfoRequest = {
  firstName: string;
  lastName: string;
  avatarUploadId?: string;
};

export type SaveEducationRequest = {
  level: EducationApiLevel;
  fieldIds: readonly string[];
  university?: string;
  degreeFileUploadIds?: Readonly<Record<string, string>>;
};

export type SaveOrganizationRequest = {
  isMember: boolean;
  membershipNumber?: string;
  hasLicense?: boolean;
  licenseNumber?: string;
  licenseUploadId?: string;
  disciplineId?: string;
  qualificationIds?: readonly string[];
};

export type SaveResumeRequest = {
  experienceYears: number;
  resumeText: string;
};

export type SubmitRegistrationRequest = {
  imageCount: number;
  certificateCount: number;
  acceptRules: true;
  imageUploadIds?: readonly string[];
  certificates?: readonly { title: string; uploadId?: string }[];
  profile?: MockEngineerProfileSnapshot;
};

export type ExpertiseCatalogResult = MockExpertiseCatalog;
