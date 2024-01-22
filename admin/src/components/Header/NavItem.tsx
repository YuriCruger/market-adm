import { NAV_ICON } from "@/constants/NavIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
}

export function NavItem({ title }: NavItemProps) {
  const pathname = usePathname().toLowerCase().replace(/^\//, "");

  return (
    <Link href={title.toLowerCase()}>
      <button
        className={`easy-in-out hover:bg-grayHover flex w-full cursor-pointer items-center p-3 transition duration-200 ${pathname === title.toLowerCase() ? "bg-grayHover" : ""}`}
      >
        {NAV_ICON[title as keyof typeof NAV_ICON]}
        <h3 className="ml-3 font-bold">{title}</h3>
      </button>
    </Link>
  );
}
