"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { setData } from "@/redux/slices/dataSlice";
import { Cards } from "./cards";
import { Chart } from "./chart";
import { setUser } from "@/redux/slices/userSlice";
import { LoginPrompt } from "@/components/LoginPrompt";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/services/firebase";

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "products"),
      (snapshot) => {
        const newProducts = snapshot.docs.map((doc) => doc.data());
        dispatch(setData(newProducts));
      },
    );

    return () => unsubscribe();
  }, []);

  if (userSelect && Object.keys(userSelect).length === 0) {
    return <LoginPrompt />;
  }

  return (
    <div className="container mt-4 py-10">
      <Cards />
      <Chart />
    </div>
  );
}
