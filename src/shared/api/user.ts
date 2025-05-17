import api from './http';
import type { AuthResponse, UserInfoDtoResponse } from '@/shared/api/dto/user.ts';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier.ts';

export const authUser = (login: string, password: string) =>
  api.post<AuthResponse>('auth/login', { login, password });

export const registerSupplier = (data: RegisterSupplierDtoRequest) => api.post<UserInfoDtoResponse>('auth/register/supplier', data);
