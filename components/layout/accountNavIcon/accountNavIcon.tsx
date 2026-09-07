import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  BookmarkIcon,
  InboxIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import { type UserAccountNavIconName } from "@/config/user-account.config/user-account.config";

const ICONS: Record<UserAccountNavIconName, LucideIcon> = {
  layoutDashboard: LayoutDashboardIcon,
  inbox: InboxIcon,
  messageSquare: MessageSquareIcon,
  bookmark: BookmarkIcon,
  star: StarIcon,
  bell: BellIcon,
  user: UserIcon,
  settings: SettingsIcon,
};

export function AccountNavIcon({ name }: { name: UserAccountNavIconName }) {
  const Icon = ICONS[name];

  return <Icon aria-hidden="true" className="size-4 shrink-0 stroke-[1.8]" />;
}
