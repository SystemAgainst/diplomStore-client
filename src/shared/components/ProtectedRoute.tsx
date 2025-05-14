import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/useAuthStore';
import type { ReactNode } from 'react';


export const ProtectedRoute = ({ children, allowedRoles }: { children: ReactNode, allowedRoles: string[] }) => {
  const { user, role } = useAuthStore();
  if (!user || !allowedRoles.includes(role || '')) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
