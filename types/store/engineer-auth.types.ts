export type EngineerSessionSource = "login" | "registration";

export type MockEngineerProfileSnapshot = {
  firstName?: string;
  lastName?: string;
  profession?: string;
  cityId?: string;
  cityName?: string;
  provinceId?: string;
  provinceName?: string;
  specialties?: readonly string[];
  software?: readonly string[];
  experienceYears?: number;
  resumeText?: string;
  educationLabels?: readonly string[];
  isOrganizationMember?: boolean;
};

export type EngineerSession = {
  isAuthenticated: true;
  role: "engineer";
  isMock: boolean;
  source: EngineerSessionSource;
  profile?: MockEngineerProfileSnapshot;
};

export type ServiceMutationFailure = {
  ok: false;
  message: string;
  status: number;
  code: "unavailable" | "unauthorized" | "validation" | "server";
  /** Per-field validation messages from the API, keyed by field name. */
  fieldErrors?: Readonly<Record<string, string>>;
};

export type ServiceMutationResult =
  | { ok: true; message?: string }
  | ServiceMutationFailure;
