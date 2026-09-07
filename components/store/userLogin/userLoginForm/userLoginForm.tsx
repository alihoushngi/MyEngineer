"use client";

import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { AuthLoginMethods } from "@/components/store/auth/authLoginMethods/authLoginMethods";
import { AuthOtpLoginForm } from "@/components/store/auth/authOtpLoginForm/authOtpLoginForm";
import { AuthPasswordLoginForm } from "@/components/store/auth/authPasswordLoginForm/authPasswordLoginForm";
import { UserLoginRegisterCrossLink } from "@/components/store/userLogin/userLoginRegisterCrossLink/userLoginRegisterCrossLink";

import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";

import {
  loginUserWithOtp,
  loginUserWithPassword,
  requestUserLoginOtp,
} from "@/services/user-auth-service/user-auth-service";

type UserLoginFormProps = {
  nextPath: string;
  isMockMode: boolean;
};

export function UserLoginForm({ nextPath, isMockMode }: UserLoginFormProps) {
  return (
    <AuthLoginCard
      title={userAuthCopy.loginTitle}
      description={userAuthCopy.loginDescription}
      isMockMode={isMockMode}
      footer={<UserLoginRegisterCrossLink nextPath={nextPath} />}
    >
      <AuthLoginMethods
        otpLabel={userAuthCopy.otpMethod}
        passwordLabel={userAuthCopy.passwordMethod}
        otp={
          <AuthOtpLoginForm
            nextPath={nextPath}
            idPrefix="user-login"
            copy={userAuthCopy}
            requestOtp={requestUserLoginOtp}
            verifyOtp={loginUserWithOtp}
          />
        }
        password={
          <AuthPasswordLoginForm
            nextPath={nextPath}
            idPrefix="user-login"
            copy={userAuthCopy}
            loginWithPassword={loginUserWithPassword}
          />
        }
      />
    </AuthLoginCard>
  );
}
