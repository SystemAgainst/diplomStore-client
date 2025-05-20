import api from './http';
import type { CartDtoRequestCounter } from '@/shared/api/dto/cart';

export const cartAdd = (data: CartDtoRequestCounter) =>
  api.post('cart/add', data);

export const cartDecreaseItem = (data: { id: number; quantity: number }) =>
  api.post('cart/decrease', data);

export const cartIncreaseItem = (data: { id: number; quantity: number }) =>
  api.post('cart/increase', data);

export const removeFromCartById = (id: number) =>
  api.del(`cart/remove/${id}`);

export const getClientCart = () =>
  api.get('client/cart');
