"use client";

import { ProductsDataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { getProducts } from "@/utils/data/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "@/app/redux/slices/dataSlice";
import { useAppSelector } from "@/app/redux/hooks";
import { toast } from "@/components/ui/use-toast";

export default function Inventory() {
  const dispatch = useDispatch();
  const dataSelector = useAppSelector((state) => state.data.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        dispatch(setData(products));
      } catch (error) {
        toast({
          title: "Error fetching products",
          description:
            "An error occurred while fetching products. Please try again later.",
        });
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
