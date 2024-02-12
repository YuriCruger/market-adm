import { Product } from "@/types/dbTypes";
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
