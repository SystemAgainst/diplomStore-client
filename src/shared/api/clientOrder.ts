import api from './http';
import type { ClientLocation } from '@/shared/api/dto/client.ts';

// Создать заказ (оформление корзины)
export const createOrder = (data: ClientLocation) =>
  api.postWithoutBody('order/create', data);

export const getAllClientOrders = () =>
  api.get(`client/my/orders`);

// Проверка корзины перед оформлением (актуальность)
export const checkoutOrder = () =>
  api.get('order/checkout');

// Оплатить заказ по ID
export const payOrder = (id: number) =>
  api.postWithoutBody(`order/pay/${id}`);