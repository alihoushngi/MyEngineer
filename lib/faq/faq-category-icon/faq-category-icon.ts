import {
  BuildingIcon,
  CircleHelpIcon,
  FileCheckIcon,
  FileTextIcon,
  HammerIcon,
  HouseIcon,
  LandmarkIcon,
  MapIcon,
  PencilRulerIcon,
  RulerIcon,
  ShieldCheckIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the backend `icon` key of an FAQ category to a lucide icon.
 * Unknown or missing keys fall back to the default help icon.
 */
export const faqCategoryIcons: Readonly<Record<string, LucideIcon>> = {
  help: CircleHelpIcon,
  question: CircleHelpIcon,
  ruler: RulerIcon,
  survey: RulerIcon,
  surveying: RulerIcon,
  map: MapIcon,
  hammer: HammerIcon,
  construction: HammerIcon,
  building: BuildingIcon,
  drawing: PencilRulerIcon,
  pencil: PencilRulerIcon,
  design: PencilRulerIcon,
  home: HouseIcon,
  house: HouseIcon,
  interior: HouseIcon,
  permit: FileCheckIcon,
  license: FileCheckIcon,
  document: FileTextIcon,
  file: FileTextIcon,
  admin: LandmarkIcon,
  administrative: LandmarkIcon,
  municipality: LandmarkIcon,
  insurance: ShieldCheckIcon,
  shield: ShieldCheckIcon,
  payment: WalletIcon,
  wallet: WalletIcon,
};

export function normalizeFaqIconKey(key: string | null | undefined): string {
  return (key ?? "")
    .trim()
    .toLowerCase()
    .replace(/^lucide[-_:]/, "")
    .replace(/[-_]?icon$/, "");
}

export function resolveFaqCategoryIcon(
  key: string | null | undefined,
): LucideIcon {
  return faqCategoryIcons[normalizeFaqIconKey(key)] ?? CircleHelpIcon;
}
