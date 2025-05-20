export interface CartDtoRequestCounter {
  productId: number;
  quantity: number;
}

export interface CartItemFromApi {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  total: number;
}
