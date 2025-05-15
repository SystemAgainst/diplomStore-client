import { DashboardLayout } from '../DashboardLayout.tsx';
import { SupplierOrdersTable } from './ui/SupplierOrdersTable.tsx';

export const SupplierDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Supplier Panel</h1>
      <p>Welcome, supplier. Here is your dashboard.</p>
      <SupplierOrdersTable />
    </DashboardLayout>
  );
};
