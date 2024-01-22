"use client";

import { InputGroup } from "@/components/InputGroup";
import { Input } from "@/components/ui/input";
import { LogOut, SearchIcon } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { setUser } from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";

export function Header() {
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

  return (
    <header className="from-blackBGHeader flex  h-screen flex-col gap-5 bg-gradient-to-b p-8 text-white">
      <h2 className="text-3xl font-bold">MARKET</h2>

      <nav>
        <NavItem title="Home" />
        <NavItem title="Dashboard" />
        <NavItem title="Profile" />
      </nav>

      <div className="mt-auto flex items-center gap-3">
        <Avatar>
          {userSelect && <AvatarImage src={userSelect.photoURL!} />}
          <AvatarFallback className="text-black">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{displayName}</p>
          <p className="text-sm text-grayText">{userSelect.email}</p>
        </div>
        <Button onClick={handleLogOut} className="h-10 w-14">
          <LogOut />
        </Button>
      </div>
    </header>
  );
}
