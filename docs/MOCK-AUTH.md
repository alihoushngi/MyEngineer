# Mock Authentication (Development Only)

Frontend-only mock **engineer** and **customer** authentication for local
testing. Customer details live in [USER-AUTH.md](USER-AUTH.md).

**DO NOT ENABLE MOCK AUTH IN PRODUCTION.**

Even if the flags below are left `true`, mock authentication is forced off when
`NODE_ENV === "production"`.

## Config file

Source of truth:

[`config/mock-auth.config/mock-auth.config.ts`](../config/mock-auth.config/mock-auth.config.ts)

```ts
export const mockAuthConfig = {
  mockRegister: {
    enabled: false,
    otp: "12345",
    delayMs: 300,
    forceError: false,
  },
  mockLogin: {
    enabled: false,
    phone: "09115447316",
    otp: "12345",
    password: "admin1234",
    delayMs: 300,
    forceError: false,
  },
  mockUserRegister: {
    enabled: false,
    otp: "65432",
    delayMs: 300,
    forceError: false,
  },
  mockUserLogin: {
    enabled: false,
    phone: "09121112233",
    otp: "65432",
    password: "user1234",
    displayName: "سارا مشتری",
    delayMs: 300,
    forceError: false,
  },
};
```

Toggle:

- `mockRegister.enabled` / `mockLogin.enabled` (engineer)
- `mockUserRegister.enabled` / `mockUserLogin.enabled` (customer)

## Optional env overrides

These override the config flags when set. They still cannot enable mocks in
production.

```bash
NEXT_PUBLIC_ENABLE_MOCK_REGISTER=true
NEXT_PUBLIC_ENABLE_MOCK_LOGIN=true
NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER=true
NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN=true
```

Set either value to `false` to force that mock flow off.

## Safety

Effective mock mode is:

`resolveMockFlag(canUseMocks(), config.enabled, envOverride)` (an explicit development override may enable the mock while the config default is false)

`canUseMocks()` is `process.env.NODE_ENV !== "production"`.

Mock credentials are compared only inside server-side adapters. The UI never
hardcodes the test phone, OTP, or password.

When an API base is configured, existing live authentication and registration
adapters are available. Missing configuration or request failures remain errors;
there is no silent mock fallback after a real API error.

## Test login

Engineer values (development only):

| Field     | Value         |
| --------- | ------------- |
| Phone     | `09115447316` |
| Login OTP | `12345`       |
| Password  | `admin1234`   |

Customer values are different. See [USER-AUTH.md](USER-AUTH.md).

Registration OTP is **5 digits** (current registration UI): `12345`.

Registration national ID must be a valid Iranian national-ID checksum. Example:
`0499370899`.

## Mock registration

When `mockRegister.enabled` is effectively on:

1. Complete `/expert-registration` with Yup validation on every step.
2. Invalid data does not advance.
3. Direct URLs to later steps remain guarded.
4. Wizard state is kept in `sessionStorage` for refresh during the tab session.
5. Final submit creates a mock engineer session and shows the completion screen,
   then goes to `/engineer`.

## Mock login

Route: `/engineer/login`

Methods:

- OTP login (5 digits)
- Password login

After success: `router.replace("/engineer")`, or a safe internal `?next=`
Engineer Panel path.

Logged-in visits to `/engineer/login` redirect to `/engineer`.
Logged-in visits to registration (except completion) redirect to `/engineer`.
Logged-out visits to `/engineer/*` redirect to `/engineer/login`.

## Session

Development-only httpOnly cookies:

- `mm_mock_engineer_session=active`
- `mm_mock_engineer_profile` (registration overlay; no password, OTP, or national ID)

`getEngineerSession()` reads this boundary. The Engineer Panel UI does not
depend on mock internals.

Logout clears only those mock cookies (and mock wizard `sessionStorage`) and
returns to `/`.

## How to disable mocks

1. Set the relevant `enabled` flags to `false` in the config, or
2. Set the matching `NEXT_PUBLIC_ENABLE_MOCK_*` env vars to `false`, or
3. Build/run with `NODE_ENV=production`.

## Real API mode

The project now has live login, OTP, role selection, password recovery,
registration and profile adapters in `services/auth-api-service/`,
`services/auth-service/`, and `services/registration-service/`. Live workspace
adapters are available for customers and engineers. See [API-CONTRACTS.md](API-CONTRACTS.md).

All four mock config flags are false by default; OTP length is the shared
`OTP_LENGTH = 5`. Catalog fixtures do not grant authentication. This document
records explicit development mode only, not production credentials or API
verification. The 2026-10-10 alignment does not change protected auth code.
