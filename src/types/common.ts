export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginationParams = Partial<
  Omit<PaginationMeta, 'total' | 'totalPages'>
>;

export type PaymentMethod = 'COD' | 'ONLINE';
