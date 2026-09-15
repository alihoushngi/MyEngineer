import { CompassIcon } from "lucide-react";

import { type ServiceSlug } from "@/config/services.config/services.config";

type ServiceIconProps = {
  slug: ServiceSlug;
};

export function ServiceIcon({ slug }: ServiceIconProps) {
  void slug;
  return <CompassIcon aria-hidden="true" />;
}
