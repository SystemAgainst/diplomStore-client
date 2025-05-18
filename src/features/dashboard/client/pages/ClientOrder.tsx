import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';
import { Card } from '@/shared/ui/card.tsx';

export const ClientOrder = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-8">Мои заказы</h1>
      <Card className="p-4 w-full min-h-1/3 mx-auto justify-center">
        <h3 className="text-center">Пока заказов нет :(</h3>
      </Card>
    </DashboardLayout>
  );
};
