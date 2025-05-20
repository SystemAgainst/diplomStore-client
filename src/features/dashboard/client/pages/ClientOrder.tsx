import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { getAllClientOrders, orderPayedByClient, orderCanceledByClient } from '@/shared/api/clientOrder';
import { Card } from '@/shared/ui/card';
import { toast } from 'sonner';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { OrderClientDtoResponse } from '@/shared/api/dto/client.ts';
import { OrderStatus } from '@/shared/api/dto/order.ts';

/**
 * TODO
 * [] - fix detail of order  (client and supplier)
 * [] - download pdf-file with order's detail after payment button clicking (user)
 * [] - page with canceled and payed orders
 * [x] - filtered orders by status for suppliers
 * [] - handle status "DELIVERED". He is wanished after getting this status (supplier role)
 * */

export const ClientOrder = () => {
  const menu = useRoleMenu();
  const [orders, setOrders] = useState<OrderClientDtoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getAllClientOrders();
      setOrders(res.data);
    } catch (e) {
      toast.error('Ошибка при получении заказов');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePay = async (orderId: number) => {
    try {
      await orderPayedByClient(orderId);
      toast.success(`Заказ #${orderId} оплачен`);
      await fetchOrders();
    } catch (e) {
      toast.error('Ошибка при оплате заказа');
      console.error(e);
    }
  };

  const handleCancel = async (orderId: number) => {
    try {
      await orderCanceledByClient(orderId);
      toast.success(`Заказ #${orderId} отменён`);
      await fetchOrders();
    } catch (e) {
      toast.error('Ошибка при отмене заказа');
      console.error(e);
    }
  };

  const renderOrder = (order: OrderClientDtoResponse) => (
    <Card key={order.id} className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Заказ #{order.id}</h2>
          <p className="text-muted-foreground">
            Дата: {new Date(order.dateTime).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <Badge>{order.status}</Badge>
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
        <Button onClick={() => handlePay(order.id)}>Оплатить</Button>

        <Button
          variant="destructive"
          disabled={order.status !== OrderStatus.DELIVERED}
          onClick={() => handleCancel(order.id)}
        >
          Отменить
        </Button>
      </div>
    </Card>
  );

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
      {loading ? (
        <Card className="p-6 text-center">Загрузка заказов...</Card>
      ) : orders.length ? (
        <div className="space-y-6 max-h-[900px] overflow-y-auto pr-2">
          {orders.map(renderOrder)}
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          У вас пока нет заказов.
        </Card>
      )}
    </DashboardLayout>
  );
};
