import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { EngineerNavLink } from "@/components/layout/engineerNavLink/engineerNavLink";

import { engineerSidebarNav } from "@/config/engineer-panel.config/engineer-panel.config";

export function EngineerSidebar() {
  return (
    <aside className="hidden border-e border-border-subtle bg-surface lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="sticky top-0 flex max-h-dvh flex-col overflow-y-auto px-4 py-5">
        <div className="border-b border-border-subtle pb-5">
          <BrandLogo className="px-1" />
        </div>

        <nav aria-label="ناوبری فضای کاری متخصص" className="pt-5">
          <p className="mb-2 px-3 type-caption font-semibold text-foreground-subtle">
            فضای کاری متخصص
          </p>

          <ul className="flex flex-col gap-1.5">
            {engineerSidebarNav.map((item) => (
              <li key={item.id}>
                <EngineerNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
