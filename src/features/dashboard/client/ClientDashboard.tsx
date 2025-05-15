import { DashboardLayout } from '../DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';
import { ClientProductsGrid } from '@/features/dashboard/client/ui/ClientProductsGrid.tsx';

export const ClientDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Client Panel</h1>
      <p className="mb-8">Welcome, client. Here is your dashboard.</p>

      <ClientProductsGrid />
    </DashboardLayout>
  );
};
