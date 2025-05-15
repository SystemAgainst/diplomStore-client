import { useAuthStore } from '@/features/auth/useAuthStore';
import { Link, useLocation } from 'react-router-dom';
import { menuConfig } from '@/shared/config/menuConfig';

export const useRoleMenu = () => {
  const { role } = useAuthStore();
  const location = useLocation();

  const menuItems = menuConfig[role || 'supplier'] || [];

  return (
    <>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-700 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};
