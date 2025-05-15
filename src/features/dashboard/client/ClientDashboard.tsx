import { DashboardLayout } from '../DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';

export const ClientDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Client Panel</h1>
      <p>Welcome, client. Here is your dashboard.</p>
    </DashboardLayout>
  );
};
