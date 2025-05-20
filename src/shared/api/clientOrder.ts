import api from './http';
import type { ClientLocation } from '@/shared/api/dto/client.ts';

// Создать заказ (оформление корзины)
export const createOrder = (data: ClientLocation) =>
  api.postWithoutBody('order/create', data);

export const getAllClientOrders = () => api.get(`client/my/orders`);

// Проверка корзины перед оформлением (актуальность)
export const checkoutOrder = () =>
  api.get('order/checkout');

// Оплатить заказ по ID
export const payOrder = (id: number) =>
  api.postWithoutBody(`order/pay/${id}`);

export const orderShipped = (id: number) =>
  api.postWithoutBody(`order/shipped/${id}`);

export const orderDelivered = (id: number) =>
  api.postWithoutBody(`order/delivered/${id}`);

export const orderCanceled = (id: number) =>
  api.postWithoutBody(`order/cancelled/${id}`);

export const orderConfirmed = (id: number) =>
  api.postWithoutBody(`order/confirmed/${id}`);