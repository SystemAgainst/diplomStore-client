import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { getAllSuppliers } from '@/shared/api/admin.ts';
import { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';
import type { Role } from '@/shared/const';

interface Supplier {
  id: number;
  login: string;
  fio?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  loginTelegram?: string | null;
  chatId?: string | null;
  active?: boolean;
  role?: Role | null;
}

export const AdminSuppliersList = () => {
  const menu = useRoleMenu();
  const [data, setData] = useState<Supplier[]>([]);

  const fetchData = async () => {
    try {
      const res = await getAllSuppliers();
      console.log("suppliers ", res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Список поставщиков</h1>

      <ScrollArea className="h-[900px] rounded-md border p-4">
        <div className="space-y-4">
          {data.map((supplier) => (
            <Card key={supplier.id} className="p-4 space-y-1 text-sm">
              <p><strong>ID:</strong> {supplier.id}</p>
              <p><strong>Логин:</strong> {supplier.login}</p>
              {supplier.fio && <p><strong>ФИО:</strong> {supplier.fio}</p>}
              {supplier.email && <p><strong>Email:</strong> {supplier.email}</p>}
              {supplier.phoneNumber && <p><strong>Телефон:</strong> {supplier.phoneNumber}</p>}
              {supplier.loginTelegram && <p><strong>Telegram:</strong> {supplier.loginTelegram}</p>}
              {supplier.chatId && <p><strong>Chat ID:</strong> {supplier.chatId}</p>}
              {supplier.role && <p><strong>Роль:</strong> {supplier.role}</p>}
              {typeof supplier.active === 'boolean' && (
                <p>
                  <strong>Статус:</strong>{' '}
                  <span className={supplier.active ? 'text-green-600' : 'text-red-600'}>
                    {supplier.active ? 'Активен' : 'Неактивен'}
                  </span>
                </p>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
};
