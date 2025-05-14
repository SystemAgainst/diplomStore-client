import { http, HttpResponse } from 'msw';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier.ts';

export const supplierHandlers = [
  http.get('/api/v1/supplier/me', () => {
    return HttpResponse.json({
      id: 123,
      name: 'Supplier Example',
      email: 'supplier@bk.ru',
      phoneNumber: '+79999999999',
      telegram: 'supplierTG',
    });
  }),

  http.get('/api/v1/supplier/my/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 },
    ]);
  }),

  http.get('/api/v1/supplier/my/orders', () => {
    return HttpResponse.json([
      { id: 10, status: 'Pending', total: 500 },
      { id: 11, status: 'Shipped', total: 1500 },
    ]);
  }),

  http.get('/api/v1/supplier/my/orders/10', () => {
    return HttpResponse.json([
      { itemId: 1001, name: 'Product A', qty: 2, price: 100 },
      { itemId: 1002, name: 'Product C', qty: 1, price: 300 },
    ]);
  }),

  http.post('/api/v1/supplier/register', async ({ request }) => {
    const body = (await request.json()) as RegisterSupplierDtoRequest;
    console.log('REGISTER MOCK:', body);


    if (!body.login || !body.password || !body.email) {
      return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    if (body.role !== 'SUPPLIER' && body.role !== 'CLIENT') {
      return HttpResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    return HttpResponse.json({
      message: 'Registered successfully',
      supplierId: 12345,
      ...body,
    });
  }),
];
