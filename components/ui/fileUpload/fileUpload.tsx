"use client";

import { UploadCloudIcon } from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn/cn";

type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
};

export function FileUpload({
  className,
  label = "انتخاب پرونده",
  description,
  invalid = false,
  disabled = false,
  onChange,
  multiple,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  function openPicker() {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setIsDragging(true);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    event.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragging(false);

    if (disabled || !inputRef.current) {
      return;
    }

    const files = event.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const transfer = new DataTransfer();

    const selectedFiles = multiple
      ? Array.from(files)
      : [files.item(0)].filter((file): file is File => Boolean(file));

    selectedFiles.forEach((file) => {
      transfer.items.add(file);
    });

    inputRef.current.files = transfer.files;

    inputRef.current.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
  }

  return (
    <div
      data-slot="file-upload"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-dragging={isDragging || undefined}
      className={cn(
        `
          group/file-upload
          relative

          flex
          min-h-44
          w-full
          flex-col
          items-center
          justify-center
          gap-4

          overflow-hidden

          rounded-3xl
          border
          border-dashed
          border-border-interactive

          bg-surface-subtle

          px-5
          py-8

          text-center

          outline-none

          transition-[background-color,border-color,box-shadow,opacity]
          duration-(--duration-normal)
          ease-(--ease-standard)

          before:pointer-events-none
          before:absolute
          before:-top-20
          before:inset-s-1/2
          before:size-48
          before:-translate-x-1/2
          before:rounded-full
          before:bg-primary/5
          before:blur-3xl
          before:transition-[background-color,transform]
          before:duration-(--duration-slow)
          before:ease-(--ease-standard)

          data-[dragging=true]:border-primary
          data-[dragging=true]:bg-primary-subtle/50
          data-[dragging=true]:shadow-sm

          data-[dragging=true]:before:scale-125
          data-[dragging=true]:before:bg-primary/10

          data-[invalid=true]:border-danger
          data-[invalid=true]:bg-danger/5

          data-[disabled=true]:cursor-not-allowed
          data-[disabled=true]:opacity-55

          sm:min-h-48
          sm:px-8
          sm:py-10
        `,
        !disabled &&
          `
            hover:border-primary/50
            hover:bg-primary-subtle/25
          `,
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        data-slot="file-upload-icon"
        className="
          relative
          z-10

          flex
          size-14
          shrink-0
          items-center
          justify-center

          rounded-2xl
          border
          border-primary/10

          bg-primary-subtle
          text-primary

          shadow-sm

          transition-[background-color,transform,box-shadow]
          duration-(--duration-normal)
          ease-(--ease-standard)

          group-data-[dragging=true]/file-upload:scale-105
          group-data-[dragging=true]/file-upload:bg-primary/15
          group-data-[dragging=true]/file-upload:shadow-md

          motion-reduce:transform-none
        "
      >
        <UploadCloudIcon aria-hidden="true" className="size-6" />
      </div>

      <div
        className="
          relative
          z-10

          flex
          max-w-md
          flex-col
          items-center
          gap-1.5
        "
      >
        <button
          type="button"
          disabled={disabled}
          onClick={openPicker}
          className="
            inline-flex
            min-h-11
            items-center
            justify-center

            rounded-xl

            px-4

            type-button
            text-primary

            outline-none

            transition-[background-color,color,transform]
            duration-(--duration-fast)
            ease-(--ease-standard)

            hover:bg-primary-subtle
            hover:text-primary-hover

            active:scale-[0.98]

            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            focus-visible:ring-offset-surface-subtle

            disabled:pointer-events-none
            disabled:text-foreground-muted

            motion-reduce:transform-none
          "
        >
          {label}
        </button>

        {description ? (
          <div
            data-slot="file-upload-description"
            className="
              type-caption
              leading-relaxed
              text-foreground-muted

              group-data-[invalid=true]/file-upload:text-danger
            "
          >
            {description}
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        className="sr-only"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
