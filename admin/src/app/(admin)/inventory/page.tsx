"use client";

import { useState } from "react";
import axios from "axios";
import { Product } from "@/types/dbTypes";

const initialProductState: Product = {
  name: "",
  description: "",
  price: 0,
  category: "",
  brand: "",
  quantityInStock: 0,
  reorderLevel: 0,
  supplier: "",
  manufacturingDate: "",
  expirationDate: null,
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  images: [],
  isFeatured: false,
  createdAt: "",
};

export default function Inventory() {
  const [newProduct, setNewProduct] = useState<Product>(initialProductState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  async function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/products", newProduct);
      setNewProduct(initialProductState);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }

  return (
    <div>
      <h1>Inventory</h1>
    </div>
  );
}
