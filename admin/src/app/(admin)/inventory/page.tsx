"use client";

import { Product } from "@/types/dbTypes";
import { ProductsDataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { getProducts } from "@/utils/data/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "@/app/redux/dataSlice";
import { useAppSelector } from "@/app/redux/hooks";

export default function Inventory() {
  const [data, setDataTwo] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const dataSelector = useAppSelector((state) => state.data.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setDataTwo(products);
        dispatch(setData(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-10 text-white">
      <ProductsDataTable columns={columns} data={dataSelector} />
    </div>
  );
}
