import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import {
  getSupplierAllOrders,
  orderDelivered,
  orderShipped,
  orderCanceled,
  orderConfirmed,
} from '@/shared/api/supplier';
import {
  OrderStatus,
  type OrderStatusDtoResponse,
  OrderStatusLabels,
  type TabFilter,
} from '@/shared/api/dto/order';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion.tsx';


export const SupplierOrder = () => {
  const menu = useRoleMenu();
  const [orders, setOrders] = useState<OrderStatusDtoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('PENDING');

  const fetchOrders = async () => {
    try {
      const res = await getSupplierAllOrders();
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

  const renderOrderCard = (order: OrderStatusDtoResponse) => (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">Заказ №{order.id}</p>
          <p className="text-sm text-muted-foreground">
            Дата: {new Date(order.localDateTime).toLocaleString('ru-RU')}
          </p>
          <p className="text-sm text-muted-foreground">Клиент: {order.loginClient}</p>
        </div>
        <div className="text-right space-y-1 text-sm">
          <p><strong>Адрес:</strong> {order.address}</p>
          <p><strong>Город:</strong> {order.city}</p>
          <p><strong>Статус:</strong> {OrderStatusLabels[order.status]}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="font-semibold text-muted-foreground">Общая стоимость товаров:</p>
          <p className="text-base">{order.totalCost.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground">Общая себестоимость:</p>
          <p className="text-base">{order.totalPrice.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-muted-foreground">
            {order.profit >= 0 ? 'Прибыль:' : 'Убыток:'}
          </p>
          <p
            className={`text-base font-bold ${
              order.profit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {order.profit.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <p className="font-semibold text-muted-foreground">Содержимое заказа:</p>
        <Accordion type="multiple" className="w-full">
          {order.responseList.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{item.title} ({item.quantity} шт.)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 text-sm">
                  <p><strong>Артикул:</strong> {item.productSku || '—'}</p>
                  <p><strong>Цена продажи:</strong> {item.sellingPrice.toLocaleString('ru-RU')} ₽</p>
                  <p><strong>Себестоимость единицы:</strong> {item.costPrice.toLocaleString('ru-RU')} ₽</p>
                  <p><strong>Сумма продаж:</strong> {item.totalPrice.toLocaleString('ru-RU')} ₽</p>
                  <p><strong>Себестоимость всего:</strong> {item.totalCost.toLocaleString('ru-RU')} ₽</p>
                  <p className={item.profit >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {item.profit >= 0 ? 'Прибыль:' : 'Убыток:'} {item.profit.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Separator />

      <div className="flex gap-2 flex-wrap">
        {order.status === OrderStatus.PENDING && (
          <>
            <Button onClick={() => handleAction(order.id, 'confirm')}>Принять</Button>
            <Button variant="destructive" onClick={() => handleAction(order.id, 'cancel')}>Отклонить</Button>
          </>
        )}
        {order.status === OrderStatus.CONFIRMED && (
          <>
            <Button onClick={() => handleAction(order.id, 'ship')}>В путь</Button>
            <Button disabled>Доставлено</Button>
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

  const filteredOrders =
    activeTab === 'ALL'
      ? orders
      : orders.filter((o) => o.status === activeTab);

  const tabs: { value: TabFilter; label: string }[] = [
    { value: OrderStatus.PENDING, label: OrderStatusLabels.PENDING },
    { value: OrderStatus.CONFIRMED, label: OrderStatusLabels.CONFIRMED },
    { value: OrderStatus.SHIPPED, label: OrderStatusLabels.SHIPPED },
    { value: OrderStatus.DELIVERED, label: OrderStatusLabels.DELIVERED },
    { value: OrderStatus.PAID, label: OrderStatusLabels.PAID },
    { value: OrderStatus.CANCELLED, label: OrderStatusLabels.CANCELLED },
    { value: 'ALL', label: OrderStatusLabels.ALL },
  ];

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
      {loading ? (
        <Card className="p-4 text-center">Загрузка заказов...</Card>
      ) : (
        <Tabs defaultValue="ALL" value={activeTab} onValueChange={(v) => setActiveTab(v as OrderStatus | 'ALL')}>
          <TabsList className="overflow-x-auto max-w-full mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(renderOrderCard)
            ) : (
              <Card className="p-4 text-center text-muted-foreground">
                Нет заказов в этом статусе
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
};
