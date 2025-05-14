import { useEffect } from 'react';
import api from '@/shared/api/http';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/useAuthStore';

export const useAuthInterceptor = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const interceptor = api.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Здесь лучше использовать строгую проверку по флагу
        if (error?.isAuthError || error?.response?.status === 401) {
          logout();
          navigate('/auth', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Чистим интерцептор при размонтировании
    return () => {
      api.instance.interceptors.response.eject(interceptor);
    };
  }, [navigate, logout]);
};
