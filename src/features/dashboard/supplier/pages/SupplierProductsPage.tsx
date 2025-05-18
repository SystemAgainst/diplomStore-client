import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout.tsx';
import { SupplierProductsTable } from '@/features/dashboard/supplier/ui/SupplierProductsTable.tsx';
import { CreateProductModal } from '@/features/dashboard/supplier/ui/SupplierProductAdd.tsx';
import { useState } from 'react';

export const SupplierProductsPage = () => {
  const menu = useRoleMenu();
  const [refreshToken, setRefreshToken] = useState(0);

  const refetchProducts = () => {
    setRefreshToken((t) => t + 1); // "принудительно" обновит таблицу
  };

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-8">Мои товары</h1>
      <CreateProductModal onProductCreated={refetchProducts} />
      <SupplierProductsTable refreshToken={refreshToken} />
    </DashboardLayout>
  );
};
