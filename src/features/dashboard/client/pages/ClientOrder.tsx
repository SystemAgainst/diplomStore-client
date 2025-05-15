import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';

export const ClientOrder = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-8">Мои заказы</h1>
    </DashboardLayout>
  );
};
