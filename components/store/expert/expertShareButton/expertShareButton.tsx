"use client";

import { CheckIcon, Share2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ShareStatus = "idle" | "copied" | "error";

type ExpertShareButtonProps = {
  title: string;
  path: `/experts/${string}`;
  className?: string;
};

export function ExpertShareButton({
  title,
  path,
  className,
}: ExpertShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>("idle");

  async function shareProfile() {
    const url = new URL(path, window.location.origin).toString();

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        setStatus("idle");
        return;
      }

      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      setStatus("error");
    }
  }

  const label =
    status === "copied"
      ? expertProfileCopy.shareCopied
      : status === "error"
        ? expertProfileCopy.shareRetry
        : expertProfileCopy.shareLabel;

  return (
    <div className={className}>
      <Button
        type="button"
        variant="ghost"
        className="w-full transition-all duration-200 ease-in-out border-white text-white"
        onClick={() => void shareProfile()}
        aria-label={expertProfileCopy.shareLabel}
      >
        {status === "copied" ? (
          <CheckIcon aria-hidden="true" />
        ) : (
          <Share2Icon aria-hidden="true" />
        )}
        {label}
      </Button>

      {status === "error" ? (
        <p
          className="mt-2 rounded-lg bg-danger/10 px-2.5 py-2 type-caption text-danger"
          role="status"
        >
          {expertProfileCopy.shareError}
        </p>
      ) : null}

      {status === "copied" ? (
        <p className="mt-2 type-caption text-primary" role="status">
          {expertProfileCopy.shareCopied}
        </p>
      ) : null}
    </div>
  );
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}
