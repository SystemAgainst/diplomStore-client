import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import type { MainDtoResponse, ProductInfoMainDtoResponse } from '@/shared/api/dto/product';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { useState } from 'react';
import { getProductById } from '@/shared/api/product.ts';
import { useCartStore } from '@/features/cart/useCartStore';

interface ClientProductCardProps {
  product: MainDtoResponse;
}

export const ClientProductCard = ({ product }: ClientProductCardProps) => {
  const [details, setDetails] = useState<ProductInfoMainDtoResponse | null>(null);
  const [open, setOpen] = useState(false);
  const cart = useCartStore();

  const fetchDetails = async () => {
    try {
      const res = await getProductById(product.id);
      setDetails(res.data);
    } catch (error) {
      console.error('Ошибка получения деталей продукта:', error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !details) {
      fetchDetails();
    }
  };

  const quantityInCart = cart.items.find((item) =>
    item.productId === product.id)?.quantity || 0;

  const handleAddToCart = () => {
    cart.addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.imageUrl,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Card className="p-4 flex flex-col gap-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-48 w-full object-cover rounded"
          onError={(e) => ((e.target as HTMLImageElement).src = '/mock-product.jpg')}
        />
        <div>
          <h3 className="font-bold text-lg">{product.title}</h3>
          <p className="text-sm text-gray-500">Осталось: {product.quantity} шт.</p>
          <p className="text-xl font-semibold">{product.price} ₽</p>
        </div>
        <DialogTrigger asChild>
          <Button className="w-full">Подробнее</Button>
        </DialogTrigger>
      </Card>

      <DialogContent className="max-w-md mx-auto">
        {details ? (
          <div className="space-y-4">
            <img
              src={product.imageUrl || '/mock-product.jpg'}
              alt={details.title}
              className="w-full h-64 object-cover rounded"
              onError={(e) => ((e.target as HTMLImageElement).src = '/mock-product.jpg')}
            />
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <p><strong>Цена:</strong> {details.price} ₽</p>
            <p><strong>Остаток на складе:</strong> {details.quantity} шт.</p>
            <p><strong>Продавец:</strong> {details.supplierLogin}</p>
            <Button className="w-full" onClick={handleAddToCart}>
              {quantityInCart > 0 ? `В корзине: ${quantityInCart}` : 'Добавить в корзину'}
            </Button>          </div>
        ) : (
          <p>Загрузка...</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
