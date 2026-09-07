import Link from "next/link";
import { ArrowLeftIcon, UserPlusIcon } from "lucide-react";

import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export function EngineerLoginRegisterCrossLink() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-foreground-muted">
        <UserPlusIcon aria-hidden="true" className="size-4 text-primary" />
        <p className="type-body-sm">{engineerLoginCopy.registerPrefix}</p>
      </div>

      <Link
        href={storePaths.expertRegistration}
        className="group mt-2 inline-flex min-h-10 items-center gap-2 rounded-lg px-2 type-body-sm font-semibold text-primary outline-none transition-all duration-200 ease-in-out hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring"
      >
        {engineerLoginCopy.registerAction}
        <ArrowLeftIcon
          aria-hidden="true"
          className="size-4 transition-all duration-200 ease-in-out group-hover:-translate-x-1 motion-reduce:transform-none"
        />
      </Link>
    </div>
  );
}
