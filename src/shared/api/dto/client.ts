import type { Role } from '@/shared/const';
import type { OrderStatus } from '@/shared/api/dto/order.ts';

export interface RegisterClientDtoRequest {
  login: string;
  loginTelegram: string;
  inn?: string;
  chatId: string;
  ogrnip?: string;
  email: string;
  phoneNumber: string;
  fio: string;
  password: string;
  role: Role;
}

export interface ClientLocation {
  address: string;
  city: string;
}

export interface ClientOrderDto {
  id?: number;
  title?: string;
  quantity?: number;
  sellingPrice?: number;
  sku?: number | null;
  totalPrice: number;
}

export interface OrderClientDtoResponse {
  id: number;
  status: OrderStatus;
  totalCost: number;
  dateTime: string;
  orderItemClientDtoResponse: ClientOrderDto[];
}

