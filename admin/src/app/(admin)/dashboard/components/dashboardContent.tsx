"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";
import { getProducts } from "@/utils/data/products";
import { setData } from "@/app/redux/slices/dataSlice";
import { toast } from "@/components/ui/use-toast";
import { Cards } from "./cards";
import { Graphics } from "./graphics";

export function DashboardContent() {
  const dispatch = useAppDispatch();

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
  }, [dispatch]);

  return (
    <>
      <Cards />
      <Graphics />
    </>
  );
}
