import { homeNarrativeCopy } from "@/config/home.config/home.config";

export function HomeNarrative() {
  return (
    <div
      data-home-part="narrative"
      className="mx-auto w-full max-w-[1000px] px-3 client-sm:max-w-[var(--client-container-sm)] client-md:max-w-[var(--client-container-md)] client-lg:max-w-[var(--client-container-lg)] client-xl:max-w-[1000px]"
    >
      <section
        aria-labelledby="home-narrative-heading"
        className="rounded-client-md border border-client-border bg-client-surface-secondary py-client-sm dark:border-border-subtle dark:bg-surface-muted"
        dir="rtl"
      >
        <h2
          id="home-narrative-heading"
          className="m-0 px-client-sm text-start text-client-16 leading-[1.2] font-[550] text-[#525252] dark:text-foreground"
        >
          {homeNarrativeCopy.title}
        </h2>
        <p className="m-0 p-client-sm text-start text-client-12 leading-client-body text-client-text-muted dark:text-foreground-muted">
          {homeNarrativeCopy.description}
        </p>
      </section>
    </div>
  );
}
