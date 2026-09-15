export type ApiEnvelope<TData, TMeta = unknown> = {
  success: boolean;
  message?: string | null;
  data: TData;
  meta?: TMeta | null;
};

export type ApiPaginationMeta = {
  current_page?: number;
  per_page?: number;
  has_more_pages?: boolean;
  total?: number;
  last_page?: number;
  from?: number | null;
  to?: number | null;
};

export function unwrapApiData<TData>(
  envelope: ApiEnvelope<TData>,
): TData {
  return envelope.data;
}
