import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/useAuthStore';
import api from '@/shared/api/http';
import type { Role } from '@/shared/const';

export const useInitUser = () => {
  const { user, login, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roleFromStorage = localStorage.getItem('auth-storage');
    if (!token || !roleFromStorage) return;

    const parsed = JSON.parse(roleFromStorage);
    const currentRole: Role | null = parsed?.state?.role || null;

    if (!user && token && currentRole) {
      const url = `/${currentRole.toLowerCase()}/me`;

      api.get(url)
        .then((res) => {
          login(res.data.login, currentRole, token); // или res.data.user.login
        })
        .catch(() => {
          logout(); // если токен недействителен
        });
    }
  }, []);
};
