import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/LoginPage';
import { ClientDashboard } from '@/features/dashboard/client/ClientDashboard.tsx';
import { SupplierDashboard } from '@/features/dashboard/supplier/SupplierDashboard.tsx';
import { AdminDashboard } from '@/features/dashboard/admin/AdminDashboard.tsx';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { SupplierProductsPage } from '@/features/dashboard/supplier/pages/SupplierProductsPage.tsx';
import { SupplierOrdersPage } from '@/features/dashboard/supplier/pages/SupplierOrdersPage.tsx';
import { ClientCart } from '@/features/dashboard/client/pages/ClientCart.tsx';
import { ClientOrder } from '@/features/dashboard/client/pages/ClientOrder.tsx';
import { AdminClientsList } from '@/features/dashboard/admin/pages/AdminClientsList.tsx';
import { AdminSuppliersList } from '@/features/dashboard/admin/pages/AdminSuppliersList.tsx';
import { AdminProductsList } from '@/features/dashboard/admin/pages/AdminProductsList.tsx';


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
        <Route path="/SUPPLIER/me" element={<SupplierDashboard />} />
          <Route path="/SUPPLIER/products" element={<SupplierProductsPage />} />
          <Route path="/SUPPLIER/order" element={<SupplierOrdersPage />} />

        {/*CLIENT*/}
        <Route path="/SOLE_TRADER/me" element={<ClientDashboard />} />
        <Route path="/SOLE_TRADER/cart" element={<ClientCart />} />
        <Route path="/SOLE_TRADER/order" element={<ClientOrder />} />

        {/*ADMIN*/}
        <Route path="/ADMIN/me" element={<AdminDashboard />} />
        <Route path="/ADMIN/clients" element={<AdminClientsList />} />
        <Route path="/ADMIN/suppliers" element={<AdminSuppliersList />} />
        <Route path="/ADMIN/products" element={<AdminProductsList />} />

        <Route path="*" element={<Navigate to={`/${role}/me`} replace />} />
      </Routes>
    );
};