import api from './http';

// Создать заказ (оформление корзины)
export const createOrder = () =>
  api.postWithoutBody('order/create');

// Проверка корзины перед оформлением (актуальность)
export const checkoutOrder = () =>
  api.get('order/checkout');

// Оплатить заказ по ID
export const payOrder = (id: number) =>
  api.postWithoutBody(`order/pay/${id}`);

// Подтвердить доставку заказа
export const confirmDelivered = (id: number) =>
  api.postWithoutBody(`order/delivered/${id}`);

// Отменить заказ
export const cancelOrder = (id: number) =>
  api.postWithoutBody(`order/cancelled/${id}`);