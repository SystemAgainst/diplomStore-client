import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { DashboardLayout } from '../DashboardLayout';

export const SupplierDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Страница Поставщика</h1>
      <p>Успешной торговли!</p>
    </DashboardLayout>
  );
};
