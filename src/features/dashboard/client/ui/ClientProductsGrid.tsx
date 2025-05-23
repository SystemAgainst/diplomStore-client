import { useEffect, useState } from 'react';
import type { MainDtoResponse as ProductDtoResponse } from '@/shared/api/dto/product';
import { ClientProductCard } from './ClientProductCard';
import { getAllProducts } from '@/shared/api/product.ts';

export const ClientProductsGrid = () => {
  const [products, setProducts] = useState<ProductDtoResponse[]>([]);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ClientProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
