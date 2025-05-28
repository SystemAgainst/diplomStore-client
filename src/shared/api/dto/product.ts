import type { SupplierDto } from '@/shared/api/dto/supplier.ts';

export interface MainDtoResponse {
  id: number;
  title: string;
  price: number;
  sellingPrice?: number;
  quantity: number;
  productUrl?: string;
  imageUrl?: string;
  supplier: SupplierDto
}

export interface ProductInfo {
  title: string;
  quantity: number;
  sellingPrice: number;
  productSku: never | null;
  totalPrice: number;
  totalCost: number;
  costPrice: number;
  profit: number;
}
