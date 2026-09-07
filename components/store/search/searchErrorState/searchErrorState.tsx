"use client";

import { CircleAlertIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";

import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";

import { storePaths } from "@/config/navigation.config/navigation.config";
import { searchCopy } from "@/config/search.config/search.config";

type SearchErrorStateProps = {
  onRetry: () => void;
};

export function SearchErrorState({ onRetry }: SearchErrorStateProps) {
  return (
    <div className="container-app py-page">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <Alert variant="danger" className="rounded-2xl">
          <CircleAlertIcon aria-hidden="true" />
          <AlertTitle>{searchCopy.errorTitle}</AlertTitle>
          <AlertDescription>{searchCopy.errorDescription}</AlertDescription>
        </Alert>

        <div className="rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs sm:p-5">
          <SearchInput
            id="search-error-query"
            initialQuery=""
            navigateOnClear={false}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            icon={<RotateCcwIcon aria-hidden="true" />}
            onClick={onRetry}
          >
            {searchCopy.retryLabel}
          </Button>

          <Button asChild variant="outline">
            <Link href={storePaths.search}>{searchCopy.changeSearchLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
