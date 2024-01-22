import { InputGroup } from "@/components/InputGroup";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { NavItem } from "./NavItem";

export function Header() {
  return (
    <header className="flex flex-col gap-5 p-8 text-white">
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

      <div></div>
    </header>
  );
}
