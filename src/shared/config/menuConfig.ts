export const menuConfig = {
  supplier: [
    { label: 'Мои заказы', path: '/supplier/orders' },
    { label: 'Мои продукты', path: '/supplier/products' },
  ],
  client: [
    { label: 'Каталог', path: 'client/me' },
    { label: 'Мои заказы', path: '/client/orders' },
  ],
  admin: [
    { label: 'Панель администратора', path: '/admin' },
    { label: 'Пользователи', path: '/admin/users' },
  ],
} as const;
