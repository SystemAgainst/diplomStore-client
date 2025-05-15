import { DashboardLayout } from '../DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { ClientProductsGrid } from '@/features/dashboard/client/ui/ClientProductsGrid';

export const ClientDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Каталог товаров</h1>
      <p className="mb-8">Выбирайте лучшие товара!</p>

      <ClientProductsGrid />
    </DashboardLayout>
  );
};
