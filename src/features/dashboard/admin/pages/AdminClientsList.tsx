import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { getAllClients, banUserByLogin, unBanUserByLogin } from '@/shared/api/admin';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import type { Role } from '@/shared/const';

interface Client {
  id: number;
  login: string;
  loginTelegram?: string | null;
  chatId?: string | null;
  active?: boolean;
  role?: Role | null;
}

export const AdminClientsList = () => {
  const menu = useRoleMenu();
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    try {
      const res = await getAllClients();
      setClients(res.data);
    } catch (error) {
      console.error('Ошибка получения клиентов:', error);
    }
  };

  const handleBanToggle = async (login: string, isActive?: boolean) => {
    try {
      if (isActive) {
        await banUserByLogin(login);
      } else {
        await unBanUserByLogin(login);
      }
      fetchClients();
    } catch (error) {
      console.error('Ошибка при смене статуса клиента:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const renderList = (filtered: Client[]) => (
    <ScrollArea className="h-[700px] rounded-md border p-4">
      <div className="space-y-4">
        {filtered.map((client) => (
          <Card
            key={client.id}
            className={`p-4 space-y-1 text-sm ${
              client.active === false ? 'bg-red-50 border-red-300' : ''
            }`}
          >
            <p><strong>ID:</strong> {client.id}</p>
            <p><strong>Логин:</strong> {client.login}</p>
            {client.loginTelegram && <p><strong>Telegram:</strong> {client.loginTelegram}</p>}
            {client.chatId && <p><strong>Chat ID:</strong> {client.chatId}</p>}
            {client.role && <p><strong>Роль:</strong> {client.role}</p>}
            {typeof client.active === 'boolean' && (
              <p>
                <strong>Статус:</strong>{' '}
                <span className={client.active ? 'text-green-600' : 'text-red-600'}>
                  {client.active ? 'Активен' : 'Забанен'}
                </span>
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBanToggle(client.login, client.active)}
            >
              {client.active ? 'Забанить' : 'Разбанить'}
            </Button>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Управление клиентами</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="banned">Забаненные</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderList(clients)}
        </TabsContent>

        <TabsContent value="active">
          {renderList(clients.filter((c) => c.active))}
        </TabsContent>

        <TabsContent value="banned">
          {renderList(clients.filter((c) => c.active === false))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};
