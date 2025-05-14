import type { Role } from '@/shared/const';


export interface RegisterClientDtoRequest {
  login: string;
  password: string;
  loginTelegram: string;
  chatId: string;
  fio: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
