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
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  PAID: 'PAID',
  PENDING: "PENDING",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatusLabels: Record<OrderStatus | 'ALL', string> = {
  ALL: 'История заказов',
  PENDING: 'В ожидании',
  CONFIRMED: 'Подтверждён',
  SHIPPED: 'В пути',
  DELIVERED: 'Доставлен',
  PAID: 'Оплачен',
  CANCELLED: 'Отменён',
};

export type TabFilter = OrderStatus | 'ALL';

export interface OrderStatusDtoResponse {
  id: number;
  status: OrderStatus;
  totalCost: number;
  totalPrice: number;
  profit: number;
  loginClient: string;
  address: string;
  city: string;
  localDateTime: string;
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

