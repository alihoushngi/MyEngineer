export type ArticleHeadingLevel = 2 | 3 | 4 | 5;

export type ArticleBodyBlock =
  | {
      type: "heading";
      level: ArticleHeadingLevel;
      id: string;
      text: string;
    }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: readonly string[]; ordered?: boolean };

export type DerivedArticleTocItem = {
  id: string;
  label: string;
  level: ArticleHeadingLevel;
};

const HEADING_PATTERN = /^(#{2,5})\s+(.+)$/;
const HTML_BLOCK_PATTERN =
  /^\s*(?:<!--[\s\S]*?-->\s*)*<(?:p|h[1-6]|ul|ol|li|blockquote|div|section|article|br)\b[^>]*>/i;
const HTML_TOKEN_PATTERN =
  /<!--[\s\S]*?-->|<\/?[a-z][a-z0-9:-]*(?:[^>"']|"[^"]*"|'[^']*')*>|[^<]+|</gi;
const OMITTED_HTML_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "template",
  "noscript",
  "svg",
  "math",
]);

/** Decode text once, after separating tags, so escaped markup stays literal text. */
function decodeHtmlText(text: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    ndash: "–",
    mdash: "—",
    hellip: "…",
    laquo: "«",
    raquo: "»",
    zwnj: "\u200c",
    zwj: "\u200d",
    copy: "©",
    reg: "®",
  };

  return text.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (original, entity: string) => {
      if (!entity.startsWith("#")) {
        const key = entity.toLowerCase();
        return Object.hasOwn(entities, key) ? entities[key]! : original;
      }
      const codePoint =
        entity.slice(0, 2).toLowerCase() === "#x"
          ? Number.parseInt(entity.slice(2), 16)
          : Number.parseInt(entity.slice(1), 10);
      return codePoint > 0 &&
        codePoint <= 0x10ffff &&
        !(codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? String.fromCodePoint(codePoint)
        : "�";
    },
  );
}

/** Convert supported backend HTML to text-only blocks rendered through React. */
function parseArticleHtml(html: string): ArticleBodyBlock[] {
  const blocks: ArticleBodyBlock[] = [];
  const seenIds = new Map<string, number>();
  const listKinds: boolean[] = [];
  let listItems: string[] = [];
  let text = "";
  let headingLevel: ArticleHeadingLevel | undefined;
  let inListItem = false;
  let quoteDepth = 0;
  let omittedTag: string | undefined;

  function flushText() {
    const content = decodeHtmlText(text).replace(/\s+/g, " ").trim();
    text = "";
    if (content === "") return;

    if (headingLevel) {
      blocks.push({
        type: "heading",
        level: headingLevel,
        id: uniqueHeadingId(content, seenIds),
        text: content,
      });
    } else if (inListItem) {
      listItems.push(content);
    } else {
      blocks.push({
        type: quoteDepth > 0 ? "blockquote" : "paragraph",
        text: content,
      });
    }
  }

  function flushList(ordered: boolean) {
    if (listItems.length > 0) {
      blocks.push({
        type: "list",
        items: listItems,
        ...(ordered ? { ordered: true } : {}),
      });
      listItems = [];
    }
  }

  for (const token of html.matchAll(HTML_TOKEN_PATTERN)) {
    const value = token[0];
    if (value.startsWith("<!--")) continue;
    const tagMatch = value.match(/^<(\/?)\s*([a-z][a-z0-9:-]*)/i);
    if (!tagMatch) {
      if (!omittedTag) text += value;
      continue;
    }

    const closing = tagMatch[1] === "/";
    const tag = tagMatch[2]!.toLowerCase();
    if (omittedTag) {
      if (closing && tag === omittedTag) omittedTag = undefined;
      continue;
    }
    if (OMITTED_HTML_TAGS.has(tag)) {
      if (!closing && !value.endsWith("/>")) omittedTag = tag;
      continue;
    }
    if (/^h[1-6]$/.test(tag)) {
      flushText();
      headingLevel = closing
        ? undefined
        : (Math.max(2, Math.min(5, Number(tag[1]))) as ArticleHeadingLevel);
    } else if (tag === "ul" || tag === "ol") {
      flushText();
      if (closing) {
        const ordered = listKinds.pop() ?? false;
        if (listKinds.length === 0) flushList(ordered);
      } else {
        listKinds.push(tag === "ol");
      }
      inListItem = false;
    } else if (tag === "li") {
      flushText();
      inListItem = !closing;
    } else if (tag === "blockquote") {
      flushText();
      quoteDepth = Math.max(0, quoteDepth + (closing ? -1 : 1));
    } else if (/^(p|div|section|article)$/.test(tag)) {
      if (inListItem || quoteDepth > 0) text += " ";
      else flushText();
    } else if (tag === "br" || tag === "hr") {
      text += " ";
    }
    // Attributes and unsupported tags never enter the rendered block model.
  }

  flushText();
  flushList(listKinds[0] ?? false);
  return blocks;
}

export function slugifyHeading(text: string): string {
  const slug = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return slug === "" ? "section" : slug;
}

export function uniqueHeadingId(
  text: string,
  seen: Map<string, number>,
): string {
  const base = slugifyHeading(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);

  return count === 0 ? base : `${base}-${count + 1}`;
}

export function parseArticleBody(markdown: string): ArticleBodyBlock[] {
  if (HTML_BLOCK_PATTERN.test(markdown)) {
    return parseArticleHtml(markdown);
  }
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBodyBlock[] = [];
  const seenIds = new Map<string, number>();
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let quoteLines: string[] = [];

  function flushParagraph() {
    const text = paragraph.join(" ").trim();
    paragraph = [];

    if (text !== "") {
      blocks.push({ type: "paragraph", text });
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  }

  function flushQuote() {
    const text = quoteLines.join(" ").trim();
    quoteLines = [];

    if (text !== "") {
      blocks.push({ type: "blockquote", text });
    }
  }

  function flushInline() {
    flushParagraph();
    flushList();
    flushQuote();
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const heading = line.trim().match(HEADING_PATTERN);

    if (heading) {
      flushInline();
      const marks = heading[1] ?? "##";
      const text = (heading[2] ?? "").trim();
      const level = Math.min(
        5,
        Math.max(2, marks.length),
      ) as ArticleHeadingLevel;
      blocks.push({
        type: "heading",
        level,
        id: uniqueHeadingId(text, seenIds),
        text,
      });
      continue;
    }

    if (line.trim() === "") {
      flushInline();
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quoteLines.push(line.slice(2).trim());
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      flushQuote();
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  flushInline();
  return blocks;
}

export function tocFromArticleBlocks(
  blocks: readonly ArticleBodyBlock[],
): DerivedArticleTocItem[] {
  return blocks.flatMap((block) =>
    block.type === "heading"
      ? [{ id: block.id, label: block.text, level: block.level }]
      : [],
  );
}

/** A compact preview of supplied content; the complete article is unchanged. */
export function buildArticleExcerpt(content: string, maxLength = 180): string {
  const text = parseArticleBody(content)
    .flatMap((block) => (block.type === "list" ? block.items : [block.text]))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const characters = Array.from(text);
  if (characters.length <= maxLength) return text;
  const shortened = characters.slice(0, maxLength).join("");
  const wordBoundary = shortened.lastIndexOf(" ");
  return `${wordBoundary > maxLength / 2 ? shortened.slice(0, wordBoundary) : shortened}…`;
}
