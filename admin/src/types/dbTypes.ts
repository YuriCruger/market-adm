export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantityInStock: number;
  reorderLevel: number;
  supplier: string;
  manufacturingDate: string;
  expirationDate: string | null;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
  isFeatured: boolean;
  createdAt: string; // Formato ISO 8601
}

export interface ProductsList {
  products: Product[];
}
