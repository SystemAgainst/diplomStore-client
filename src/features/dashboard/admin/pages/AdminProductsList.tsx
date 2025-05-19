import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import { getAllProducts, removeProductById } from '@/shared/api/admin';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  supplierLogin?: string;
}

/**
 * TODO:
 * [] - test delete api after git pull.
 * [] - ban and unban for client and supplier (make disable card)
 *
 * */
export const AdminProductsList = () => {
  const menu = useRoleMenu();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.error('Ошибка получения продуктов:', error);
      toast.error('Не удалось загрузить список продуктов');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removeProductById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Продукт удален');
    } catch (error) {
      console.error('Ошибка удаления продукта:', error);
      toast.error('Не удалось удалить продукт');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout roleBasedMenuSlot={menu}>
      <h1 className="text-2xl font-bold mb-6">Список продуктов</h1>

      <ScrollArea className="h-[900px] rounded-md border p-4">
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 space-y-2 text-sm flex justify-between items-start">
              <div className="space-y-1">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Название:</strong> {product.title}</p>
                <p><strong>Цена:</strong> {product.price} ₽</p>
                <p><strong>Остаток:</strong> {product.quantity} шт.</p>
                {product.supplierLogin && <p><strong>Поставщик:</strong> {product.supplierLogin}</p>}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                Удалить
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
};
