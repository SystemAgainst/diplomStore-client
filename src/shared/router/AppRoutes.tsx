import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/LoginPage';
import { ClientDashboard } from '@/features/dashboard/client/ClientDashboard.tsx';
import { SupplierDashboard } from '@/features/dashboard/supplier/SupplierDashboard.tsx';
import { AdminDashboard } from '@/features/dashboard/AdminDashboard';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { SupplierProductsPage } from '@/features/dashboard/supplier/pages/SupplierProductsPage.tsx';
import { SupplierOrdersPage } from '@/features/dashboard/supplier/pages/SupplierOrdersPage.tsx';


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
        <Route path="/supplier/me" element={<SupplierDashboard />} />
          <Route path="/supplier/products" element={<SupplierProductsPage />} />
          <Route path="/supplier/orders" element={<SupplierOrdersPage />} />

        {/*CLIENT*/}
        <Route path="/client/me" element={<ClientDashboard />} />

        {/*ADMIN*/}
        <Route path="/admin/me" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to={`/${role}/me`} replace />} />
      </Routes>
    );
};