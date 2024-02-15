"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";
import { getProducts } from "@/utils/data/products";
import { setData } from "@/app/redux/slices/dataSlice";
import { toast } from "@/components/ui/use-toast";
import { Cards } from "./cards";
import { Graphics } from "./graphics";
import { setUser } from "@/app/redux/slices/userSlice";
import { LoginPrompt } from "@/components/LoginPrompt";

export function DashboardContent() {
  const dispatch = useAppDispatch();
  const userSelect = useAppSelector((state) => state.user.value);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("@market/storedUser");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, [dispatch]);

  if (userSelect && Object.keys(userSelect).length === 0) {
    return <LoginPrompt />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userSelect && Object.keys(userSelect).length !== 0) {
          const products = await getProducts();
          dispatch(setData(products));
        }
      } catch (error) {
        toast({
          title: "Error fetching products",
          description:
            "An error occurred while fetching products. Please try again later.",
        });
      }
    };

    fetchData();
  }, [dispatch, userSelect]);

  return (
    <div className="container mt-4 py-10">
      <Cards />
      <Graphics />
    </div>
  );
}
