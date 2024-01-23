"use client";

import { ChevronLeftIcon, LogOut } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { setUser } from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [headerClose, setHeaderClose] = useState(false);
  const userSelect = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const displayName = userSelect.displayName ?? "";

  const words = displayName.split(" ");

  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const initials = firstWord?.charAt(0) + lastWord?.charAt(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("@market/userClient");
      if (typeof storedUserString === "string") {
        const storedUser = JSON.parse(storedUserString);
        dispatch(setUser(storedUser));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("@market/userClient", JSON.stringify(userSelect));
    }
  }, [userSelect]);

  function handleLogOut() {
    router.push("/");
    dispatch(setUser({}));
  }

  function handleCloseHeader() {
    setHeaderClose((prevState) => !prevState);
  }

  return (
    <header
      className={`relative flex h-screen flex-col gap-5 bg-gradient-to-b from-blackBGHeader text-white duration-300 ${headerClose ? "w-24 p-5" : "w-[350px] p-8"}`}
    >
      <button
        onClick={handleCloseHeader}
        className={`absolute -right-10 top-[50%] duration-300 hover:text-purple-500 ${headerClose && "rotate-180 transform"}`}
      >
        <ChevronLeftIcon size={30} />
      </button>

      <div className="flex items-center justify-between">
        <Link href="/home">
          <h2 className={`text-3xl font-bold ${headerClose && "hidden"}`}>
            MARKET
          </h2>
        </Link>
      </div>

      <nav>
        <NavItem title="Home" headerClose={headerClose} />
        <NavItem title="Inventory" headerClose={headerClose} />
        <NavItem title="Dashboard" headerClose={headerClose} />
        <NavItem title="Profile" headerClose={headerClose} />
      </nav>

      <div
        className={`mt-auto flex items-center gap-3 ${headerClose && "flex-col"}`}
      >
        <Avatar>
          {userSelect && <AvatarImage src={userSelect.photoURL!} />}
          <AvatarFallback className="text-black">{initials}</AvatarFallback>
        </Avatar>
        {!headerClose && (
          <div>
            <p className="font-bold">{displayName}</p>
            <p className="text-sm text-grayText">{userSelect.email}</p>
          </div>
        )}
        <Button onClick={handleLogOut} className="h-10 w-14 border-none">
          <LogOut />
        </Button>
      </div>
    </header>
  );
}
