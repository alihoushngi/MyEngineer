import { type LegalDocumentProps } from "@/components/common/legalDocument/type/legalDocument.types";
import { cn } from "@/lib/utils/cn/cn";

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="prose-reading space-y-8">
      {document.sections.map((section, index) => (
        <section
          key={section.id}
          aria-labelledby={section.id}
          className="relative rounded-2xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-5 inset-s-0 w-0.5 rounded-full bg-primary/60"
          />

          <div className="ps-2">
            <div className="flex items-start gap-3">
              <span className="mt-1 type-caption font-semibold tabular-nums text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 id={section.id} className="type-h3 text-foreground">
                {section.title}
              </h2>
            </div>

            {section.intro ? (
              <p className="mt-4 type-body leading-relaxed text-foreground-muted">
                {section.intro}
              </p>
            ) : null}

            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 type-body leading-loose text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}

            {section.items && section.items.length > 0 ? (
              <ul className="mt-5 space-y-3 type-body leading-relaxed text-foreground-muted">
                {section.items.map((item) => (
                  <li
                    key={`${item.term ?? ""}-${item.text}`}
                    className="relative ps-5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-s-0 top-[0.65em] size-1.5 rounded-full bg-primary"
                    />
                    {item.term ? (
                      <>
                        <strong className="font-semibold text-foreground">
                          {item.term}
                        </strong>
                        {` : ${item.text}`}
                      </>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {document.contact ? (
        <section
          aria-labelledby="legal-contact-heading"
          className="rounded-2xl border border-primary/10 bg-primary-subtle/50 p-5 sm:p-6"
        >
          <h2 id="legal-contact-heading" className="type-h3 text-foreground">
            {document.contact.heading}
          </h2>

          <ul className="mt-4 space-y-3 type-body text-foreground-muted">
            {document.contact.items.map((item) => (
              <li key={item.label} className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="font-semibold text-foreground">
                  {item.label}:
                </span>

                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-md text-primary underline-offset-4 outline-none transition-all duration-200 ease-in-out hover:text-primary-hover hover:underline focus-visible:ring-2 focus-visible:ring-ring",
                      item.ltr && "ltr-data",
                    )}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className={cn(item.ltr && "ltr-data")}>
                    {item.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
