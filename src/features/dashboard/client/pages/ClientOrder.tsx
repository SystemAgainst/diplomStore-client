import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import {
  getAllClientOrders,
  orderPayedByClient,
  orderCanceledByClient,
} from '@/shared/api/clientOrder';
import { Card } from '@/shared/ui/card';
import { toast } from 'sonner';
import type { OrderClientDtoResponse } from '@/shared/api/dto/client.ts';
import { OrderStatus, OrderStatusLabels } from '@/shared/api/dto/order.ts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { OrderCard } from '@/features/order/OrderCard.tsx';


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
  const [activeTab, setActiveTab] = useState<OrderStatus | 'ALL'>('ALL');

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

  const filteredOrders =
    activeTab === 'ALL' ? orders : orders.filter((o) => o.status === activeTab);

  const statuses: (OrderStatus | 'ALL')[] = [
    'ALL',
    'PENDING',
    'CREATED',
    'CONFIRMED',
    'SHIPPED',
    'DELIVERED',
    'PAID',
    'CANCELLED',
  ];

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
      {loading ? (
        <Card className="p-6 text-center">Загрузка заказов...</Card>
      ) : orders.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          У вас пока нет заказов.
        </Card>
      ) : (
        <Tabs defaultValue="ALL" value={activeTab} onValueChange={(v) => setActiveTab(v as OrderStatus | 'ALL')}>
          <TabsList className="overflow-x-auto max-w-full mb-4">
            {statuses.map((status) => (
              <TabsTrigger key={status} value={status}>
                {OrderStatusLabels[status]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 max-h-[900px] overflow-y-auto pr-2">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onPay={handlePay}
                  onCancel={handleCancel}
                />
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                Нет заказов в этом статусе
              </Card>
            )}
          </TabsContent>

        </Tabs>
      )}
    </DashboardLayout>
  );
};
