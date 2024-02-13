"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { CardInfo } from "./cardInfo";
import { useEffect, useState } from "react";
import { getProducts } from "@/utils/data/products";
import { setData } from "@/app/redux/slices/dataSlice";
import { toast } from "@/components/ui/use-toast";
import { calculatePercentageDifference } from "@/utils/functions/calculate-percentage";

export function ProductsDashboard() {
  const [totalStock, setTotalStock] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const dispatch = useAppDispatch();
  const dataSelector = useAppSelector((state) => state.data.value);

  const initialTotalStock = 475;

  const percentageDifference = calculatePercentageDifference(
    initialTotalStock,
    totalStock,
  );

  useEffect(() => {
    let accumulatedQuantity = 0;

    dataSelector.forEach((product) => {
      accumulatedQuantity += product.quantityInStock;
    });

    setTotalStock(accumulatedQuantity);
  }, [dataSelector]);

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
    <div>
      <div className="grid grid-cols-3 gap-x-5">
        <CardInfo
          description="Total products"
          title={totalStock}
          percentage={percentageDifference}
        />

        <CardInfo
          description="Total Revenue"
          title={totalStock}
          percentage={percentageDifference}
        />
      </div>
    </div>
  );
}
