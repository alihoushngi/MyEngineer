import {
  ClipboardListIcon,
  CompassIcon,
  HammerIcon,
  HomeIcon,
  PenToolIcon,
  ScrollTextIcon,
  type LucideIcon,
} from "lucide-react";

import { type ServiceSlug } from "@/config/services.config/services.config";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "land-surveying": CompassIcon,
  "construction-workers": HammerIcon,
  drawing: PenToolIcon,
  "interior-design": HomeIcon,
  "building-permit": ScrollTextIcon,
  "administrative-services": ClipboardListIcon,
};

type ServiceIconProps = {
  slug: ServiceSlug;
};

export function ServiceIcon({ slug }: ServiceIconProps) {
  const Icon = serviceIcons[slug];

  return <Icon aria-hidden="true" />;
}
