import api from './http';

export const getSupplierAllProducts = () =>
  api.get('supplier/my/products');

export const orderShipped = (id: number) =>
  api.postWithoutBody(`order/shipped/${id}`);

export const orderDelivered = (id: number) =>
  api.postWithoutBody(`order/delivered/${id}`);

export const orderCanceled = (id: number) =>
  api.postWithoutBody(`order/cancelled/${id}`);

export const orderConfirmed = (id: number) =>
  api.postWithoutBody(`order/confirmed/${id}`);
