import type { Role } from '@/shared/const';

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
