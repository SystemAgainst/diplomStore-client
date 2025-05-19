import { DashboardLayout } from '../DashboardLayout.tsx';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu.tsx';

export const AdminDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Welcome, admin. Here is your dashboard.</p>
    </DashboardLayout>
  );
};
