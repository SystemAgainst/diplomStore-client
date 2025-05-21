import api from './http';
import type { ClientLocation } from '@/shared/api/dto/client.ts';

export const createOrder = (data: ClientLocation) =>
  api.post('order/create', data);

export const getAllClientOrders = () =>
  api.get(`client/my/orders`);

export const validateCartBeforeCheckout = () =>
  api.get('order/checkout');

export const orderPayedByClient = (id: number) =>
  api.postWithoutBody(`order/init/${id}`);

export const orderCanceledByClient = (id: number) =>
  api.postWithoutBody(`order/cancelled/${id}`);