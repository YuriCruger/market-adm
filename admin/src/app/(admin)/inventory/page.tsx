import axios from "axios";
import { Product } from "@/types/dbTypes";
import { ProductDataTable } from "./data-table";
import { columns } from "./columns";

export default async function Inventory() {
  const data = await getProducts();

  async function getProducts(): Promise<Product[]> {
    const response = await axios.get("http://localhost:3001/products");
    const data = await response.data;
    return data;
  }

  return (
    <div className="p-20 text-white">
      <ProductDataTable columns={columns} data={data} />
    </div>
  );
}
