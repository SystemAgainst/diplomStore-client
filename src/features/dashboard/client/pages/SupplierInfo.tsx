'use client';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '@/shared/const';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { getAllInfoAboutSupplier } from '@/shared/api/client.ts';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { ScrollArea } from '@/shared/ui/scroll-area.tsx';

interface ProductDto {
  id: number;
  title: string;
  quantity: number;
  price: number;
  sellingPrice: number;
  imageUrl: string;
}

interface SupplierDto {
  id: number;
  login: string;
  fio: string | null;
  email: string | null;
  phoneNumber: string | null;
  loginTelegram: string;
  chatId: string;
  active: boolean;
  role: string;
  productDtoResponse: ProductDto[];
}

export default function SupplierInfo() {
  const { login } = useParams<{ login: string }>();
  const menu = useRoleMenu();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<SupplierDto | null>(null);

  const fetchSupplierInfo = async () => {
    if (!login) return;

    try {
      const { data } = await getAllInfoAboutSupplier(login);
      console.log('[ответ от бэка]', data);
      console.log("products: ", data.productDtoResponse);
      setSupplier(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSupplierInfo()
  }, [login]);

  if (!supplier) {
    return <p className="text-center mt-10">Загрузка информации о продавце...</p>;
  }

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Страница продавца</h1>
      <p className="mb-8">Познакомьтесь с продавцом и посмотрите каталог товаров</p>

      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Назад
      </Button>
      <div className="max-w-3xl mx-auto space-y-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle>О продавце: {supplier.login}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>ФИО:</strong> {supplier.fio ?? '—'}</p>
            <p><strong>Email:</strong> {supplier.email ?? '—'}</p>
            <p><strong>Телефон:</strong> {supplier.phoneNumber ?? '—'}</p>
            <p><strong>Telegram:</strong> @{supplier.loginTelegram}</p>
            <p><strong>Chat ID:</strong> {supplier.chatId}</p>
            <p><strong>Роль:</strong> {supplier.role}</p>
            <p><strong>Активен:</strong> {supplier.active ? 'Да' : 'Нет'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Товары продавца</CardTitle>
          </CardHeader>
          <CardContent>
            {supplier.productDtoResponse?.length ? (
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
                  {supplier.productDtoResponse.map(product => (
                    <div key={product.id} className="border rounded p-2 space-y-2">
                      <img
                        src={product.imageUrl.startsWith('http') ? product.imageUrl : `${API_URL}${product.imageUrl}`}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded"
                        onError={(e) => ((e.target as HTMLImageElement).src = '/mock-product.jpg')}
                      />
                      <div>
                        <h4 className="font-semibold">{product.title}</h4>
                        <p className="text-sm">Цена: {product.price} ₽</p>
                        <p className="text-sm text-muted-foreground">Осталось: {product.quantity} шт.</p>
                      </div>
                      <Button className="w-full" variant="secondary">
                        Подробнее
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-gray-500">У продавца пока нет товаров.</p>
            )}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
