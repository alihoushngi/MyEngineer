import {
  type RegistrationMaxStep,
  type RegistrationWizardData,
} from "@/types/store/registration.types";

const STORAGE_KEY = "mm_mock_registration_wizard";

export type PersistedRegistrationWizard = {
  data: RegistrationWizardData;
  maxStep: RegistrationMaxStep;
};

export function readMockRegistrationWizard(): PersistedRegistrationWizard | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isPersisted(parsed)) {
      return null;
    }

    return {
      data: stripFiles(parsed.data),
      maxStep: parsed.maxStep,
    };
  } catch {
    return null;
  }
}

export function writeMockRegistrationWizard(
  state: PersistedRegistrationWizard,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      data: stripFiles(state.data),
      maxStep: state.maxStep,
    }),
  );
}

export function clearMockRegistrationWizard(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(STORAGE_KEY);
}

function stripFiles(data: RegistrationWizardData): RegistrationWizardData {
  return {
    ...data,
    personalInfo: data.personalInfo
      ? {
          firstName: data.personalInfo.firstName,
          lastName: data.personalInfo.lastName,
          avatarUploadId: data.personalInfo.avatarUploadId,
        }
      : undefined,
    education: data.education
      ? {
          ...data.education,
          degreeFileUploadIds: data.education.degreeFileUploadIds ?? {},
        }
      : undefined,
    organization: data.organization
      ? {
          ...data.organization,
        }
      : undefined,
    portfolio: data.portfolio
      ? {
          acceptRules: true,
          images: [],
          certificates: data.portfolio.certificates.map((item) => ({
            id: item.id,
            title: item.title,
          })),
        }
      : undefined,
  };
}

function isPersisted(value: unknown): value is PersistedRegistrationWizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  const maxStep = record.maxStep;

  return (
    typeof record.data === "object" &&
    record.data !== null &&
    typeof maxStep === "number" &&
    maxStep >= 1 &&
    maxStep <= 9
  );
}
