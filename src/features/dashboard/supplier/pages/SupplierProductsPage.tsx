import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { SupplierProductsTable } from '@/features/dashboard/supplier/ui/SupplierProductsTable.tsx';

export const SupplierProductsPage = () => {
  const menu = useRoleMenu();

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-8">Мои продукты</h1>
      <SupplierProductsTable />
    </DashboardLayout>
  );
};
