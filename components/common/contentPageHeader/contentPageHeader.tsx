type ContentPageHeaderProps = {
  title: string;
  description?: string;
};

export function ContentPageHeader({
  title,
  description,
}: ContentPageHeaderProps) {
  return (
    <header className="relative max-w-3xl">
      <div
        className="absolute inset-y-1 inset-s-0 w-1 rounded-full bg-primary"
        aria-hidden="true"
      />

      <div className="ps-5 sm:ps-6">
        <h1 className="type-h1 text-foreground">{title}</h1>

        {description ? (
          <p className="mt-3 max-w-2xl type-body-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
