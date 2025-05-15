// DTO для списков продуктов поставщика или заказов (базовая карточка)
export interface ProductDtoResponse {
  id: number;
  title: string;
  quantity: number;
  price: number;
  sellingPrice: number;
}

// DTO для детальной карточки товара (для страницы информации о товаре)
export interface ProductInfoMainDtoResponse {
  id: number;
  title: string;
  price: number;
  quantity: number;
  supplierLogin: string;
}

// DTO для главного каталога (всех товаров, с изображением)
export interface MainDtoResponse {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
