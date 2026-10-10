import assert from "node:assert/strict";
import test from "node:test";
import {
  parseArticleBody,
  buildArticleExcerpt,
  slugifyHeading,
  tocFromArticleBlocks,
  uniqueHeadingId,
} from "./parse-article-body.ts";

test("slugifyHeading keeps Persian letters and strips unsafe characters", () => {
  assert.equal(slugifyHeading("نقشه UTM چیست؟"), "نقشه-utm-چیست");
  assert.equal(slugifyHeading("Hello, World!"), "hello-world");
  assert.equal(slugifyHeading("  "), "section");
});

test("backend HTML becomes readable paragraphs and stable TOC headings", () => {
  const blocks = parseArticleBody(
    "<p>محاسبه‌ی درست بار، انتخاب کابل مناسب و اجرای سیستم ارت، ایمنی و دوام تأسیسات برقی را تضمین می‌کند.</p><h2>نکات کلیدی</h2><p>پیش از شروع، با یک متخصص مجرب مشورت کنید.</p><h2>جمع‌بندی</h2><p>برنامه‌ریزی درست از ابتدا، هزینه و زمان پروژه را کاهش می‌دهد.</p><h2>نکات کلیدی</h2>",
  );
  assert.deepEqual(
    blocks.map((block) => block.type),
    ["paragraph", "heading", "paragraph", "heading", "paragraph", "heading"],
  );
  assert.deepEqual(
    tocFromArticleBlocks(blocks).map(({ id, level }) => [id, level]),
    [
      ["نکات-کلیدی", 2],
      ["جمعبندی", 2],
      ["نکات-کلیدی-2", 2],
    ],
  );
  assert.equal(
    blocks.some(
      (block) => block.type !== "list" && /<\/?(?:p|h2)>/.test(block.text),
    ),
    false,
  );
});

test("Markdown HTML examples stay literal while leading HTML comments are supported", () => {
  assert.deepEqual(
    parseArticleBody(
      "## HTML examples\n\nUse <p>text</p> and <h2>heading</h2> in your template.",
    ),
    [
      { type: "heading", level: 2, id: "html-examples", text: "HTML examples" },
      {
        type: "paragraph",
        text: "Use <p>text</p> and <h2>heading</h2> in your template.",
      },
    ],
  );
  assert.deepEqual(parseArticleBody("```html\n<p>example</p>\n```"), [
    { type: "paragraph", text: "```html <p>example</p> ```" },
  ]);
  assert.deepEqual(
    parseArticleBody(" \n<!-- editor note --><p>Actual backend body</p>"),
    [{ type: "paragraph", text: "Actual backend body" }],
  );
});

test("HTML text stays inert after entity decoding and active content is omitted", () => {
  assert.deepEqual(
    parseArticleBody(
      '<p title="a > b" onclick="alert(1)">A &amp; B &lt;img src=x onerror=alert(1)&gt; &#35;&#35; text &#x1F642;</p><script>alert(1)</script><style>body{display:none}</style><iframe>embed</iframe><p>&amp;lt;p&amp;gt; &#60;b&#62;literal&#60;/b&#62;</p>',
    ),
    [
      {
        type: "paragraph",
        text: "A & B <img src=x onerror=alert(1)> ## text 🙂",
      },
      { type: "paragraph", text: "&lt;p&gt; <b>literal</b>" },
    ],
  );
  assert.deepEqual(parseArticleBody("&lt;p&gt;escaped markup&lt;/p&gt;"), [
    { type: "paragraph", text: "&lt;p&gt;escaped markup&lt;/p&gt;" },
  ]);
  assert.deepEqual(parseArticleBody("<p>&unknown; &constructor;</p>"), [
    { type: "paragraph", text: "&unknown; &constructor;" },
  ]);
});

test("supported HTML lists, quotes and heading levels keep semantic blocks", () => {
  const blocks = parseArticleBody(
    "<h1>عنوان درون متن</h1><blockquote><p>نقل‌قول <strong>مهم</strong><br>ادامه</p></blockquote><ul><li>یک</li><li>دو <em>مورد</em></li></ul><ol><li>اول</li><li>دوم</li></ol><h6>پایان</h6>",
  );
  assert.deepEqual(
    blocks.map((block) => block.type),
    ["heading", "blockquote", "list", "list", "heading"],
  );
  assert.deepEqual(blocks[1], {
    type: "blockquote",
    text: "نقل‌قول مهم ادامه",
  });
  assert.deepEqual(blocks[2], { type: "list", items: ["یک", "دو مورد"] });
  assert.deepEqual(blocks[3], {
    type: "list",
    items: ["اول", "دوم"],
    ordered: true,
  });
  assert.deepEqual(
    tocFromArticleBlocks(blocks).map((item) => item.level),
    [2, 5],
  );
});

test("card excerpts abbreviate supplied content without changing the full body", () => {
  const body = `<p>${"متن واقعی مقاله ".repeat(30)}</p><h2>پایان</h2>`;
  const preview = buildArticleExcerpt(body);
  assert.equal(Array.from(preview).length <= 181, true);
  assert.equal(preview.endsWith("…"), true);
  assert.equal(preview.includes("<p>"), false);
  assert.equal(body.includes("<h2>پایان</h2>"), true);
  assert.equal(buildArticleExcerpt("خلاصه‌ی موجود"), "خلاصه‌ی موجود");
  assert.equal(buildArticleExcerpt("🙂".repeat(200)).includes("�"), false);
});

test("uniqueHeadingId suffixes duplicate headings starting at 2", () => {
  const seen = new Map<string, number>();

  assert.equal(uniqueHeadingId("عنوان", seen), "عنوان");
  assert.equal(uniqueHeadingId("عنوان", seen), "عنوان-2");
});

test("parseArticleBody preserves heading levels and derives a hierarchical toc", () => {
  const blocks = parseArticleBody(`## نقشه UTM چیست؟

پاراگراف اول.

### کاربرد در جانمایی

- مورد یک
- مورد دو

#### سامانه مختصات

> نقل‌قول کوتاه.

##### دقت برداشت

## نقشه UTM چیست؟
`);

  const toc = tocFromArticleBlocks(blocks);

  assert.deepEqual(
    toc.map((item) => [item.level, item.id, item.label]),
    [
      [2, "نقشه-utm-چیست", "نقشه UTM چیست؟"],
      [3, "کاربرد-در-جانمایی", "کاربرد در جانمایی"],
      [4, "سامانه-مختصات", "سامانه مختصات"],
      [5, "دقت-برداشت", "دقت برداشت"],
      [2, "نقشه-utm-چیست-2", "نقشه UTM چیست؟"],
    ],
  );
  assert.equal(
    blocks.some((block) => block.type === "list" && block.items.length === 2),
    true,
  );
  assert.equal(
    blocks.some(
      (block) => block.type === "blockquote" && block.text.includes("نقل‌قول"),
    ),
    true,
  );
});
