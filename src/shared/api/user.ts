import api from './http';
import type { AuthResponse } from '@/shared/api/dto/user.ts';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier.ts';
import type { RegisterClientDtoRequest } from '@/shared/api/dto/client.ts';

export const authUser = (login: string, password: string) =>
  api.post<AuthResponse>('auth/login', { login, password });

export const registerSupplier = (data: RegisterSupplierDtoRequest) =>
  api.post<AuthResponse>('auth/register/supplier', data);

export const registerClient = (data: RegisterClientDtoRequest) =>
  api.post<AuthResponse>('auth/register/sole_trader', data);
