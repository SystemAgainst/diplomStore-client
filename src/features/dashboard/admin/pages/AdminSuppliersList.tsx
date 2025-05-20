import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { Card } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';
import { banUserByLogin, getAllSuppliers, unBanUserByLogin } from '@/shared/api/admin';
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
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBanToggle = async (login: string, isActive?: boolean) => {
    try {
      if (isActive) {
        await banUserByLogin(login);
      } else {
        await unBanUserByLogin(login);
      }
      fetchData();
    } catch (error) {
      console.error('Ошибка при смене статуса пользователя:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (filtered: Supplier[]) => (
    <ScrollArea className="h-[700px] rounded-md border p-4">
      <div className="space-y-4">
        {filtered.map((supplier) => (
          <Card
            key={supplier.id}
            className={`p-4 space-y-1 text-sm ${
              supplier.active === false ? 'bg-red-50 border-red-300' : ''
            }`}
          >
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
                  {supplier.active ? 'Активен' : 'Забанен'}
                </span>
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBanToggle(supplier.login, supplier.active)}
            >
              {supplier.active ? 'Забанить' : 'Разбанить'}
            </Button>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Управление поставщиками</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="banned">Забаненные</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderList(data)}
        </TabsContent>

        <TabsContent value="active">
          {renderList(data.filter((user) => user.active))}
        </TabsContent>

        <TabsContent value="banned">
          {renderList(data.filter((user) => user.active === false))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};
