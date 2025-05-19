export interface AddCartDtoRequest {
  productId: number;
  quantity: number;
}

export interface DeleteCartItemDtoRequest {
  productId: number;
  quantity: number;
}
