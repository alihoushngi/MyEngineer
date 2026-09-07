import {
  parseArticleBody,
  type ArticleBodyBlock,
} from "@/lib/articles/parse-article-body/parse-article-body";

type ArticleBodyProps = {
  markdown: string;
};

export function ArticleBody({ markdown }: ArticleBodyProps) {
  const blocks = parseArticleBody(markdown);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="prose-reading max-w-none space-y-5">
      {blocks.map((block, index) => (
        <ArticleBlock key={blockKey(block, index)} block={block} />
      ))}
    </div>
  );
}

function ArticleBlock({ block }: { block: ArticleBodyBlock }) {
  if (block.type === "heading") {
    const className = "scroll-mt-28 text-foreground";

    if (block.level === 2) {
      return (
        <h2 id={block.id} className={`${className} pt-5 type-h2`}>
          {block.text}
        </h2>
      );
    }

    if (block.level === 3) {
      return (
        <h3 id={block.id} className={`${className} pt-4 type-h3`}>
          {block.text}
        </h3>
      );
    }

    if (block.level === 4) {
      return (
        <h4 id={block.id} className={`${className} pt-3 type-h4`}>
          {block.text}
        </h4>
      );
    }

    return (
      <h5
        id={block.id}
        className={`${className} pt-2 type-body-lg font-semibold`}
      >
        {block.text}
      </h5>
    );
  }

  if (block.type === "blockquote") {
    return (
      <blockquote className="rounded-2xl border-s-4 border-primary bg-primary-subtle/60 px-5 py-4 type-body leading-loose text-foreground-muted">
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-3 rounded-2xl bg-surface-subtle px-5 py-4 type-body leading-loose text-foreground-muted">
        {block.items.map((item, itemIndex) => (
          <li key={`${itemIndex}-${item}`} className="relative ps-5">
            <span
              aria-hidden="true"
              className="absolute inset-s-0 top-[0.75em] size-1.5 rounded-full bg-primary"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="type-body leading-loose text-foreground-muted">
      {block.text}
    </p>
  );
}

function blockKey(block: ArticleBodyBlock, index: number): string {
  if (block.type === "heading") {
    return block.id;
  }

  return `${block.type}-${index}`;
}
