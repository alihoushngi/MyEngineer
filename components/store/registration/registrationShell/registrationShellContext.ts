"use client";

import { createContext, useContext } from "react";

export const RegistrationFooterSlotContext = createContext<
  HTMLElement | null | undefined
>(undefined);

export function useRegistrationFooterSlot() {
  return useContext(RegistrationFooterSlotContext);
}
