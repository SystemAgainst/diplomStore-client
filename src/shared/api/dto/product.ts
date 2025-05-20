import type { SupplierDto } from '@/shared/api/dto/supplier.ts';

export interface MainDtoResponse {
  id: number;
  title: string;
  price: number;
  sellingPrice: number;
  quantity: number;
  imageUrl: string;
  supplier: SupplierDto
}
