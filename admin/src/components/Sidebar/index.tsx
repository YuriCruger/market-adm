"use client";

import { ChevronLeftIcon, LogOut, Menu } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { toast } from "../ui/use-toast";
import { auth } from "@/services/firebase";

export function Sidebar() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userSelect = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userName = userSelect?.displayName ?? userSelect?.email ?? "Guest";

  const firstLetter = userName[0].toLocaleUpperCase();

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
      const storedUserString = localStorage.getItem("@market/storedUser");
      if (typeof storedUserString === "string") {
        const storedUser = JSON.parse(storedUserString);
        dispatch(setUser(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        router.push("/");
        if (typeof window !== "undefined") {
          const clearUser = window.localStorage.setItem(
            "@market/storedUser",
            JSON.stringify({}),
          );
          dispatch(setUser(clearUser));
        }
      })
      .catch((error) => {
        toast({
          title: `${error.code}`,
          description: `${error.message}`,
        });
      });
  }

  function handleMinimizeSidebar() {
    setSidebarCollapsed((prevState) => !prevState);
  }

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
    document.body.style.overflow = "unset";
  }

  if (userSelect && Object.keys(userSelect).length === 0) {
    return;
  }

  return (
    <div
      ref={sidebarRef}
      className={`relative z-10 flex min-h-screen flex-col gap-5 bg-gradient-to-b from-softBlack to-hardBlack text-white duration-300 max-2xl:absolute max-2xl:-left-96
       ${isSidebarCollapsed ? "w-16 p-2" : "w-[350px] p-8"}
       ${isMenuOpen && "max-2xl:left-0 max-2xl:w-24 max-2xl:p-5 max-2xl:shadow-md"}`}
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
        <h2 className={`text-3xl font-bold max-2xl:hidden `}>MARKET</h2>
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
          <AvatarFallback className="font-bold text-black">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        {!isSidebarCollapsed && (
          <div className="max-2xl:hidden">
            <p className="font-bold">{userSelect?.displayName}</p>
            <p className="text-sm text-grayText">{userSelect?.email}</p>
          </div>
        )}

        <Button onClick={handleLogOut} className="h-10 w-14 border-none">
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
