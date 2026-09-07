import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  BriefcaseIcon,
  FileBadgeIcon,
  ImagesIcon,
  InboxIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  MessageSquareIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import { type EngineerNavIconName } from "@/config/engineer-panel.config/engineer-panel.config";

const ICONS: Record<EngineerNavIconName, LucideIcon> = {
  layoutDashboard: LayoutDashboardIcon,
  user: UserIcon,
  briefcase: BriefcaseIcon,
  mapPin: MapPinIcon,
  inbox: InboxIcon,
  messageSquare: MessageSquareIcon,
  images: ImagesIcon,
  fileBadge: FileBadgeIcon,
  star: StarIcon,
  bell: BellIcon,
  settings: SettingsIcon,
};

export function EngineerNavIcon({ name }: { name: EngineerNavIconName }) {
  const Icon = ICONS[name];

  return <Icon aria-hidden="true" className="size-4 shrink-0 stroke-[1.8]" />;
}
