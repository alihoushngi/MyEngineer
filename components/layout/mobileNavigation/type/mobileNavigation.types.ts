import { type StoreAuthChrome } from "@/types/store/auth.types";

export type MobileNavigationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authChrome: StoreAuthChrome;
  showUtilityTools?: boolean;
  selectedCityLabel?: string;
};
