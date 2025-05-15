import type { MainDtoResponse } from '@/shared/api/dto/product';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

interface ClientProductCardProps {
  product: MainDtoResponse;
}

export const ClientProductCard = ({ product }: ClientProductCardProps) => {
  return (
    <Card className="p-4 flex flex-col">
      <img
        src={product.imageUrl || '/placeholder.jpg'}
        alt={product.title}
        className="h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <div className="text-sm text-gray-500">Осталось: {product.quantity} шт.</div>
      <div className="text-xl font-bold mt-2">{product.price} ₽</div>
      <Button className="mt-auto">Подробнее</Button>
    </Card>
  );
};
