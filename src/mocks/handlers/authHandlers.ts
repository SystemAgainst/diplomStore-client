import { http, HttpResponse } from 'msw';
import { ROLES } from '@/shared/const';
import type { RegisterClientDtoRequest } from '@/shared/api/dto/client';
import type { AuthRequest, AuthResponse, UserInfoDtoResponse } from '@/shared/api/dto/user.ts';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier.ts';


export const authHandlers = [
  http.post('/api/v1/login', async ({ request }) => {
    const body = await request.json() as AuthRequest;

    if (body.login === 'admin' && body.password === '000000') {
      return HttpResponse.json<AuthResponse>({
        login: 'Admin',
        role: ROLES.ADMIN,
        token: 'mock-admin-token',
      });
    }

    if (body.login === 'client0' && body.password === '111111') {
      return HttpResponse.json<AuthResponse>({
        login: 'Client 0',
        role: ROLES.CLIENT,
        token: 'mock-client-token',
      });
    }

    if (body.login === 'supplier0' && body.password === '222222') {
      return HttpResponse.json<AuthResponse>({
        login: 'Supplier 0',
        role: ROLES.SUPPLIER,
        token: 'mock-supplier-token',
      });
    }

    return new HttpResponse('Неверные учётные данные', { status: 401 });
  }),

  http.post('/api/v1/auth/register/supplier', async ({ request }) => {
    const body = await request.json() as RegisterSupplierDtoRequest;

    if (!body.login || !body.password || !body.email) {
      return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    return HttpResponse.json<UserInfoDtoResponse>({
      id: 123,
      login: body.login,
      loginTelegram: body.loginTelegram,
      chatId: body.chatId,
    });
  }),

  http.post('/api/v1/auth/register/client', async ({ request }) => {
    const body = await request.json() as RegisterClientDtoRequest;

    if (!body.login || !body.password || !body.email) {
      return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    return HttpResponse.json<UserInfoDtoResponse>({
      id: 456,
      login: body.login,
      loginTelegram: body.loginTelegram,
      chatId: body.chatId,
    });
  }),
];
