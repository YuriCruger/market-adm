import { NAV_ICON } from "@/constants/NavIcons";
import { ArrowRightIcon, HomeIcon } from "lucide-react";

interface NavItemProps {
  title: string;
}

export function NavItem({ title }: NavItemProps) {
  return (
    <div className="easy-in-out hover:bg-grayHover flex cursor-pointer items-center p-3 transition duration-200">
      {NAV_ICON[title as keyof typeof NAV_ICON]}
      <h3 className="ml-3 font-bold">{title}</h3>
    </div>
  );
}
