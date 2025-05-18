export const menuConfig = {
  "SUPPLIER": [
    { label: 'Главная', path: '/SUPPLIER/me' },
    { label: 'Мои продукты', path: '/SUPPLIER/products' },
    { label: 'Мои заказы', path: '/SUPPLIER/orders' },
  ],
  "SOLE_TRADER": [
    { label: 'Главная', path: 'SOLE_TRADER/me' },
    { label: 'Статус заказа', path: '/SOLE_TRADER/order' },
    { label: 'Моя корзина', path: '/SOLE_TRADER/cart' },
  ],
  "ADMIN": [
    { label: 'Панель администратора', path: '/ADMIN/me' },
    { label: 'Пользователи', path: '/admin/users' },
  ],
} as const;
