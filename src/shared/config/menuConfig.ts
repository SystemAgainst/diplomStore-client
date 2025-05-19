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
    { label: 'Главная', path: '/ADMIN/me' },
    { label: 'Клиенты', path: '/ADMIN/clients' },
    { label: 'Поставщики', path: '/ADMIN/suppliers' },
    { label: 'Все товары', path: '/ADMIN/products' },
  ],
} as const;
