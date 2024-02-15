"use client";

import { ProductsDataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { getProducts } from "@/utils/data/products";
import { useEffect } from "react";
import { setData } from "@/app/redux/slices/dataSlice";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { toast } from "@/components/ui/use-toast";
import { LoginPrompt } from "@/components/LoginPrompt";
import { setUser } from "@/app/redux/slices/userSlice";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const dataSelector = useAppSelector((state) => state.data.value);
  const userSelect = useAppSelector((state) => state.user.value);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("@market/storedUser");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, []);

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

    if (userSelect && Object.keys(userSelect).length !== 0) {
      fetchData();
    }
  }, [dispatch, userSelect]);

  if (userSelect && Object.keys(userSelect).length === 0) {
    return <LoginPrompt />;
  }

  return (
    <div className="container py-10 text-white">
      <ProductsDataTable columns={columns} data={dataSelector} />
    </div>
  );
}
