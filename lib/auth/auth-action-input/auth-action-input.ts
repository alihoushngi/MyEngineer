import { z } from "zod";

const audience = z.enum(["user", "engineer"]);
const purpose = z.enum(["account_activation", "login", "password_reset"]);
const mobile = z
  .string()
  .trim()
  .regex(/^09\d{9}$/);
const nextPath = z.string().max(2048).optional();
const password = z.string().min(1).max(1024);
const newPassword = password
  .min(8)
  .regex(/[A-Za-z]/)
  .regex(/\d/);
// The backend owns the OTP length and validity; reject oversized/non-digit input.
const code = z
  .string()
  .trim()
  .regex(/^\d{1,12}$/);

export const loginActionInput = z.object({
  melli: z
    .string()
    .trim()
    .regex(/^\d{10}$/),
  password,
  audience,
  nextPath,
});

export const selectRoleActionInput = z.object({
  role: z.enum([
    "admin",
    "user",
    "assistant",
    "engineer",
    "consulter",
    "insurance",
  ]),
  audience,
  nextPath,
});

export const requestOtpActionInput = z.object({ mobile, purpose });

export const verifyOtpActionInput = z.object({
  mobile,
  purpose,
  code,
  audience: audience.optional(),
  nextPath,
});

export const registerActionInput = z
  .object({
    name: z.string().trim().min(1).max(100),
    family: z.string().trim().min(1).max(100),
    mobile,
    melli: z
      .string()
      .trim()
      .regex(/^\d{10}$/),
    email: z
      .union([z.string().trim().email().max(254), z.literal("")])
      .optional(),
    password: newPassword,
    password_confirmation: password,
  })
  .refine((input) => input.password === input.password_confirmation);

export const resetPasswordActionInput = z
  .object({
    password: newPassword,
    password_confirmation: password,
  })
  .refine((input) => input.password === input.password_confirmation);

export const userRegisterOtpActionInput = z.object({ phone: mobile });
export const userRegisterVerifyActionInput = z.object({
  phone: mobile,
  otp: code,
});
export const userRegisterCompleteActionInput = z.object({
  phone: mobile,
  otp: code,
  displayName: z.string().trim().min(2).max(100),
  password: password.min(8),
});
