type ContentStructuredDataProps = {
  data: Record<string, unknown>;
};

/** Server-rendered structured data containing only the page's supplied content. */
export function ContentStructuredData({ data }: ContentStructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
