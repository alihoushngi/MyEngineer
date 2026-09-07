import Link from "next/link";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { registrationCopy } from "@/config/registration.config/registration.config";

export function RegistrationLoginCrossLink() {
  return (
    <p className="type-body-sm text-foreground-muted">
      {registrationCopy.loginCrossLinkPrefix}{" "}
      <Link
        href={storePaths.engineerLogin}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {registrationCopy.loginCrossLinkAction}
      </Link>
    </p>
  );
}
