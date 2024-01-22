import { NAV_ICON } from "@/constants/NavIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  headerClose: boolean;
}

export function NavItem({ title, headerClose }: NavItemProps) {
  const pathname = usePathname().toLowerCase().replace(/^\//, "");

  return (
    <Link href={title.toLowerCase()}>
      <button
        className={`easy-in-out hover:bg-grayHover flex w-full cursor-pointer items-center p-3 transition duration-200 ${pathname === title.toLowerCase() ? "bg-grayHover" : ""} ${headerClose && " justify-center"}`}
      >
        {NAV_ICON[title as keyof typeof NAV_ICON]}
        {!headerClose && <h3 className="ml-3 font-bold">{title}</h3>}
      </button>
    </Link>
  );
}
