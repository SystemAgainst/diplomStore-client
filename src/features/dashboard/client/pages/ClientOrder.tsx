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
import { OrderStatus, OrderStatusLabels, type TabFilter } from '@/shared/api/dto/order.ts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { OrderCard } from '@/features/order/OrderCard.tsx';


export const ClientOrder = () => {
  const menu = useRoleMenu();
  const [orders, setOrders] = useState<OrderClientDtoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('PENDING_GROUP');

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
      console.log("orderId", orderId);
      const res = await orderPayedByClient(orderId);
      const url = res.data;

      if (url) {
        window.location.href = url;
      } else {
        toast.error('Ошибка: не получена ссылка на оплату');
      }
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

  const filterOrdersByTab = (tab: TabFilter) => {
    if (tab === 'ALL') return orders;

    const pendingGroupStatuses: OrderStatus[] = [
      OrderStatus.PENDING,
    ];

    if (tab === 'PENDING_GROUP') {
      return orders.filter((o) => pendingGroupStatuses.includes(o.status));
    }

    return orders.filter((o) => o.status === tab);
  };

  const tabs: { value: TabFilter; label: string }[] = [
    { value: 'PENDING_GROUP', label: 'В ожидании' },
    { value: OrderStatus.SHIPPED, label: OrderStatusLabels.SHIPPED },
    { value: OrderStatus.DELIVERED, label: OrderStatusLabels.DELIVERED },
    { value: OrderStatus.PAID, label: OrderStatusLabels.PAID },
    { value: OrderStatus.CANCELLED, label: OrderStatusLabels.CANCELLED },
    { value: 'ALL', label: 'История заказов' },
  ];

  const filteredOrders = filterOrdersByTab(activeTab);

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
        <Tabs
          defaultValue="PENDING_GROUP"
          value={activeTab}
          onValueChange={(value: string) => setActiveTab(value as TabFilter)}
        >
          <TabsList className="overflow-x-auto max-w-full mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
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
                  showActions={activeTab === OrderStatus.DELIVERED}
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
