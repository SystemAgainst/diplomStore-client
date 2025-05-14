export interface UserInfoDtoResponse {
  id: number;
  login: string;
  loginTelegram: string;
  chatId: string;
}

export interface AuthResponse {
  login: string;
  role: string;
  token: string;
}

export interface AuthRequest {
  login: string;
  password: string;
}
