export const menuConfig = {
  supplier: [
    { label: 'Мои продукты', path: '/supplier/products' },
    { label: 'Мои заказы', path: '/supplier/orders' },
  ],
  client: [
    { label: 'Каталог', path: 'client/me' },
    { label: 'Мои заказы', path: '/client/order' },
    { label: 'Моя корзина', path: '/client/cart' },
  ],
  admin: [
    { label: 'Панель администратора', path: '/admin' },
    { label: 'Пользователи', path: '/admin/users' },
  ],
} as const;
