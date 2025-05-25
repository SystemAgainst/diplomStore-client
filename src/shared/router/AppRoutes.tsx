import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/LoginPage';
import { ClientDashboard } from '@/features/dashboard/client/ClientDashboard.tsx';
import { AdminDashboard } from '@/features/dashboard/admin/AdminDashboard.tsx';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { SupplierOrder } from '@/features/dashboard/supplier/pages/SupplierOrder';
import { ClientCart } from '@/features/dashboard/client/pages/ClientCart.tsx';
import { ClientOrder } from '@/features/dashboard/client/pages/ClientOrder.tsx';
import { AdminClientsList } from '@/features/dashboard/admin/pages/AdminClientsList.tsx';
import { AdminSuppliersList } from '@/features/dashboard/admin/pages/AdminSuppliersList.tsx';
import { AdminProductsList } from '@/features/dashboard/admin/pages/AdminProductsList.tsx';
import { SupplierProductsList } from '@/features/dashboard/supplier/pages/SupplierProductsList.tsx';
import SupplierInfo from '@/features/dashboard/client/pages/SupplierInfo.tsx';


export const AppRoutes = () => {
    const { user, role } = useAuthStore();

    if (!user) {
        return (
          <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        );
    }

    return (
      <Routes>
        {/*SUPPLIER*/}
        <Route path="/SUPPLIER/me" element={<SupplierProductsList />} />
          <Route path="/SUPPLIER/order" element={<SupplierOrder />} />

        {/*CLIENT*/}
        <Route path="/SOLE_TRADER/me" element={<ClientDashboard />} />
        <Route path="/SOLE_TRADER/cart" element={<ClientCart />} />
          <Route path="/SOLE_TRADER/order" element={<ClientOrder />} />
          <Route path="/SOLE_TRADER/supplier-info/:login" element={<SupplierInfo />} />

        {/*ADMIN*/}
        <Route path="/ADMIN/me" element={<AdminDashboard />} />
        <Route path="/ADMIN/clients" element={<AdminClientsList />} />
        <Route path="/ADMIN/suppliers" element={<AdminSuppliersList />} />
        <Route path="/ADMIN/products" element={<AdminProductsList />} />

        <Route path="*" element={<Navigate to={`/${role}/me`} replace />} />
      </Routes>
    );
};