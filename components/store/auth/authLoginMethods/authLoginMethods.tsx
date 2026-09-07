import { type ReactNode } from "react";
import { KeyRoundIcon, MessageSquareCodeIcon } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";

type AuthLoginMethodsProps = {
  otpLabel: string;
  passwordLabel: string;
  otp: ReactNode;
  password: ReactNode;
};

export function AuthLoginMethods({
  otpLabel,
  passwordLabel,
  otp,
  password,
}: AuthLoginMethodsProps) {
  return (
    <Tabs defaultValue="otp" className="gap-6">
      <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-surface-muted p-1">
        <TabsTrigger
          value="otp"
          className="min-h-11 gap-2 whitespace-normal rounded-xl transition-all duration-200 ease-in-out text-xs! font-semibold!"
        >
          <MessageSquareCodeIcon aria-hidden="true" className="size-4" />
          {otpLabel}
        </TabsTrigger>

        <TabsTrigger
          value="password"
          className="min-h-11 gap-2 whitespace-normal rounded-xl transition-all duration-200 ease-in-out text-xs! font-semibold!"
        >
          <KeyRoundIcon aria-hidden="true" className="size-4" />
          {passwordLabel}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="otp">{otp}</TabsContent>
      <TabsContent value="password">{password}</TabsContent>
    </Tabs>
  );
}
