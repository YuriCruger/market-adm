"use client";

import { InputGroup } from "@/components/InputGroup";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAppSelector } from "@/app/redux/hooks";
import { Avatar, AvatarImage } from "../ui/avatar";

export function Header() {
  const userSelect = useAppSelector((state) => state.user.value);

  return (
    <header className="bg-blackBGHeader flex h-screen flex-col gap-5 p-8 text-white">
      <h2 className="text-3xl font-bold">MARKET</h2>
      <InputGroup>
        <div className="relative">
          <Input placeholder="Search" className="pl-9" />
          <SearchIcon
            size={18}
            className="absolute bottom-[10px] left-3 text-muted-foreground"
          />
        </div>
      </InputGroup>
      <nav>
        <NavItem title="Home" />
        <NavItem title="Dashboard" />
      </nav>

      <div className="mt-auto flex items-center gap-3">
        <Avatar>
          <AvatarImage src={userSelect.photoURL ?? undefined} />
        </Avatar>
        <div>
          <p className="font-bold">{userSelect.displayName}</p>
          <p className="text-sm text-grayText">{userSelect.email}</p>
        </div>
      </div>
    </header>
  );
}
