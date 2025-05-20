import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import {
  getAllClientOrders,
  orderDelivered,
  orderShipped,
  orderCanceled,
  orderConfirmed,
} from '@/shared/api/clientOrder.ts';
import {
  type OrderClientDtoResponse,
  OrderStatus,
} from '@/shared/api/dto/order';

export const ClientOrder = () => {
  const menu = useRoleMenu();
  const [orders, setOrders] = useState<OrderClientDtoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getAllClientOrders();
      setOrders(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке заказов', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAction = async (
    id: number,
    action: 'confirm' | 'cancel' | 'ship' | 'deliver'
  ) => {
    try {
      switch (action) {
        case 'confirm':
          await orderConfirmed(id);
          break;
        case 'cancel':
          await orderCanceled(id);
          break;
        case 'ship':
          await orderShipped(id);
          break;
        case 'deliver':
          await orderDelivered(id);
          break;
        default:
          console.warn(`Неизвестное действие: ${action}`);
      }
      await fetchOrders();
    } catch (error) {
      console.error(`Ошибка при действии ${action} (заказ ${id})`, error);
    }
  };

  const renderOrderCard = (order: OrderClientDtoResponse) => (
    <Card key={order.id} className="p-4 space-y-2">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">Заказ #{order.id}</p>
          <p className="text-muted-foreground">
            Дата: {new Date(order.dateTime).toLocaleString()}
          </p>
        </div>
        <p className="font-bold">Сумма: {order.totalCost} ₽</p>
      </div>
      <Separator />
      <div className="flex gap-2">
        {order.status === OrderStatus.PENDING && (
          <>
            <Button onClick={() => handleAction(order.id, 'confirm')}>Принять</Button>
            <Button
              variant="destructive"
              onClick={() => handleAction(order.id, 'cancel')}
            >
              Отклонить
            </Button>
          </>
        )}

        {order.status === OrderStatus.CONFIRMED && (
          <>
            <Button onClick={() => handleAction(order.id, 'ship')}>В путь</Button>
            <Button disabled>Доставлено</Button> {/* Пока disable */}
          </>
        )}

        {order.status === OrderStatus.SHIPPED && (
          <>
            <Button disabled>В путь</Button>
            <Button onClick={() => handleAction(order.id, 'deliver')}>Доставлено</Button>
          </>
        )}
      </div>
    </Card>
  );

  const pendingOrders = orders.filter((o) => o.status === OrderStatus.PENDING);
  const confirmedOrders = orders.filter(
    (o) =>
      o.status === OrderStatus.CONFIRMED || o.status === OrderStatus.SHIPPED
  );

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
      {loading ? (
        <Card className="p-4 text-center">Загрузка заказов...</Card>
      ) : (
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Новые</TabsTrigger>
            <TabsTrigger value="confirmed">Принятые</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map(renderOrderCard)
            ) : (
              <Card className="p-4 text-center">Нет новых заказов</Card>
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4 mt-4">
            {confirmedOrders.length > 0 ? (
              confirmedOrders.map(renderOrderCard)
            ) : (
              <Card className="p-4 text-center">Нет принятых заказов</Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
};
