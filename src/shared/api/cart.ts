import api from './http';
import type { AddCartDtoRequest, DeleteCartItemDtoRequest } from '@/shared/api/dto/cart';

export const cartAdd = (data: AddCartDtoRequest) =>
  api.post('cart/add', data);

export const cartDecreaseItem = (data: DeleteCartItemDtoRequest) =>
  api.post('cart/decrease', data);

export const removeFromCartById = (id: number) =>
  api.del(`cart/remove/${id}`);
