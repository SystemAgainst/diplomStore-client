// При оформлении заказа
export interface CreateOrderDtoRequest {
  address: string;
  city: string;
}

export interface CheckoutItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export const OrderStatus = {
  CREATED: 'CREATED',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  PAID: 'PAID',
  PENDING: "PENDING",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatusLabels: Record<OrderStatus | 'ALL', string> = {
  ALL: 'Все',
  PENDING: 'В ожидании',
  CREATED: 'Создан',
  CONFIRMED: 'Подтверждён',
  SHIPPED: 'В пути',
  DELIVERED: 'Доставлен',
  PAID: 'Оплачен',
  CANCELLED: 'Отменён',
};

export interface OrderStatusDtoResponse {
  id: number;
  status: OrderStatus;
  totalCost: number;
  dateTime: string; // ISO дата: 2025-05-20T12:34:56
}

// Товары внутри заказа клиента
export interface OrderItemClientDtoResponse {
  title: string;
  quantity: number;
  sellingPrice: number;
  productSku: number;
  totalPrice: number;
}

// Информация для чека (PDF)
export interface ReceiptDtoResponse {
  orderId: number;
  clientLogin: string;
  clientTelegram: string;
  address: string;
  city: string;
  paymentDate: string; // ISO дата
  totalCost: number;
  totalPrice: number;
  profit: number;
  items: {
    productName: string;
    quantity: number;
    sellingPrice: number;
    totalPrice: number;
  }[];
}

