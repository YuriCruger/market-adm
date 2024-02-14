"use client";

import { ChevronLeftIcon, LogOut, Menu } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { setUser } from "@/app/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Sidebar() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userSelect = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const displayName = userSelect.displayName ?? "";

  const words = displayName.split(" ");
  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const initials = firstWord?.charAt(0) + lastWord?.charAt(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("@market/userClient");
      if (typeof storedUserString === "string") {
        const storedUser = JSON.parse(storedUserString);
        dispatch(setUser(storedUser));
      }
    }
  }, [dispatch]);

  function handleLogOut() {
    router.push("/");
    dispatch(setUser({}));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("@market/userClient", JSON.stringify({}));
    }
  }

  function handleMinimizeSidebar() {
    setSidebarCollapsed((prevState) => !prevState);
  }

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  return (
    <div
      ref={sidebarRef}
      className={`relative flex h-screen flex-col gap-5 bg-gradient-to-b from-softBlack text-white duration-300 max-2xl:absolute max-2xl:-left-96 
       ${isSidebarCollapsed ? "w-16 p-2" : "w-[350px] p-8"}
       ${isMenuOpen && "max-2xl:relative max-2xl:left-0 max-2xl:w-24 max-2xl:p-5"}`}
    >
      <Button
        onClick={toggleMenu}
        className={`absolute top-2 border-none hover:bg-transparent hover:text-white 2xl:hidden ${isMenuOpen && "hidden"} ${isSidebarCollapsed ? "-right-[395px]" : "-right-[110px]"}`}
      >
        <Menu size={30} />
      </Button>

      <button
        onClick={handleMinimizeSidebar}
        className={`absolute -right-10 top-[50%] mx-4 duration-300 hover:text-purple-500 max-2xl:hidden ${isSidebarCollapsed && "rotate-180 transform"}`}
      >
        <ChevronLeftIcon size={30} />
      </button>

      <div
        className={`flex items-center justify-between ${isSidebarCollapsed && "hidden"}`}
      >
        <Link href="/home">
          <h2 className={`text-3xl font-bold max-2xl:hidden `}>MARKET</h2>
        </Link>
      </div>

      <nav>
        <NavItem title="Inventory" minimizeSidebar={isSidebarCollapsed} />
        <NavItem title="Dashboard" minimizeSidebar={isSidebarCollapsed} />
      </nav>

      <div
        className={`mt-auto flex items-center gap-3 max-2xl:flex-col ${isSidebarCollapsed && "flex-col"}`}
      >
        <Avatar className="2xl:mr-auto">
          {userSelect && <AvatarImage src={userSelect.photoURL!} />}
          <AvatarFallback className="text-black">{initials}</AvatarFallback>
        </Avatar>
        {!isSidebarCollapsed && (
          <div className="max-2xl:hidden">
            <p className="font-bold">{displayName}</p>
            <p className="text-sm text-grayText">{userSelect.email}</p>
          </div>
        )}
        <Button onClick={handleLogOut} className="h-10 w-14 border-none">
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
