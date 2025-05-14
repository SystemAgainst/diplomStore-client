import type { Role } from '@/shared/const';

export interface SupplierDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  telegram: string;
}

export interface ProductDto {
  id: number;
  name: string;
  price: number;
}

export interface OrderSupplierDto {
  id: number;
  status: string;
  total: number;
}

export interface OrderItemSupplierDto {
  itemId: number;
  name: string;
  qty: number;
  price: number;
}

export interface RegisterSupplierDtoRequest {
  login: string;
  password: string;
  loginTelegram: string;
  chatId: string;
  fio: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
