"use client";

import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { UserRegisterLoginCrossLink } from "@/components/store/userRegister/userRegisterLoginCrossLink/userRegisterLoginCrossLink";
import { UserRegisterOtpStep } from "@/components/store/userRegister/userRegisterOtpStep/userRegisterOtpStep";
import { UserRegisterPhoneStep } from "@/components/store/userRegister/userRegisterPhoneStep/userRegisterPhoneStep";
import { UserRegisterProfileStep } from "@/components/store/userRegister/userRegisterProfileStep/userRegisterProfileStep";

import { OTP_RESEND_COOLDOWN_SECONDS } from "@/config/registration.config/registration.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  loginOtpSchema,
  type LoginOtpData,
} from "@/lib/validation/login/login-otp.schema";
import {
  loginPhoneSchema,
  type LoginPhoneData,
} from "@/lib/validation/login/login-phone.schema";
import {
  userRegisterProfileSchema,
  type UserRegisterProfileData,
} from "@/lib/validation/user/user-register.schema";
import { cn } from "@/lib/utils/cn/cn";

import {
  completeUserRegister,
  requestUserRegisterOtp,
  verifyUserRegisterOtp,
} from "@/services/user-auth-service/user-auth-service";

type UserRegisterFormProps = {
  nextPath: string;
  isMockMode: boolean;
};

type RegisterPhase = "phone" | "otp" | "profile";

const REGISTER_PHASES: readonly {
  id: RegisterPhase;
  label: string;
}[] = [
  { id: "phone", label: userAuthCopy.phoneLabel },
  { id: "otp", label: userAuthCopy.otpLabel },
  { id: "profile", label: userAuthCopy.completeRegisterLabel },
];

export function UserRegisterForm({
  nextPath,
  isMockMode,
}: UserRegisterFormProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<RegisterPhase>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const requestMutation = useApiMutation(requestUserRegisterOtp);

  const verifyMutation = useApiMutation(({ code }: { code: string }) =>
    verifyUserRegisterOtp(phone, code),
  );

  const completeMutation = useApiMutation((profile: UserRegisterProfileData) =>
    completeUserRegister({
      phone,
      otp,
      displayName: profile.displayName,
      password: profile.password,
    }),
  );

  const { secondsLeft, canResend, restartTimer } = useOtpTimer(
    OTP_RESEND_COOLDOWN_SECONDS,
  );

  const phoneForm = useForm<LoginPhoneData>({
    resolver: yupResolver(loginPhoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<LoginOtpData>({
    resolver: yupResolver(loginOtpSchema),
    defaultValues: { code: "" },
  });

  const profileForm = useForm<UserRegisterProfileData>({
    resolver: yupResolver(userRegisterProfileSchema),
    defaultValues: { displayName: "", password: "" },
  });

  const isBusy =
    phoneForm.formState.isSubmitting ||
    otpForm.formState.isSubmitting ||
    profileForm.formState.isSubmitting ||
    requestMutation.isPending ||
    verifyMutation.isPending ||
    completeMutation.isPending;

  const currentPhaseIndex = REGISTER_PHASES.findIndex(
    (item) => item.id === phase,
  );

  async function onRequestOtp(formData: LoginPhoneData) {
    setAuthError(null);

    try {
      await requestMutation.mutateAsync(formData.phone);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
      return;
    }

    setPhone(formData.phone);
    setPhase("otp");
    otpForm.reset({ code: "" });
    restartTimer();
  }

  async function onVerify(formData: LoginOtpData) {
    setAuthError(null);

    try {
      await verifyMutation.mutateAsync({ code: formData.code });
    } catch (error) {
      setAuthError(toUserErrorMessage(error, "کد واردشده صحیح نیست."));
      return;
    }

    setOtp(formData.code);
    setPhase("profile");
  }

  async function onComplete(formData: UserRegisterProfileData) {
    setAuthError(null);

    try {
      await completeMutation.mutateAsync(formData);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  async function onResend() {
    if (!canResend || phone === "") {
      return;
    }

    setAuthError(null);

    try {
      await requestMutation.mutateAsync(phone);
      otpForm.reset({ code: "" });
      restartTimer();
    } catch (error) {
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
    }
  }

  return (
    <AuthLoginCard
      title={userAuthCopy.registerTitle}
      description={userAuthCopy.registerDescription}
      isMockMode={isMockMode}
      footer={<UserRegisterLoginCrossLink nextPath={nextPath} />}
    >
      <ol
        aria-label={userAuthCopy.registerTitle}
        className="mb-6 grid grid-cols-3 gap-2"
      >
        {REGISTER_PHASES.map((item, index) => {
          const active = index === currentPhaseIndex;
          const completed = index < currentPhaseIndex;

          return (
            <li
              key={item.id}
              aria-current={active ? "step" : undefined}
              className="min-w-0"
            >
              <div
                className={cn(
                  "flex h-1.5 overflow-hidden rounded-full bg-surface-muted transition-all duration-200 ease-in-out",
                  (active || completed) && "bg-primary",
                )}
              />

              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border type-caption transition-all duration-200 ease-in-out",
                    completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary bg-primary-subtle text-primary"
                        : "border-border-subtle bg-surface text-foreground-subtle",
                  )}
                >
                  {completed ? (
                    <CheckIcon aria-hidden="true" className="size-3" />
                  ) : (
                    index + 1
                  )}
                </span>

                <span
                  className={cn(
                    "truncate type-caption transition-all duration-200 ease-in-out",
                    active
                      ? "font-semibold text-primary"
                      : "text-foreground-muted",
                  )}
                >
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {phase === "phone" ? (
        <UserRegisterPhoneStep
          form={phoneForm}
          authError={authError}
          isBusy={isBusy}
          onSubmit={onRequestOtp}
        />
      ) : null}

      {phase === "otp" ? (
        <UserRegisterOtpStep
          form={otpForm}
          authError={authError}
          isBusy={isBusy}
          canResend={canResend}
          secondsLeft={secondsLeft}
          isResending={requestMutation.isPending}
          onSubmit={onVerify}
          onEditPhone={() => {
            setPhase("phone");
            setAuthError(null);
          }}
          onResend={() => {
            void onResend();
          }}
          onOtpChange={() => {
            setAuthError(null);
          }}
        />
      ) : null}

      {phase === "profile" ? (
        <UserRegisterProfileStep
          form={profileForm}
          authError={authError}
          isBusy={isBusy}
          onSubmit={onComplete}
        />
      ) : null}
    </AuthLoginCard>
  );
}
