export const menuConfig = {
  "SUPPLIER": [
    // { label: 'Главная', path: '/SUPPLIER/me' },
    { label: 'Мои продукты', path: '/SUPPLIER/products' },
    { label: 'Заявка на покупку', path: '/SUPPLIER/orders' },
  ],
  "SOLE_TRADER": [
    { label: 'Главная', path: 'SOLE_TRADER/me' },
    { label: 'Моя корзина', path: '/SOLE_TRADER/cart' },
    { label: 'Статус заказа', path: '/SOLE_TRADER/order' },
  ],
  "ADMIN": [
    // { label: 'Главная', path: '/ADMIN/me' },
    { label: 'Клиенты', path: '/ADMIN/clients' },
    { label: 'Поставщики', path: '/ADMIN/suppliers' },
    { label: 'Все товары', path: '/ADMIN/products' },
  ],
} as const;
