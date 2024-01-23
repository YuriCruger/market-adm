export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantityInStock: number;
  reorderLevel: number;
  supplier: string;
  manufacturingDate: string; // Formato ISO 8601
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

interface dbJson {
  products: Product[];
}
