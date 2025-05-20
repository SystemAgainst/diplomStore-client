import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { useCartStore } from '@/features/cart/useCartStore';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Input } from '@/shared/ui/input'; // добавь импорт input
import { Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClientCart } from '@/shared/api/cart';
import { toast } from 'sonner';

export const ClientCart = () => {
  const menu = useRoleMenu();
  const navigate = useNavigate();

  const cartItems = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.totalPrice);
  const remove = useCartStore((s) => s.removeItem);
  const hydrate = useCartStore((s) => s.hydrateCart);
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const createOrderAndProceed = useCartStore((s) => s.createOrderAndProceed);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    try {
      const res = await getClientCart();
      hydrate(res.data.items);
    } catch (e) {
      toast.error('Ошибка при загрузке корзины');
      console.error(e);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleProceed = async (): Promise<void> => {
    try {
      setLoading(true);
      await createOrderAndProceed({ address, city });
      navigate('/SOLE_TRADER/order');
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Неизвестная ошибка при оформлении заказа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Моя корзина</h1>

      {cartItems.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          Корзина пока пуста 😔
        </Card>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || '/mock-product.jpg'}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = '/mock-product.jpg')
                  }
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.total} ₽</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => decrease(item.id)}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-2">{item.quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => increase(item.id)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">{item.total} ₽</span>
                <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          <Separator />

          <div className="flex flex-col gap-4 px-2">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Адрес доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                placeholder="Город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Итого:</span>
              <span className="text-xl font-bold">{total} ₽</span>
            </div>

            <Button
              className="w-full text-lg mt-2"
              onClick={handleProceed}
              disabled={loading}
            >
              {loading ? 'Оформляем...' : 'Перейти к оформлению'}
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
