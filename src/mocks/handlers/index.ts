import { authHandlers } from './authHandlers';
import { productHandlers } from './productHandlers';
import { supplierHandlers } from './supplierHandlers';

export const handlers = [
  ...authHandlers,
  ...supplierHandlers,
  ...productHandlers,
];
