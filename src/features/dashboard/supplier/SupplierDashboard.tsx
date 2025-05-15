import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { DashboardLayout } from '../DashboardLayout';
import { SupplierOrdersTable } from './ui/SupplierOrdersTable.tsx';
import { SupplierProductsTable } from '@/features/dashboard/supplier/ui/SupplierProductsTable.tsx';

export const SupplierDashboard = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold">Supplier Panel</h1>
      <p>Welcome, supplier. Here is your dashboard.</p>
      <SupplierOrdersTable />
      <div className="mb-8"></div>
      <SupplierProductsTable />
    </DashboardLayout>
  );
};
