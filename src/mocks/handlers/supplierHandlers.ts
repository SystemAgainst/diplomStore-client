import { http, HttpResponse } from 'msw';
import type { RegisterSupplierDtoRequest, SupplierProductDto } from '@/shared/api/dto/supplier';
import { ROLES } from '@/shared/const';


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
    const products: SupplierProductDto[] = [
      { id: 1, title: 'Product A', quantity: 50, sellingPrice: 100, price: 150, previewImageId: 123 },
      { id: 2, title: 'Product B', quantity: 20, sellingPrice: 200, price: 300, previewImageId: null },
    ];
    return HttpResponse.json(products);
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

    if (body.role !== ROLES.SUPPLIER && body.role !== ROLES.CLIENT) {
      return HttpResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    return HttpResponse.json({
      message: 'Registered successfully',
      supplierId: 12345,
      ...body,
    });
  }),
];
