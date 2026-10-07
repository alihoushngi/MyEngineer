export type ContentFilterOption = {
  value: string;
  label: string;
};

export type ContentFilterSelect = {
  /** URL search param name. */
  param: string;
  label: string;
  allLabel: string;
  options: readonly ContentFilterOption[];
  value: string;
};

export type ContentFilterBarProps = {
  q: string;
  searchLabel: string;
  searchPlaceholder: string;
  submitLabel?: string;
  selects?: readonly ContentFilterSelect[];
};
