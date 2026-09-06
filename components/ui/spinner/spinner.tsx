import { Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils/cn/cn";

type SpinnerProps = ComponentProps<"svg">;

export function Spinner({ className, ...props }: SpinnerProps) {
  const isHidden =
    props["aria-hidden"] === true || props["aria-hidden"] === "true";

  return (
    <Loader2Icon
      data-slot="spinner"
      role={isHidden ? undefined : "status"}
      aria-label={isHidden ? undefined : "در حال بارگذاری"}
      className={cn(
        `
          size-4
          shrink-0

          animate-spin

          text-current

          motion-reduce:animate-none
        `,
        className,
      )}
      {...props}
    />
  );
}
