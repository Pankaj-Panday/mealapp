import { Address } from './address';

export type RazorPayOrder = {
  amount: number;
  currency: string;
  receipt: string;
  notes?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  address: Address;
  paymentId?: string;
  razorpayOrderId?: string;
};

export type RazorpayOrderResponse = {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  created_at: number;
  offer_id: string | null;
  notes: any[];
};

export type OrderData = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  address: Address;
  createdAt: string;
  paymentMethod: 'COD' | 'ONLINE';
  paymentId: string | null;
  razorpayOrderId: string | null;
  userId: string;
};
