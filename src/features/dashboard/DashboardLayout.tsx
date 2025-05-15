import type { ReactNode } from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { useAuthInterceptor } from '@/shared/hooks/useAuthInterceptor';

type DashboardLayoutProps = {
  children: ReactNode;
  roleBasedMenuSlot?: ReactNode;
}

export const DashboardLayout = ({
  children,
  roleBasedMenuSlot,
}: DashboardLayoutProps) => {
  useAuthInterceptor(); // ловим 401 глобально

  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true }); // Перенаправление на /auth после выхода
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg">
        <div className="mb-2 text-2xl font-extrabold tracking-wide">CRM Dashboard</div>
        <div className="mb-6 text-sm text-gray-300">{user} | {role}</div>
        <ul className="space-y-3 mb-8">
          {roleBasedMenuSlot}
        </ul>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};
