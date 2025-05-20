import api from './http';
import type { ClientLocation } from '@/shared/api/dto/client.ts';

// Создать заказ (оформление корзины)
export const createOrder = (data: ClientLocation) =>
  api.post('order/create', data);

export const getAllClientOrders = () =>
  api.get(`client/my/orders`);

// Проверка корзины перед оформлением (актуальность)
export const checkoutOrder = () =>
  api.get('order/checkout');

export const orderPayedByClient = (id: number) =>
  api.postWithoutBody(`order/pay/${id}`);

export const orderCanceledByClient = (id: number) =>
  api.postWithoutBody(`order/cancelled/${id}`);