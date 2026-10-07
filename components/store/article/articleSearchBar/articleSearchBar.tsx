"use client";

import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { articlesCopy } from "@/config/articles.config/articles.config";

import {
  buildArticleHubQuery,
  type ArticleSort,
} from "@/lib/articles/article-query/article-query";

type ArticleSearchBarProps = {
  q: string;
  sort: ArticleSort;
  category: string;
};

export function ArticleSearchBar({ q, sort, category }: ArticleSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(q);

  function go(next: { q: string; sort: ArticleSort }) {
    const query = buildArticleHubQuery({ category, ...next });
    router.push(query === "" ? pathname : `${pathname}?${query}`, {
      scroll: false,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    go({ q: value, sort });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex min-w-0 flex-1 gap-2"
      >
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle"
          />
          <Input
            type="search"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            aria-label={articlesCopy.searchLabel}
            placeholder={articlesCopy.searchPlaceholder}
            className="ps-10"
          />
        </div>
        <Button type="submit" className="h-12 shrink-0">
          {articlesCopy.searchSubmitLabel}
        </Button>
      </form>

      <Select
        value={sort}
        onValueChange={(next) => {
          go({ q: value, sort: next as ArticleSort });
        }}
      >
        <SelectTrigger
          aria-label={articlesCopy.sortLabel}
          className="h-12 w-full sm:w-48"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">{articlesCopy.sortNewest}</SelectItem>
          <SelectItem value="popular">{articlesCopy.sortPopular}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
