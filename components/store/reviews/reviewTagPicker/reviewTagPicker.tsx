"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";

import { cn } from "@/lib/utils/cn/cn";

import {
  getReviewTags,
  type ReviewTagOption,
} from "@/services/review-service/review-tags-service";

type ReviewTagPickerProps = {
  selectedIds: readonly number[];
  onChange: (ids: readonly number[]) => void;
  disabled?: boolean;
};

type TagKind = "positive" | "negative";

export function ReviewTagPicker({
  selectedIds,
  onChange,
  disabled = false,
}: ReviewTagPickerProps) {
  const [kind, setKind] = useState<TagKind>("positive");
  const { data } = useQuery({
    queryKey: ["review-tags"],
    queryFn: getReviewTags,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const groups = data ?? { positive: [], negative: [] };

  if (groups.positive.length === 0 && groups.negative.length === 0) {
    return null;
  }

  const options: readonly ReviewTagOption[] = groups[kind];
  const selected = new Set(selectedIds);

  function toggle(id: number) {
    onChange(
      selected.has(id)
        ? selectedIds.filter((item) => item !== id)
        : [...selectedIds, id],
    );
  }

  function countFor(group: readonly ReviewTagOption[]): number {
    return group.filter((tag) => selected.has(tag.id)).length;
  }

  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className="mb-3 type-label font-semibold text-foreground">
        {reviewsCopy.tagsLabel}
      </legend>

      <Tabs
        value={kind}
        onValueChange={(next) => {
          setKind(next as TagKind);
        }}
      >
        <TabsList aria-label={reviewsCopy.tagsLabel}>
          <TabsTrigger value="positive">
            {reviewsCopy.positiveTagsTab}
            {countFor(groups.positive) > 0
              ? ` (${countFor(groups.positive)})`
              : ""}
          </TabsTrigger>
          <TabsTrigger value="negative">
            {reviewsCopy.negativeTagsTab}
            {countFor(groups.negative) > 0
              ? ` (${countFor(groups.negative)})`
              : ""}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ul className="mt-3 flex flex-wrap gap-2">
        {options.map((tag) => {
          const active = selected.has(tag.id);

          return (
            <li key={tag.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => {
                  toggle(tag.id);
                }}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-xl border px-3 type-caption font-medium outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
                  active
                    ? kind === "positive"
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-danger/40 bg-danger/10 text-danger"
                    : "border-border-subtle bg-surface text-foreground-muted hover:border-primary/30 hover:bg-primary-subtle hover:text-primary",
                )}
              >
                {tag.title}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
