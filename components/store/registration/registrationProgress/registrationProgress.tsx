import { Progress } from "@/components/ui/progress/progress";
import { TOTAL_REGISTRATION_STEPS } from "@/config/registration.config/registration.config";

type RegistrationProgressProps = {
  currentStep: number;
};

export function RegistrationProgress({
  currentStep,
}: RegistrationProgressProps) {
  const progressValue = (currentStep / TOTAL_REGISTRATION_STEPS) * 100;

  return (
    <Progress
      value={progressValue}
      className="h-1.5"
      aria-label={`پیشرفت ثبت‌نام: مرحله ${currentStep} از ${TOTAL_REGISTRATION_STEPS}`}
    />
  );
}
