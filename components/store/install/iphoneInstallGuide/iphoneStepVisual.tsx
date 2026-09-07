import {
  CheckIcon,
  CompassIcon,
  HouseIcon,
  PlusSquareIcon,
  ShareIcon,
} from "lucide-react";

type IphoneStepVisualProps = {
  variant: "safari" | "share" | "add-menu" | "preview" | "confirm" | "home";
};

export function IphoneStepVisual({ variant }: IphoneStepVisualProps) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-56 w-36 shrink-0 flex-col overflow-hidden rounded-[2rem] border-[5px] border-primary-deep bg-surface shadow-md transition-all duration-200 ease-in-out group-hover:shadow-lg sm:mx-0"
    >
      <div className="relative flex h-5 shrink-0 justify-center bg-primary-deep">
        <span className="absolute top-0 h-3 w-14 rounded-b-xl bg-primary-deep-foreground/10" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-2.5">
        {variant === "safari" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary-subtle text-primary shadow-xs">
              <CompassIcon className="size-9" />
            </span>
            <span className="ltr-data rounded-lg bg-surface-muted px-2.5 py-1 text-[0.65rem] text-foreground-muted">
              Safari
            </span>
          </div>
        ) : null}

        {variant === "share" ? (
          <>
            <div className="mt-2 space-y-2">
              <div className="h-3 w-2/3 rounded-full bg-border-subtle" />
              <div className="h-20 rounded-xl bg-primary-subtle" />
              <div className="h-2.5 w-full rounded-full bg-border-subtle" />
              <div className="h-2.5 w-3/4 rounded-full bg-border-subtle" />
            </div>

            <div className="mt-auto flex items-center justify-around rounded-xl border border-border-subtle bg-surface-elevated py-2 text-primary shadow-xs">
              <span className="size-3 rounded-full border border-current" />
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary-subtle">
                <ShareIcon className="size-4" />
              </span>
              <span className="size-3 rounded-sm border border-current" />
            </div>
          </>
        ) : null}

        {variant === "add-menu" ? (
          <div className="mt-auto space-y-1.5 rounded-2xl border border-border-subtle bg-surface-elevated p-2 shadow-sm">
            <div className="h-5 rounded-lg bg-surface-muted" />

            <div className="flex items-center gap-1.5 rounded-lg bg-primary-subtle p-1.5 text-[0.52rem] font-medium text-primary">
              <PlusSquareIcon className="size-3 shrink-0" />
              <span className="ltr-data">Add to Home Screen</span>
            </div>

            <div className="h-5 rounded-lg bg-surface-muted" />
            <div className="h-5 rounded-lg bg-surface-muted" />
          </div>
        ) : null}

        {variant === "preview" ? (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-deep text-primary-deep-foreground shadow-sm">
              <HouseIcon className="size-7" />
            </div>

            <span className="type-caption font-medium text-foreground">
              مهندس من
            </span>

            <div className="mt-1 h-6 w-full rounded-lg border border-border-subtle bg-input-background" />
            <div className="h-2.5 w-3/4 rounded-full bg-border-subtle" />
          </div>
        ) : null}

        {variant === "confirm" ? (
          <div className="flex h-full flex-col">
            <div className="ltr-data flex items-center justify-between rounded-lg bg-surface-subtle px-2 py-1.5 text-[0.62rem] text-info">
              <span>Cancel</span>
              <span className="font-semibold">Add</span>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckIcon className="size-8" />
              </span>
            </div>
          </div>
        ) : null}

        {variant === "home" ? (
          <div className="grid flex-1 grid-cols-3 content-center gap-2 rounded-xl bg-primary-subtle/60 p-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="aspect-square rounded-xl border border-border-subtle bg-surface shadow-xs"
              />
            ))}

            <span className="flex aspect-square items-center justify-center rounded-xl bg-primary-deep text-primary-deep-foreground shadow-sm">
              <HouseIcon className="size-4" />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
