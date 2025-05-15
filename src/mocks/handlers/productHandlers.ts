import { http, HttpResponse } from 'msw';
import type { MainDtoResponse, ProductDtoResponse, ProductInfoMainDtoResponse } from '@/shared/api/dto/product';

// Моки продуктов для списка
const mockProducts: ProductDtoResponse[] = [
  { id: 1, title: 'Товар A', quantity: 10, price: 150, sellingPrice: 100 },
  { id: 2, title: 'Товар B', quantity: 20, price: 250, sellingPrice: 200 },
];

// Моки продуктов для главного каталога
const mockMainProducts: MainDtoResponse[] = [
  { id: 1, title: 'Товар A', price: 150, quantity: 10, imageUrl: '/vite.svg' },
  { id: 2, title: 'Товар B', price: 250, quantity: 20, imageUrl: '/vite.svg' },
];

// Обработчик MSW
export const productHandlers = [
  // Получить все продукты (каталог)
  http.get('/api/v1/product', () => {
    return HttpResponse.json<MainDtoResponse[]>(mockMainProducts);
  }),

  // Получить все продукты поставщика (личный кабинет)
  http.get('/api/v1/supplier/my/products', () => {
    return HttpResponse.json<ProductDtoResponse[]>(mockProducts);
  }),

  // Получить детальную инфу о товаре
  http.get('/api/v1/product/:id', ({ params }) => {
    const { id } = params;
    const product: ProductInfoMainDtoResponse = {
      id: Number(id),
      title: `Товар ${id}`,
      price: 500,
      quantity: 15,
      supplierLogin: 'supplier0',
    };
    return HttpResponse.json(product);
  }),

  // Создать продукт (возвращает сообщение)
  http.post('/api/v1/product/create', async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    return HttpResponse.json({ message: `Продукт ${title} успешно создан!` }, { status: 201 });
  }),

  // Обновить продукт (возвращает сообщение)
  http.put('/api/v1/product/update/:id', async ({ params, request }) => {
    const { id } = params;
    const updated = await request.json() as Partial<ProductDtoResponse>;
    const index = mockProducts.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      return new HttpResponse('Товар не найден', { status: 404 });
    }
    mockProducts[index] = { ...mockProducts[index], ...updated };
    return HttpResponse.json({ message: `Товар ${id} успешно обновлен!` });
  }),

  // Удалить продукт
  http.delete('/api/v1/product/delete/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Продукт ${id} успешно удален!` }, { status: 200 });
  }),
];
