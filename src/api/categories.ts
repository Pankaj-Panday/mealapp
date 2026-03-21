import { api } from './axios';
import { ENDPOINTS } from './endpoints';
import {
  FetchCategoriesResponse,
  FetchProductsApiResponse,
} from '../types/apiResponse';
import { PaginationParams } from '../types/common';

export const fetchCategories = async (): Promise<FetchCategoriesResponse> => {
  const res = await api.get(ENDPOINTS.CATEGORIES);
  return res.data;
};

export const fetchProductsByCategory = async (
  id: string,
  params?: PaginationParams,
): Promise<FetchProductsApiResponse> => {
  const res = await api.get(`${ENDPOINTS.CATEGORIES}/${id}/products`, {
    params,
  });
  return res.data;
};
