import { AccountNavLink } from "@/components/layout/accountNavLink/accountNavLink";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { userAccountSidebarNav } from "@/config/user-account.config/user-account.config";

export function AccountSidebar() {
  return (
    <aside className="hidden border-e border-border-subtle bg-surface lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="sticky top-0 flex max-h-dvh flex-col overflow-y-auto px-4 py-5">
        <div className="border-b border-border-subtle pb-5">
          <BrandLogo className="px-1" />
        </div>

        <nav aria-label="ناوبری حساب کاربری" className="pt-5">
          <p className="mb-2 px-3 type-caption font-semibold text-foreground-subtle">
            حساب کاربری
          </p>

          <ul className="flex flex-col gap-1.5">
            {userAccountSidebarNav.map((item) => (
              <li key={item.id}>
                <AccountNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
