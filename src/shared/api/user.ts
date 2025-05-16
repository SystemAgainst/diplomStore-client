import api from './http';
import type { AuthResponse } from '@/shared/api/dto/user.ts';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier.ts';

export const authUser = (login: string, password: string) =>
  api.post<AuthResponse>('login', { login, password });

export const registerSupplier = (data: RegisterSupplierDtoRequest) => api.post<RegisterSupplierDtoRequest>('register/supplier', data);

export const getUserInfo = () => api.get('user');

export const logoutUser = () => api.post('logout', {});

export const getAllUsers = () => api.get('users/all');
