import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn/cn";

type EmptyProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function Empty({
  icon,
  title,
  description,
  action,
  className,
}: EmptyProps) {
  return (
    <div
      data-slot="empty"
      role="status"
      className={cn(
        `
          relative

          flex
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          rounded-3xl
          border
          border-border-subtle

          bg-surface-subtle

          px-5
          py-10

          text-center

          shadow-xs

          before:pointer-events-none
          before:absolute
          before:-top-24
          before:inset-s-1/2
          before:size-56
          before:-translate-x-1/2
          before:rounded-full
          before:bg-primary/6
          before:blur-3xl

          sm:px-8
          sm:py-14
        `,
        className,
      )}
    >
      <div
        className="
          relative
          z-10

          flex
          w-full
          max-w-md
          flex-col
          items-center
        "
      >
        {icon ? (
          <div
            data-slot="empty-icon"
            className="
              mb-5

              flex
              size-16
              shrink-0
              items-center
              justify-center

              rounded-2xl
              border
              border-primary/10

              bg-primary-subtle
              text-primary

              shadow-sm

              [&_svg]:size-7
              [&_svg]:shrink-0
            "
          >
            {icon}
          </div>
        ) : null}

        <div
          data-slot="empty-content"
          className="
            flex
            min-w-0
            flex-col
            items-center
            gap-2
          "
        >
          <h2
            data-slot="empty-title"
            className="
              type-h3
              font-semibold
              text-foreground
            "
          >
            {title}
          </h2>

          {description ? (
            <div
              data-slot="empty-description"
              className="
                max-w-sm
                type-body-sm
                leading-relaxed
                text-foreground-muted
              "
            >
              {description}
            </div>
          ) : null}
        </div>

        {action ? (
          <div
            data-slot="empty-action"
            className="
              mt-6
              flex
              w-full
              flex-wrap
              items-center
              justify-center
              gap-2

              sm:w-auto
            "
          >
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}
