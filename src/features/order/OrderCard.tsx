import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import type { OrderClientDtoResponse } from '@/shared/api/dto/client';
import { OrderStatus, OrderStatusLabels } from '@/shared/api/dto/order';

interface OrderCardProps {
  order: OrderClientDtoResponse;
  onPay: (orderId: number) => void;
  onCancel: (orderId: number) => void;
}

export const OrderCard = ({ order, onPay, onCancel }: OrderCardProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Заказ #{order.id}</h2>
          <p className="text-muted-foreground">
            Дата: {new Date(order.dateTime).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <Badge>{OrderStatusLabels[order.status]}</Badge>
          <p className="text-lg font-bold">{order.totalCost} ₽</p>
        </div>
      </div>

      {order.items?.length ? (
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={item.image || '/mock-product.jpg'}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = '/mock-product.jpg')
                  }
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × {item.price} ₽
                  </p>
                </div>
              </div>
              <span className="font-bold">{item.total} ₽</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Нет данных о товарах</p>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button onClick={() => onPay(order.id)}>Оплатить</Button>
        <Button
          variant="destructive"
          disabled={order.status !== OrderStatus.DELIVERED}
          onClick={() => onCancel(order.id)}
        >
          Отменить
        </Button>
      </div>
    </Card>
  );
};
