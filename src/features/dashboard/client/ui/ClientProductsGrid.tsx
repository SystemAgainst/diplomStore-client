import { useEffect, useState } from 'react';
import api from '@/shared/api/http';
import type { MainDtoResponse } from '@/shared/api/dto/product';
import { ClientProductCard } from './ClientProductCard';

export const ClientProductsGrid = () => {
  const [products, setProducts] = useState<MainDtoResponse[]>([]);

  useEffect(() => {
    api.get<MainDtoResponse[]>('/product').then((res) => {
      console.log('response', res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ClientProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
