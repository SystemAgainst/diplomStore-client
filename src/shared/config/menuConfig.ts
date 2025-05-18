export const menuConfig = {
  "SUPPLIER": [
    { label: 'Мои продукты', path: '/supplier/products' },
    { label: 'Мои заказы', path: '/supplier/orders' },
  ],
  "SOLE_TRADER": [
    { label: 'Каталог', path: 'client/me' },
    { label: 'Мои заказы', path: '/client/order' },
    { label: 'Моя корзина', path: '/client/cart' },
  ],
  "ADMIN": [
    { label: 'Панель администратора', path: '/admin' },
    { label: 'Пользователи', path: '/admin/users' },
  ],
} as const;
