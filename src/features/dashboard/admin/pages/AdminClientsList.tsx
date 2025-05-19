import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { getAllClients } from '@/shared/api/admin';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Card } from '@/shared/ui/card';
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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getAllClients();
        setClients(res.data);
      } catch (error) {
        console.error('Ошибка получения клиентов:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Список клиентов</h1>

      <ScrollArea className="h-[900px] rounded-md border p-4">
        <div className="space-y-4">
          {clients.map((client) => (
            <Card key={client.id} className="p-4 space-y-1 text-sm gap-0">
              <p><strong>ID:</strong> {client.id}</p>
              <p><strong>Логин:</strong> {client.login}</p>
              {client.loginTelegram && <p><strong>Telegram:</strong> {client.loginTelegram}</p>}
              {client.chatId && <p><strong>Chat ID:</strong> {client.chatId}</p>}
              {client.role && <p><strong>Роль:</strong> {client.role}</p>}
              {typeof client.active === 'boolean' && (
                <p>
                  <strong>Статус:</strong>{' '}
                  <span className={client.active ? 'text-green-600' : 'text-red-600'}>
                    {client.active ? 'Активен' : 'Неактивен'}
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
