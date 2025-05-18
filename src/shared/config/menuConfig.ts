export const menuConfig = {
  "SUPPLIER": [
    { label: 'Главная', path: '/SUPPLIER/me' },
    { label: 'Мои продукты', path: '/SUPPLIER/products' },
    { label: 'Мои заказы', path: '/SUPPLIER/orders' },
  ],
  "SOLE_TRADER": [
    { label: 'Главная', path: 'client/me' },
    { label: 'Мои заказы', path: '/client/order' },
    { label: 'Моя корзина', path: '/client/cart' },
  ],
  "ADMIN": [
    { label: 'Панель администратора', path: '/admin' },
    { label: 'Пользователи', path: '/admin/users' },
  ],
} as const;
