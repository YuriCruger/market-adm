export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantityInStock: number;
  createdAt: Date | string;
}

export interface ProductsList {
  products: Product[];
}
