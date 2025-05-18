import type { Role } from '@/shared/const';


export interface User {
  id: number;
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

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthRequest {
  login: string;
  password: string;
}
