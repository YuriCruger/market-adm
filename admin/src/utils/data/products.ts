import { Product } from "@/types/dbTypes";
import { Row } from "@tanstack/react-table";
import axios from "axios";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get("http://localhost:4000/products");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addProduct(newProduct: Product) {
  try {
    await axios
      .post("http://localhost:4000/products", newProduct)
      .then((response) => {
        console.log("Recurso adicionado com sucesso:", response.data);
      });
    await getProducts();
  } catch (error) {
    console.error("Error adding a new product:", error);
    throw error;
  }
}

export async function deleteProduct(row: Row<Product>) {
  console.log("Deleting product:", row);
}
