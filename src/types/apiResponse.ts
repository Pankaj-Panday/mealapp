import { Category } from './category';
import { PaginationMeta } from './common';
import { OrderData, RazorpayOrderResponse } from './order';
import { Product } from './product';
import { User } from './user';

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

export type SignUpApiResponse = {
  success: boolean;
  data: User;
  token: string;
};

export type LoginApiResponse = {
  success: boolean;
  data: User;
  token: string;
};

export type RazorpayOrderApiResponse = {
  success: boolean;
  data: RazorpayOrderResponse;
};

export type CreateOrderApiResponse = {
  success: boolean;
  message: string;
  data: OrderData;
};

export type GetOrdersApiResponse = {
  success: boolean;
  data: OrderData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
