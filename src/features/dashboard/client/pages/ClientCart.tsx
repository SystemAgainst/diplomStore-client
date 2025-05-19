import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { useCartStore } from '@/features/cart/useCartStore';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Trash2, Minus, Plus } from 'lucide-react';

export const ClientCart = () => {
  const menu = useRoleMenu();
  const cartItems = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.totalPrice);
  const remove = useCartStore((s) => s.removeItem);
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);

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
            <Card key={item.productId} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={'/mock-product.jpg'}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.price} ₽</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => decrease(item.productId)}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-2">{item.quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => increase(item.productId)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">{item.price * item.quantity} ₽</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(item.productId)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          <Separator />

          <div className="flex justify-between items-center px-2">
            <span className="text-xl font-bold">Итого:</span>
            <span className="text-xl font-bold">{total} ₽</span>
          </div>

          <Button className="w-full text-lg mt-4">
            Перейти к оформлению
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};
