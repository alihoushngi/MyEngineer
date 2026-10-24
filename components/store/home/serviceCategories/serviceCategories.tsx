import Link from "next/link";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";

import { homeServicesCopy } from "@/config/home.config/home.config";
import { isPageEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type ServiceCategory } from "@/config/services.config/services.config";
import { orderHomeServiceCategories } from "@/lib/home/service-category-directory/service-category-directory";

type ServiceCategoriesProps = {
  categories: readonly ServiceCategory[];
};

export function ServiceCategories({ categories }: ServiceCategoriesProps) {
  const orderedCategories = orderHomeServiceCategories(categories);

  return (
    <section
      id="service-categories"
      data-home-part="service-categories"
      aria-labelledby="service-categories-heading"
      dir="rtl"
      className="flow-root mx-auto mt-2 mb-2 w-full max-w-[1000px] px-3 text-center min-[800px]:mt-6 min-[800px]:mb-4"
    >
      <p className="mx-0 mb-2 text-start text-client-12 font-bold leading-client-body text-client-text-muted min-[800px]:mx-24 min-[800px]:mb-6">
        {homeServicesCopy.description}
      </p>

      <div className="mx-0 flex justify-between text-start min-[800px]:mx-24">
        <h2
          id="service-categories-heading"
          className="mb-2 text-client-12 font-medium leading-[1.2] text-client-text-muted"
        >
          {homeServicesCopy.title}
        </h2>
        {isPageEnabled("faq") ? (
          <Link
            href={storePaths.faq}
            className="text-client-14 leading-[1.5] text-[#fdaf1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {homeServicesCopy.faqLabel}
          </Link>
        ) : null}
      </div>

      <ServiceCategoryGrid
        categories={orderedCategories}
        appearance="directory"
      />
    </section>
  );
}
