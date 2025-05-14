import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/LoginPage';
import { ClientDashboard } from '@/features/dashboard/ClientDashboard';
import { SupplierDashboard } from '@/features/dashboard/SupplierDashboard';
import { AdminDashboard } from '@/features/dashboard/AdminDashboard';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { RegisterPage } from '@/features/auth/RegisterPage';


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
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to={`/${role}`} replace />} />
      </Routes>
    );
};