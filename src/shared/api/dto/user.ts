import type { Role } from '@/shared/const';

export interface UserInfoDtoResponse {
  id: number;
  login: string;
  loginTelegram: string;
  chatId: string;
}

export interface AuthResponse {
  login: string;
  role: Role;
  token: string;
}

export interface AuthRequest {
  login: string;
  password: string;
}
