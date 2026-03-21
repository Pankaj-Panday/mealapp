import { Category } from './category';
import { PaginationMeta } from './common';
import { Product } from './product';

export type FetchCategoriesResponse = {
  success: boolean;
  data: Category[];
  meta: PaginationMeta;
};

export type FetchProductsApiResponse = {
  success: boolean;
  data: Product[];
  meta: PaginationMeta;
};
