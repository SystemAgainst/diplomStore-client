import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';
import { Card } from '@/shared/ui/card.tsx';

export const ClientCart = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-8">Моя корзина</h1>
      <Card className="p-4 w-full min-h-1/3 mx-auto justify-center">
        <h3 className="text-center">Корзина пока пуста :(</h3>
      </Card>
    </DashboardLayout>
  );
};
