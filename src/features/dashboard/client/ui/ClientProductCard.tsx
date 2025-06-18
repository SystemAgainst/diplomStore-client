import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import type { MainDtoResponse as ProductDtoResponse } from '@/shared/api/dto/product';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { useState } from 'react';
import { getProductById } from '@/shared/api/product.ts';
import { useCartStore } from '@/features/cart/useCartStore';
import { cartAdd } from '@/shared/api/cart.ts';
import { getFullImageUrl } from '@/shared/const';
import { useNavigate } from 'react-router-dom';

interface ClientProductCardProps {
  product: ProductDtoResponse;
}

export const ClientProductCard = ({ product }: ClientProductCardProps) => {
  const [details, setDetails] = useState<ProductDtoResponse | null>(null);
  const [open, setOpen] = useState(false);
  const cart = useCartStore();
  const navigate = useNavigate();

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

  const handleAddToCart = async () => {
    try {
      await cartAdd({ productId: product.id, quantity: 1 });

      cart.addItem({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.imageUrl,
      });
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  };

  const handleDetailSupplierClick = (login: string) => {
    navigate(`/SOLE_TRADER/supplier-info/${login}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Card className="p-4 flex flex-col gap-4">
        <img
          src={getFullImageUrl(product.imageUrl)}
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
        <DialogTitle>{details?.title || 'Детали товара'}</DialogTitle>
        {details ? (
          <div className="space-y-4">
            <img
              src={getFullImageUrl(details?.imageUrl) || '/mock-product.jpg'}
              alt={details.title}
              className="w-full h-64 object-cover rounded"
              onError={(e) => ((e.target as HTMLImageElement).src = '/mock-product.jpg')}
            />
            <p><strong>Цена:</strong> {new Intl.NumberFormat('ru-RU').format(details.price)} ₽</p>
            <p><strong>Остаток на складе:</strong> {details.quantity} шт.</p>
            <p>
              <strong>Продавец:</strong>
              <Button
                variant="ghost"
                onClick={() => handleDetailSupplierClick(details.supplier.login)}
              >
                {details.supplier.login}
              </Button>
            </p>
            <Button className="w-full" onClick={handleAddToCart}>
              {quantityInCart > 0
                ? `В корзине: ${quantityInCart}`
                : 'Добавить в корзину'
              }
            </Button>
          </div>
        ) : (
          <p>Загрузка...</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
