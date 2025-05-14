import { authHandlers } from './authHandlers';
import { supplierHandlers } from './supplierHandlers';

export const handlers = [
  ...authHandlers,
  ...supplierHandlers,
];
