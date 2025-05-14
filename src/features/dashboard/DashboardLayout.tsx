import type { PropsWithChildren } from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { useAuthInterceptor } from '@/shared/hooks/useAuthInterceptor';

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  useAuthInterceptor(); // ловим 401 глобально

  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true }); // Перенаправление на /auth после выхода
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-6 text-xl font-bold">CRM Dashboard</div>
        <div className="mb-4">{user} | {role}</div>
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
