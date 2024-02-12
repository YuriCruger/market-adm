export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  quantityInStock: number;
  createdAt: Date; // Formato ISO 8601
}

export interface ProductsList {
  products: Product[];
}
