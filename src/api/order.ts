import { api } from './axios';
import { ENDPOINTS } from './endpoints';
import { Order, RazorPayOrder } from '../types/order';
import {
  CreateOrderApiResponse,
  RazorpayOrderApiResponse,
} from '../types/apiResponse';

export const createRazorPayOrder = async (
  data: RazorPayOrder,
): Promise<RazorpayOrderApiResponse> => {
  const response = await api.post(ENDPOINTS.CREATE_RAZORPAY_ORDER, data);
  return response.data;
};

export const createOrder = async (
  data: Order,
): Promise<CreateOrderApiResponse> => {
  const response = await api.post(ENDPOINTS.CREATE_ORDER, data);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await api.get(ENDPOINTS.FETCH_MY_ORDERS);
  return response.data;
};
