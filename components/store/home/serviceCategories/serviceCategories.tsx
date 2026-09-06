import Link from "next/link";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { Button } from "@/components/ui/button/button";
import { homeServicesCopy } from "@/config/home.config/home.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export function ServiceCategories() {
  return (
    <section
      id="service-categories"
      aria-labelledby="service-categories-heading"
      className="scroll-mt-[calc(5.75rem+env(safe-area-inset-top))] bg-background-subtle"
    >
      <div className="container-app py-section">
        <div className="space-y-8">
          <SectionHeader
            titleId="service-categories-heading"
            title={homeServicesCopy.title}
            description={homeServicesCopy.description}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.faq}>{homeServicesCopy.faqLabel}</Link>
              </Button>
            }
          />
          <ServiceCategoryGrid />
        </div>
      </div>
    </section>
  );
}
