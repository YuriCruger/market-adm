"use client";

import { ProductsDataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useEffect, useState } from "react";
import { setData } from "@/redux/slices/dataSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { LoginPrompt } from "@/components/LoginPrompt";
import { setUser } from "@/redux/slices/userSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/services/firebase";

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
    const unsubscribe = onSnapshot(
      collection(firestore, "products"),
      (snapshot) => {
        const newProducts = snapshot.docs.map((doc) => doc.data());
        dispatch(setData(newProducts));
      },
    );

    return () => unsubscribe();
  }, [dispatch]);

  if (userSelect && Object.keys(userSelect).length === 0) {
    return <LoginPrompt />;
  }

  return (
    <div className="container py-10 text-white">
      <ProductsDataTable columns={columns} data={dataSelector} />
    </div>
  );
}
