import type { Role } from '@/shared/const';

export interface SupplierDto {
  id: number;
  login: string;
  fio: string;
  email: string;
  phoneNumber: string;
  loginTelegram: string;
  chatId: string;
  role: Role;
  active: boolean;
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
